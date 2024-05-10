import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GroupStudyContext } from '../../Context/GroupStudyProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { logOutUser, user } = useContext(GroupStudyContext)
    console.log(user, 'navbar');

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "successfully  Logged out",
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const navLinks = <>
        <li><NavLink to='/assignments'>Assignments</NavLink></li>
        <li><NavLink to='/create_assignments'>Create assignments</NavLink></li>
        <li><NavLink to='/pending_assignments'>Pending assignments</NavLink></li>
    </>

    return (
        <div className="container mx-auto mb-6 navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-[1rem]">
                        {navLinks}
                    </ul>
                </div>
                <div className='w-36 h-20  rounded-full'>
                    <Link to="/">
                        <img className='w-full h-full ' src="/public/Images/study buzz logo.png" alt="aaa" />
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex ">
                <ul className="menu menu-horizontal px-1 text-[1rem]">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end gap-5">
                {user ? <>
                    <div className='w-14 h-14 border-2 border-orange-400 rounded-full p-[2px] dropdown dropdown-left dropdown-hover'>
                        <img className='w-full h-full rounded-full' src={user.photoURL} alt="" />

                        <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a> My attempted assignments</a></li>
  
                            <li><button onClick={handleLogOut} className=' bg-amber-400'>Logout</button></li>

                        </ul>
                    </div>
                    <button onClick={handleLogOut} className='btn bg-amber-900 text-white'>Logout</button></> :
                    <>
                        <NavLink to={'/login'}><button className='btn bg-amber-700 text-white font-bold '>Login</button></NavLink>
                    </>}

            </div>
        </div>
    );
};

export default Navbar;