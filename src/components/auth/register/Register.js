import React from 'react';
import { Formik } from 'formik';
import './Register.css';
import { useFormik } from 'formik';
import logo from './user.png';



import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

// const Resgister = () => {
//     return (
//         <>
//         <div className='boxTitle'>
//             <h1 className='title'>CREATE USER</h1>
//         </div>
//             <div>
//                 <Formik
//                     initialValues={{ email: '', password: '', name: '', cel:'' }}
//                     validate={values => {
//                         const errors = {};
//                         if (!values.email) {
//                             errors.email = 'Email address is Required';
//                         } if (
//                             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//                         ) {
//                             errors.email = 'Invalid email address';
//                         }
//                         if (!values.password) {
//                             errors.password = 'Password is Required';
//                         }
//                         if(!values.name) {
//                             errors.name = 'Full Name is Required';
//                         }
//                         if(!values.cel) {
//                             errors.cel = 'Cel is Required';
//                         }
//                         return errors;
//                     }}
//                     onSubmit={(values, { setSubmitting }) => {
//                         setTimeout(() => {
//                             alert('user created successfully');
//                             alertify.alert('Success', 'User created successfully!', function(){ 
//                                 alertify.success('User Created !'); 
//                                 console.log(values);
//                               });
//                             setSubmitting(false);
//                         }, 400);
//                     }}
//                 >
//                     {({
//                         values,
//                         errors,
//                         touched,
//                         handleChange,
//                         handleBlur,
//                         handleSubmit,
//                         isSubmitting,
//                         /* and other goodies */
//                     }) => (
//                         <form onSubmit={handleSubmit}>
//                             <div className="form-floating mb-3 divForm">
//                                 <input type="text" className="form-control" id="floatingInput"
//                                     name="name"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     value={values.name} />
//                                 <label for="floatingInput">Full Name</label>
//                             </div>
//                             <label className='styleErrors divForm'>
//                                 {errors.name && touched.name && errors.name}
//                             </label>

//                             <div className="form-floating mb-3 divForm">
//                                 <input type="email" className="form-control" id="floatingInput"
//                                     name="email"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     value={values.email} />
//                                 <label for="floatingInput">Email address</label>
//                             </div>
//                             <label className='styleErrors divForm'>
//                                 {errors.email && touched.email && errors.email}
//                             </label>

//                             <div className="form-floating mb-3 divForm">
//                                 <input type="number" className="form-control" id="floatingInput"
//                                     name="cel"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     value={values.cel} />
//                                 <label for="floatingInput">Cel</label>
//                             </div>
//                             <label className='styleErrors divForm'>
//                                 {errors.cel && touched.cel && errors.cel}
//                             </label>

//                             <div className="form-floating mb-3 divForm">
//                                 <input type="password" className="form-control" id="floatingInput"
//                                     name="password"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     value={values.password} />
//                                 <label for="floatingInput">Password</label>
//                             </div>
//                             <label className='styleErrors divForm'>
//                                 {errors.password && touched.password && errors.password}
//                             </label>


//                             <div className="d-grid gap-2 col-6 mx-auto">
//                                 <button className="btn btn-primary" type="submit" disabled={isSubmitting}>Create User</button>
//                             </div>
//                         </form>
//                     )}
//                 </Formik>
//             </div>
//         </>
//     )
// }

// export default Resgister

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

    // GET USER INFO
    const getUserInfo = async () => {
        const url = `http://localhost:3000/api/`;
        const response = await fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',

            },
        });
        const data = await response.json();
        console.log(data);

    }

    // POST USER INFO
    const postUserInfo = async (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                emal: values.email,
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
                    });
                }
            })
            .catch(error => console.error(error))
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
                    </form>
                </div>
            </div>

        </>
    );
};

export default Resgister
