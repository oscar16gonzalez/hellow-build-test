import React from 'react';
import { Formik } from 'formik';
import './Register.css';
import { useFormik } from 'formik';
import logo from './user.png';

import { useNavigate } from 'react-router-dom';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const validate = values => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Required field';
    } else if (values.firstName.length > 10) {
        errors.firstName = 'Must be 10 characters or less';
    }

    if (!values.lastName) {
        errors.lastName = 'Required field';
    } else if (values.lastName.length > 10) {
        errors.lastName = 'Must be 10 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required field';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.cellphone) {
        errors.cellphone = 'Required field';
    } else if (values.cellphone.length > 15) {
        errors.cellphone = 'Must be 15 characters or less';
    }

    if (!values.password) {
        errors.password = 'Required field';
    }

    return errors;
};

const Resgister = () => {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            cellphone: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            postUserInfo(values)
        },
    });

    // POST USER INFO
    const postUserInfo = async (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                cellphone: values.cellphone,
                password: values.password
            })
        };
        
        fetch('http://localhost:3000/api', requestOptions)
            .then(response => {
                if (response.status === 500) {
                    alertify.alert('Error', 'Failed to create user ', function () {
                        alertify.error('Error register');
                    });
                }
                if (response.status === 200) {
                    alertify.alert('Succes', 'User registered!', function () {
                        alertify.success('Create user success');
                        return navigate("/login");
                    });
                }
            })
            .catch(error => console.error(error))
    }
    const login = () => {
        return navigate("/login");
    }

    return (
        <>
            <div className="boxTitle headerForm">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="card boxTitle shadow-lg p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <div className='boxTitle'>
                            <h1 className='title'>CREATE USER</h1>
                        </div>
                        <div className='containerForm'>
                            <label htmlFor="firstName" className=' labelForm'>First Name</label>
                            <input type="text" className="form-control divForm" id="firstName"
                                name="firstName"
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                value={formik.values.firstName} />
                            <label className='styleErrors'>
                                {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                            </label>
                        </div>
                        <div className='containerForm'>
                            <label htmlFor="lastName" className='divForm labelForm'>Last Name</label>
                            <input type="text" className="form-control divForm" id="lastName"
                                name="lastName"
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                value={formik.values.lastName} />
                            <label className='styleErrors'>
                                {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                            </label>
                        </div>
                        <div className='containerForm'>
                            <label htmlFor="email" className='divForm labelForm'>Email</label>
                            <input type="text" className="form-control divForm" id="email"
                                name="email"
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                value={formik.values.email} />
                            <label className='styleErrors'>
                                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            </label>
                        </div>
                        <div className='containerForm'>
                            <label htmlFor="cellphone" className='divForm labelForm'>Cellphone</label>
                            <input type="text" className="form-control divForm" id="cellphone"
                                name="cellphone"
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                value={formik.values.cellphone} />
                            <label className='styleErrors'>
                                {formik.errors.cellphone ? <div>{formik.errors.cellphone}</div> : null}
                            </label>
                        </div>

                        <div className='containerForm'>
                            <label htmlFor="password" className='divForm labelForm'>Password</label>
                            <input type="password" className="form-control divForm" id="password"
                                name="password"
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                value={formik.values.password} />
                            <label className='styleErrors'>
                                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            </label>
                        </div>

                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary " type="submit">Create User</button>
                        </div>
                        <br />
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary " type="button" onClick={login}>Login</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default Resgister
