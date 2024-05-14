import React from 'react';
import Banner from './Banner';
import Features from './Features';
import Faq from './Faq';





const Home = () => {
    return (
        <div className='container mx-auto'>
            <Banner></Banner>
            <Features></Features>
            <Faq></Faq>
        </div>
    );
};

export default Home;