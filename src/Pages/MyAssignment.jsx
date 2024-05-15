import React, { useContext, useEffect, useState } from 'react';
import { axiosSecure } from '../Hooks/useAxiosSecure';
import { GroupStudyContext } from '../Context/GroupStudyProvider';
import { useNavigate } from 'react-router-dom';

const MyAssignment = () => {
    const { user,logOutUser } = useContext(GroupStudyContext)
    const [myAssignment, setMyAssignment] = useState([])
    const navigate = useNavigate()



    // useEffect(()=>{
    //     axiosSecure(`/my_assignment?email=${user.email}`)
    //     .then(res=>{
    //         console.log(res.data);
    //         setMyAssignment(res.data)
    //     })
    // },[user.email])
    useEffect(() => {
        axiosSecure(`/my_assignment/${user.email}`)
            .then(res => {
                console.log(res.data);
                setMyAssignment(res.data)
               
            })
            .catch(error=>{
                console.log('my assignment error', error);
                if (error.message === 'Request failed with status code 401') {
                    logOutUser()
                    navigate('/login')
                }
            })
    }, [user.email, logOutUser, navigate])

    return (
        <div className='container mx-auto mt-9 max-w-[95%]'>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>

                        <tr>
                            <th>Examinee Name</th>
                            <th>Assignment Title</th>
                            <th>Assignment Mark</th>
                            <th>Obtained marks</th>
                            <th>Status</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                           myAssignment && myAssignment.length > 0 ? myAssignment.map(assignment => <>
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{assignment.fullName}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h3>{assignment.title}</h3>
                                    </td>
                                    <td>{assignment.marks}</td>
                                    <td>{assignment.obtainedMarks}</td>
                                    <td>{assignment.status}</td>
                                    <td>{assignment.examinerFeedback}</td>
                                </tr>


                            </>) : (
                                <div className='flex justify-center items-center h-full w-full'>
                                    <div className='text-center'>
                                        <h1>You have no assignment</h1>
                                    </div>
                                </div>

                            )
                            // <tr className=' text-center'>
                            //     <td className='col-span-6 text-center ml-44'>You have no assignment</td>
                            // </tr>

                            // <div className='w-full  grid col-span-6'>
                            //     <h1 className='text-center'>You have no assignment</h1>
                            // </div>



                        }



                    </tbody>
                    {/* foot */}
                    <tfoot>

                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default MyAssignment;