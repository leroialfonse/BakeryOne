import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
// import { FcOldTimeCamera } from 'react-icons/fc'
import toast from "react-hot-toast"
import SearchForm from '../Form/SearchForm'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'
import { Badge } from 'antd'



const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();
    // When a user clicks on logout in the nav, local storage clears "auth", effectively logging the user out.
    const handleLogOut = () => {
        setAuth({
            ...auth, user: null,
            token: ""
        })
        localStorage.removeItem('auth')
        toast.success('See you later!')
    }

    return (

        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand">

                            Light And Shadow</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <SearchForm />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" >Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={'/categories'} data-bs-toggle="dropdown" >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={'/categories'}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li>

                                            <Link className="dropdown-item" to={`/category/${c.slug}`}>
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                            </li>
                            {/* If there is no logged in user, show an option to login or register on nav, or a logout if they're in. */}
                            {
                                !auth.user ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link">Register </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link">Login </NavLink>
                                        </li>
                                    </>) : (<>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item" >Dashboard</NavLink></li>
                                                <li> <NavLink onClick={handleLogOut} to="/login" className="dropdown-item">Logout </NavLink></li>

                                            </ul>
                                        </li>


                                    </>)
                            }
                            <li className="nav-item">
                                <Badge count={cart?.length} showZero>
                                    <NavLink to="/cart" className="nav-link">Cart </NavLink>
                                </Badge>

                            </li>


                            {/* A link that I'm not sure what to do with yet. */}
                            {/* <li className="nav-item">
                                <Link to="/" className="nav-link ">Dunno Yet. New link.</Link>
                            </li> */}
                        </ul>
                        {/* I may want this form for something. I dunnow yet. */}
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div >
            </nav >

        </>
    );
};

export default Header;