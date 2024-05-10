import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Features = () => {
    const [features, setFeatures] = useState([])


    useEffect(() => {
        axios(`${import.meta.env.VITE_API_KEY}/features`)
            .then(res => {
                console.log(res.data);
                setFeatures(res.data)
            })
    }, [])


    return (
        <div className='mt-14'>
             <h1 className='text-4xl font-bold text-center mb-12'>Feature of our online study group</h1>
            <div className='grid grid-cols-3 gap-3'>

                {features.map(feature => <>
                    <div className="card w-full bg-base-100 shadow-md image-full">
                        <figure><img src={feature.imageUrl} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-3xl text-white font-bold">{feature.title}</h2>
                            <p>{feature.description}</p>
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                    </div>
                </>)}
            </div>
        </div>


    )
};

export default Features;