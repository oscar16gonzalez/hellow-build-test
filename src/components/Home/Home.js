import React, { useEffect, useState, useCallback, useMemo } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

const Home = () => {
  const currentLocation = useLocation();
  const { code } = queryString.parse(currentLocation.search);

  const [loading, setLoading] = useState(false);
  const [repo, setRepo] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const filteredRepo = useMemo(() => {
    const repos = repo.map((r) => ({
      ...r,
      favorite: favorites.some((f) => f.github_id === r.id),
    }));
    return showAll ? repos : repos.filter((r) => r.favorite);
  }, [repo, showAll, favorites]);

  const getUserInfo = useCallback(async () => {
    setLoading(true);
    const userCode = localStorage.getItem("userCode");
    if (userCode !== code) {
      const url = `/access_token?client_id=${process.env.REACT_APP_PUBLIC_CLIENT}&client_secret=${process.env.REACT_APP_PRIVATE_CLIENT}&code=${code}`;
      const response = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
        },
      });
      localStorage.setItem("userCode", code);
      const data = await response.json();
      localStorage.setItem("gitToken", data.access_token);
    }
    getUserRepo();
  }, []);

  const getUserRepo = useCallback(async () => {
    const gitToken = localStorage.getItem("gitToken");
    const url = "https://api.github.com/user/repos";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `token ${gitToken}`,
      },
    });
    const repos = await response.json();
    if (repos?.message !== "Bad credentials") {
      setRepo(repos);
    } else {
      alertify.error("Error get repositories from github");
    }
    setLoading(false);
  }, []);

  const getFavs = useCallback(async () => {
    //TODO traer los favoritos del backend
    setFavorites([]);
  }, []);

  const addFav = useCallback(
    async (repository) => {
      //TODO Guardar repositorio como favorito en el backend
      setFavorites([...favorites, { github_id: repository.id }]);
    },
    [favorites]
  );

  const removeFav = useCallback(
    async (repository) => {
      //TODO Eliminar repositorio como favorito en el backend
      setFavorites(favorites.filter((f) => f.github_id !== repository.id));
    },
    [favorites]
  );

  useEffect(() => {
    getUserInfo();
    getFavs();
  }, []);

  return (
    <div className="container-fluid">
      <div className="shadow-lg m-4 p-3 mb-5 bg-white rounded">
        <h1 className="h1 text-center pb-2">Here You can find your GitRepos</h1>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={showAll ? "nav-link active" : "nav-link"}
              onClick={() => setShowAll(true)}
              href="#"
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={!showAll ? "nav-link active" : "nav-link"}
              onClick={() => setShowAll(false)}
              href="#"
            >
              Favorites
            </a>
          </li>
        </ul>
        <div className="table-responsive">
          <table className="table table-light align-middle">
            <thead className="thead table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Private</th>
                <th scope="col">URL</th>
                <th scope="col">Full name</th>
                <th scope="col">Fav</th>
              </tr>
            </thead>
            {filteredRepo?.length > 0 && (
              <tbody>
                {filteredRepo.map((rep, i) => (
                  <tr key={i}>
                    <th scope="row">
                      <div className="py-3">{i}</div>
                    </th>
                    <td>{rep.name}</td>
                    <td>{rep.private ? "Yes" : "No"}</td>
                    <td>{rep.html_url}</td>
                    <td>{rep.full_name}</td>
                    <td>
                      {rep.favorite && (
                        <div onClick={() => removeFav(rep)}>
                          <FaStar color="Orange" />
                        </div>
                      )}
                      {!rep.favorite && (
                        <div onClick={() => addFav(rep)}>
                          <FaRegStar />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {filteredRepo?.length === 0 && !loading && (
            <h2>Repositories is empty</h2>
          )}
          {loading && <h2>Getting repos ...</h2>}
        </div>
      </div>
    </div>
  );
};

export default Home;
