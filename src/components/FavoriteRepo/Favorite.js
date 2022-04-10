import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft, FaArrowCircleRight, FaDoorClosed, FaTrash } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';

import logoGit from './git.webp';
import '../../../src/components/Home/Home.css';
import './Favorite.css';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

function Favorite() {
    let navigate = useNavigate();
    const [repo, setRepo] = useState([]);

    useEffect(() => {
        getUserRepo()
    }, [])

    const getUserRepo = async () => {
        const url = 'http://localhost:3000/api/repo/listRepo';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        const repos = await response.json();
        setRepo(repos)
    }

    const deleteRepo = async (repo) => {
        const url = `http://localhost:3000/api/repo/deleteRepo/${repo._id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        });
        const repos = await response.json();
        console.log(repos);

        if (response.status === 200) {
            alertify.confirm(`Are you sure you want to delete ${repo.name}?`,
                function () {
                    alertify.success('Delete repo');
                    window.location.replace('http://localhost:3001/favorites');
                },
            );
        }
    }

    const redirect = () => {
        return navigate("/");
    }
    const redirectBack = () => {
        return navigate("/home");
    }

    return (

        <div>
            <div className="card boxTitle shadow-lg p-3 mb-5 bg-white rounded cardHome">
                <img src={logoGit} className="logo" alt="logo" />
                <div className='titleFav'>
                    <h4 className="card-title">Favorites Repo</h4>
                </div>
                <button className="btn btn-danger btn-sm btnClose" onClick={redirect}>
                    <FaArrowCircleRight />
                </button>
                <button className="btn btn-danger btn-sm btnBack" onClick={redirectBack}>
                    <FaArrowCircleLeft />
                </button>
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
                                            <td className='btnTrash'>
                                                <button className="btn btn-danger btn-sm" onClick={deleteRepo.bind(null, rep)}>
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        ))
                        : <h1 className='headerTable'>Load favorites repository ...</h1>
                }
            </div>
        </div>

    )
}


export default Favorite
