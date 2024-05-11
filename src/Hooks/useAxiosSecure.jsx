import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GroupStudyContext } from '../Context/GroupStudyProvider';
export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})
const useAxiosSecure = () => {
    const {logOutUser} = useContext(GroupStudyContext)
    const navigate = useNavigate()
    useEffect(()=>{
        axiosSecure.interceptors.response.use(res=> {
            return res;
        }, error=>{
            console.log('error tracked in the interceptor', error.response);
            if(error.response.this.status === 401 || error.response.this.status === 403){
                console.log('logged out');
                logOutUser()
                .then(()=> {
                    console.log('log out successfull');
                    navigate("/login")
                })
                .catch(error=> {
                    console.log(error);
                })
            }
        })
       })
    
        

    return axiosSecure
};

export default useAxiosSecure;