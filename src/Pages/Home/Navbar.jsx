import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GroupStudyContext } from '../../Context/GroupStudyProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { logOutUser, user } = useContext(GroupStudyContext)
    // console.log(user, 'navbar');

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "successfully  logged out",
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const navLinks = <>
        <li><NavLink to='/assignments' className=" lg:border lg:border-orange-400 ">Assignments</NavLink></li>
        <li><NavLink to='/create_assignments' className="lg:border lg:border-orange-400 lg:mx-4">Create assignments</NavLink></li>
        <li><NavLink to='/pending_assignments' className="lg:border lg:border-orange-400 ">Pending assignments</NavLink></li>
    </>



    return (
        <div className="container mx-auto mb-6 navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-40 p-2 shadow bg-base-100 rounded-box w-52 text-[1rem]" >
                        {navLinks}
                        <li><button onClick={handleLogOut} className=' bg-amber-400'>Logout</button></li>
                    </ul>
                </div>
                <Link to="/" className=''>
                    <div className='w-20 h-10 lg:w-24 lg:h-12 ml-4 rounded-full flex flex-row lg:flex-col justify-center items-center'>

                        <img className='w-full h-full ' src="https://i.ibb.co/3d2Br7z/study-buzz-logo-for-fav-Icon.png" alt="aaa" />

                        <h1 className='flex flex-row gap-1'><span className='font-bold'>Study</span> <span className='text-amber-600 font-bold'>Buzz</span></h1>


                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex ">
                <ul className="menu menu-horizontal px-1 text-[1rem]">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end gap-5">
                {user ? <>
                    <div className=" dropdown dropdown-left dropdown-hover">
                        <div tabIndex={0} className="w-14 h-14 border-2 border-orange-400 rounded-full p-[2px] ">
                            <img title={user.email} className='w-full h-full rounded-full' src={user.photoURL} alt="" />
                        </div>

                        <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-32 lg:w-52">

                            <li><NavLink to="/my_attempted_assignments">My attempted assignments</NavLink></li>
                            <li><button onClick={handleLogOut} className=' bg-amber-400'>Logout</button></li>
                        </ul>
                    </div>



                    {/* <button onClick={handleLogOut} className='btn bg-amber-900 text-white'>Logout</button> */}
                </> :
                    <>
                        <NavLink to={'/login'}><button className='btn bg-amber-700 text-white font-bold '>Login</button></NavLink>
                        <NavLink to={'/sign_up'}><button className='btn bg-amber-700 text-white font-bold '>Sign Up</button></NavLink>
                    </>}

            </div>
        </div>
    );
};

export default Navbar;