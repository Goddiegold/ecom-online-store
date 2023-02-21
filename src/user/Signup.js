import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';

function Signup(props) {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const Message = () => {
        return (
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className={`alert alert-${values.success ? 'success' : 'danger'}`}
                        style={{ display: values.success || values.error ? "" : "none" }}
                    >
                        {values.success ?
                        <>New account created successfully. Please <Link to='/login'>Login now.</Link></>
                            :
                            "Check all fields again"}
                    </div>
                </div>
            </div>
        )
    }

    const handleChange = ({ target: { value, name } }) => setValues({ ...values, [name]: value })

    const handleSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name: values.name, email: values.email, password: values.password })
            .then(data => {
                console.log(data);
                if (data?.email === values.email) {
                    setValues({
                        name: "",
                        email: "",
                        password: "",
                        success: true,
                        error: ''
                    })
                } else {
                    setValues({
                        ...values,
                        error: true,
                        success: false
                    })
                }
            })
            .catch(err => console.log(err.message))
    }
    const signupForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className='text-light'>Name</label>
                            <input
                                onChange={handleChange}
                                className='form-control'
                                name='name'
                                value={values.name}
                                type='text'
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className='text-light'>Email</label>
                            <input
                                onChange={handleChange}
                                className='form-control'
                                name='email'
                                value={values.email}
                                type='text'
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className='text-light'>Password</label>
                            <input
                                onChange={handleChange}
                                className='form-control'
                                name='password'
                                value={values.password}
                                type='password'
                                required
                            />
                        </div>
                        <button className='btn btn-success btn-block'
                            onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title='Sign up Page' description='A signup to have your accout'>
            <Message />
            {signupForm()}
            <p className='text-white text-center'>

            </p>
        </Base>

    );
}

export default Signup;