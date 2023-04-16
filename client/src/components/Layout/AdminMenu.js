import React from 'react'
import { NavLink } from 'react-router-dom'
// Imort the user model so I can change "Administrator to 'Adminstrator (Name) '"
// import userModel from "../../."

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h4>Administrator Panel</h4>
                    <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action active" aria-current="true">
                        Create new Category
                    </NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create New Product</NavLink>
                    <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
                </div>
            </div>
        </>
    )
}

export default AdminMenu