import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

import { FaArrowAltCircleDown, FaArrowCircleRight, FaBars, FaCheckDouble, FaRegArrowAltCircleDown, FaStar } from 'react-icons/fa';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

import logoGit from './git.webp';
import logoRepo from './repo.png';
import './Home.css';


const Home = () => {
    let navigate = useNavigate();

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
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const fav = (repo) => {
        console.log(repo);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: repo.name,
                html_url: repo.html_url,
                full_name: repo.full_name,
                id: repo.id,
            })
        };

        fetch('http://localhost:3000/api/repo/addRepo/', requestOptions)
            .then(response => {
                if (response.status === 500) {
                    alertify.alert('Error', 'Failed to added repository', function () {
                        alertify.error('Error');
                    });
                }
                if (response.status === 200) {
                    alertify.alert('Succes', 'Repository added successfully', function () {
                        alertify.success('Added successfully');
                    });
                }
            })
            .catch(error => console.error(error))
    }

    const redirect = () => {
        return navigate("/favorites");
    }

    return (
        <div>
            <div className="card boxTitle shadow-lg p-3 mb-5 bg-white rounded cardHome">
                <img src={logoGit} className="logo" alt="logo" />
                <div className="card-body divBtn">
                    <button className="btn btn-warning btn-sm" onClick={redirect}>FAVS</button>
                </div>
                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th className='headerTable' scope="col">name</th>
                            <th className='headerTable' scope="col">URL</th>
                            <th className='headerTable' scope="col">fullName</th>
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
                                            <button className="btn"><FaBars /></button>
                                            <td className='nameRepo'>{rep.name}</td>
                                            <td>{rep.html_url}</td>
                                            <td>{rep.full_name}</td>
                                            <button className="btn" onClick={fav.bind(null, rep)} ><FaStar /></button>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        ))
                        : <h1 className='headerTable'>Load repository ...</h1>
                }
            </div>
        </div>
    )
}

export default Home