import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';

import logo from './padlock.png';
import './Login.css';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

import { useNavigate } from 'react-router-dom';


const Login = () => {
    let navigate = useNavigate();

    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required field';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: { email: '' },
        validate,
        onSubmit: values => {
            getUserByEmail(values)
        },
    });

    const getUserByEmail = async (values) => {
        const requestOptions = {
            method: 'GET',
            headers: { Accept: 'application/json' },
        };
        const idUser = values.email
        fetch(`http://localhost:3000/api/${idUser}`, requestOptions)
            .then(response => {
                if (response.status === 400) {
                    alertify.alert('Error', 'User not found, please register ', function () {
                        alertify.error('Error Login');
                        register()
                    });
                }
                if (response.status === 200) {
                    alertify.success('User Validated Successfully');
                    window.location = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_PUBLIC_CLIENT}`
                }
            })
            .catch(error => console.error(error))
    }

    const register = () => {
        return navigate("/register");
    }

    return (
        <>
            <div className=''>
                <h1 className='title-login' >USER LOGIN</h1>
            </div>
            <div className='containerCard'>
                <div className='container'>
                    <div className="boxTitle containerImage">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div className="card boxTitle shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className='boxTitle'>
                                    <h1 className='title'>LOGIN</h1>
                                </div>

                                <div className='containerForm'>
                                    <label htmlFor="email" className='divForm labelForm'>Email</label>
                                    <input type="text" className="form-control divForm" id="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email} />
                                    <label className='styleErrors'>
                                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                    </label>
                                </div>

                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-primary " type="submit">Login</button>
                                </div>
                                <br />
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-primary " type="button" onClick={register}>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login