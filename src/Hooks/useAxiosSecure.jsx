import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GroupStudyContext } from '../Context/GroupStudyProvider';

export const axiosSecure = axios.create({
    baseURL: 'https://online-group-study-server-lac.vercel.app',
    // baseURL: 'http://localhost:5000',
    withCredentials: true
})
const useAxiosSecure = () => {
    const {logOutUser} = useContext(GroupStudyContext)
    const navigate = useNavigate()
    // useEffect(()=>{
    //     axiosSecure.interceptors.response.use(res=> {
    //         return res;
    //     }, error=>{
    //         console.log('error tracked in the interceptor', error.response);
    //         if(error.response.this.status === 401 || error.response.this.status === 403){
    //             console.log('logged out');
    //             logOutUser()
    //             .then(()=> {
    //                 console.log('log out successful');
    //                 navigate("/login")
    //             })
    //             .catch(error=> {
    //                 console.log(error);
    //             })
    //         }
    //     })
    //    })

    useEffect(() => {
        // Add a response interceptor
        axiosSecure.interceptors.response.use((response) => {
            console.log('response', response)
            return response;
        }, (error) => {
            console.log('error in interceptors', error);
            if (error.response.status === 401 || error.response.status === 403) {

                logOutUser()
                console.log('log out the user');
                navigate('/login')
            }
        });
    }, [logOutUser, navigate])
   
    return axiosSecure
};

export default useAxiosSecure;