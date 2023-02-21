import React, { useState } from 'react';
import Base from '../core/Base';
import { Link,useNavigate } from 'react-router-dom';
import {  login,authenticate, isAuthenticated } from '../auth/helper';

function Signin(props) {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        didRedirect:false,
        loading:false
    })


    const handleChange = ({ target: { value, name } }) => setValues({ ...values, [name]: value })

    const handleSubmit = (event) => {
event.preventDefault()
setValues({...values,error:false,loading:true})
login({email:values.email,password:values.password})
.then(res=>{
    if(res?.user?.email===values.email && res.token){
        setValues({
            name: "",
            email: "",
            password: "",
            success: true,
            error: '',
            loading:false,
            didRedirect:true
        })

        authenticate(res,()=>console.log('Token added'))

        navigate('/user/dashboard')
    }else{
        setValues({
            ...values,
            error: true,
            success: false,
            loading:false
        })
    }
})
.catch(err=>console.log(err.message))
    }
    const signinForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        {/* <div className="form-group">
                            <label className='text-light'>Name</label>
                            <input
                                onChange={handleChange}
                                className='form-control'
                                name='name'
                                value={values.name}
                                type='text'
                                required
                            />
                        </div> */}

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
                       {values.loading?"Please wait":"Submit"}
                         </button>
                    </form>
                </div>
            </div>
        )
    }

    const Message = () => {
        return (
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className={`alert alert-${values.success ? 'success' : 'danger'}`}
                        style={{ display: values.success || values.error ? "" : "none" }}
                    >
                        {values.success ?
                        "Logged in successfully"
                            :
                            "Check all fields again"}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Base title='Login Page' description='Login to your account'>
        <Message/>
        {signinForm()}
        <p className='text-white text-center'>

        </p>
        </Base>

    );
}

export default Signin;