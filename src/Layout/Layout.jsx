import React from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Home/Navbar';
import Footer from '../Pages/Home/Footer';

const Layout = () => {
    return (
        <div className=''>
             {/* <div className='container mx-auto max-w-[95%]'></div> */}
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-117px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;