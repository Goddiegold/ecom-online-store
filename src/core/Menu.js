import React from 'react';
import { Link, useLocation, useNavigate} from "react-router-dom"
import { isAuthenticated, logout} from '../auth/helper';

function Menu() {
    const location = useLocation()
    const navigate = useNavigate()
    const currentTab = (path) => location.pathname === path ? '#2ecc72' : "#ffffff"

    const handleLogout = () =>  {
        logout().then(res=>{
            console.log(res)
            navigate('/')
        }).catch(err=>{
            console.log(err)
        })
    }

    const authenticated = isAuthenticated()
    return (
        <div>
            <ul className="nav nav-tabs bg-dark text-white">
                <li className="nav-item">
                    <Link className='nav-link'
                        style={{ color: currentTab('/') }}
                        to='/'>Home</Link>
                </li>
                {!authenticated ?
                    <>
                        <li className="nav-item">
                            <Link className='nav-link'
                                style={{ color: currentTab('/login') }}
                                to='/login'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link'
                                style={{ color: currentTab('/signup') }}
                                to='/signup'>Signup</Link>
                        </li>
                    </>
                    : <>
                        <li className="nav-item">
                            <Link className='nav-link'
                                style={{ color: currentTab('/user/dashboard') }}
                                to='/user/dashboard'>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link'
                                style={{ color: currentTab('/cart') }}
                                to='/cart'>Cart</Link>
                        </li>
                        <li className="nav-item">
                           <span onClick={handleLogout} style={{cursor:"pointer"}}className='nav-link text-warning'>
                           Logout
                           </span>
                        </li>
                    </>
                }

            </ul>
        </div>
    );
}

export default Menu;