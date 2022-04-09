import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';


const Home = () => {
    const currentLocarion = useLocation()
    const { code } = queryString.parse(currentLocarion.search)

    let gitToken;
    let repos;

    const [repo, setRepo] = useState([]);

    const getUserInfo = async () => {
        const url = `/access_token?client_id=${process.env.REACT_APP_PUBLIC_CLIENT}&client_secret=${process.env.REACT_APP_PRIVATE_CLIENT}&code=${code}`;
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        gitToken = data.access_token
        localStorage.setItem('gitToken', gitToken)

        getUserRepo()

    }

    const getUserRepo = async () => {
        console.log("GIT TOKEN", gitToken);
        if (localStorage.getItem('gitToken')) {
            const url = 'https://api.github.com/user/repos';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `token ${localStorage.getItem('gitToken')}`
                },
            });
            repos = await response.json();
            setRepo(repos)
            console.log(repo);
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const fav = (id) => {
        console.log("LLEGA ID");
        console.log(id);
    }

    return (
        <div>
            <div className="card boxTitle shadow-lg p-3 mb-5 bg-white rounded">
                <li className="list-group-item active">Here You can find your GitRepos</li>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">URL</th>
                            <th scope="col">fullName</th>
                        </tr>
                    </thead>
                </table>
                {
                    repo && repo.length > 0
                        ? (repo.map(rep =>
                            <>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th scope="row">*</th>
                                            <td>{rep.name}</td>
                                            <td>{rep.html_url}</td>
                                            <td>{rep.full_name}</td>
                                            <button onClick={fav.bind(null, rep.id)}>FAV</button>
                                        </tr>

                                    </tbody>
                                </table>
                                {/* <h3>{rep.name} - {rep.html_url} - {rep.full_name}</h3> */}
                            </>
                        ))
                        : <h1>Getting repos ...</h1>
                }
            </div>
        </div>
    )
}



export default Home