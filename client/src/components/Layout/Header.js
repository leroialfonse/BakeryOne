import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FcOldTimeCamera } from 'react-icons/fc'

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand"> <FcOldTimeCamera size={30} />  Light And Shadow</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" >Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                {/* <Link to={"/category"}
                                    data-bs-toggle="dropdown"
                                >Category</Link>
                                <ul className='dropdown-menu'>
                                    <li>
                                        <Link className='dropdown-item' to={'/category'}>All Categories</Link>

                                    </li>
                                    {categories?.map((c) => (<li>
                                    <Link
                                        className="dropdown-item"
                                        to={`/category/${c.slug}`}
                                    >
                                        {c.name}
                                    </Link>
                            </li>
                                    ))}
                        </ul> */}
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Create an Account </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cart" className="nav-link">Cart(0) </Link>
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
                </div>
            </nav>

        </>
    )
}

export default Header