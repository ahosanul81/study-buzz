import React, { useContext, useEffect, useState } from 'react';
import { axiosSecure } from '../Hooks/useAxiosSecure';
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GroupStudyContext } from '../Context/GroupStudyProvider';

const Assignments = () => {
    const { user } = useContext(GroupStudyContext)
    const [assignments, setAssignments] = useState([])
    // console.log('assignments', assignments);
    const [difficultyLevel, setDifficultyLevel] = useState(null)
    const [difficultyLevelOpen, setDifficultyLevelOpen] = useState([])
    const [sortByDifficultyLevel, setSortByDifficultyLevel] = useState([])
    const [count, setCount] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(5)
    // console.log('itemsPerPage', itemsPerPage);
    const [currentPage, setCurrentPage] = useState(0)
    // console.log('currentPage', currentPage);

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()]

    const handleDifficultyLevel = (item) => {
        setDifficultyLevel(item)
        setDifficultyLevelOpen(false)
    }


    useEffect(() => {
        axiosSecure(`/assignments?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => {
                // console.log(res.data);
                const {result, count} = res.data;
                setCount(count)
                setAssignments(result)
            })
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        axiosSecure(`/assignments/difficulty_level?difficultyLevel=${difficultyLevel}`)
            .then(res => {
                // console.log(res.data);
                setSortByDifficultyLevel(res.data)
            })
    }, [difficultyLevel])


    const handleDelete = (id, creatorEmail) => {
        if (user.email === creatorEmail) {
            // delete assignment
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {

                    axiosSecure.delete(`/assignment_delete/${id}`)
                        .then(res => {
                            console.log(res.data);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your assignment has been deleted.",
                                icon: "success"
                            });
                        })

                    const remainingAssignments = assignments.filter(assignment => assignment._id !== id)
                    setAssignments(remainingAssignments)
                }
            });
        }

        Swal.fire({
            title: "Sorry!!",
            text: "You are not creator of this assignment.",
            icon: "error"
        });

    }


    return (
        <div className='container mx-auto'>
            <div className='text-center'>
                <div className="dropdown mb-10 text-center">

                    <div onClick={() => setDifficultyLevelOpen(true)} tabIndex={0} role="button" className="btn m-1"> Difficulty level <MdKeyboardArrowDown className='text-2xl'></MdKeyboardArrowDown>
                        <input style={{ textTransform: 'capitalize' }} className='p-2 text-xl' type="text" readOnly value={difficultyLevel} />
                    </div>

                    {difficultyLevelOpen && <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={() => handleDifficultyLevel('hard')}><a>Hard</a></li>
                        <li onClick={() => handleDifficultyLevel('medium')}><a>Medium</a></li>
                        <li onClick={() => handleDifficultyLevel('easy')}><a>Easy</a></li>
                    </ul>}
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>

                {
                    difficultyLevel ? sortByDifficultyLevel.map(assignment => <>
                        <div key={assignment._id} className='w-full bg-[#222b34] space-y-5 p-3 rounded-md'>
                            <div>
                                <img className='w-full h-48 rounded-md' src={assignment.imageUrl} alt="" />
                            </div>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-3xl text-[#F2AA4CFF] font-bold'>{assignment.title}</h1>

                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className=""><FaUserEdit className='text-4xl text-white'></FaUserEdit></div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

                                        <li><NavLink to={`/assignment_update/${assignment._id}`}>Update</NavLink></li>
                                        <li onClick={() => handleDelete(assignment._id, assignment.email)}><a>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                            <hr />
                            <div className='flex justify-between text-[#F2AA4CFF] text-xl'>
                                <h3>Marks: {assignment.marks}</h3>
                                <h3>Difficulty level: {assignment.difficultyLevel}</h3>

                            </div>
                            <hr />
                            <div className='text-[#F2AA4CFF]'>
                                <h2><span className='text-red-500 font-bold'>Deadline:</span> {assignment.date}</h2>
                            </div>
                            <NavLink to={`/assignment_details/${assignment._id}`}><button className='btn w-full bg-[#ebe38a] text-xl mt-5'>View details</button></NavLink>
                        </div>
                    </>) : assignments.map(assignment => <>
                        <div key={assignment._id} className='w-full bg-[#222b34] space-y-5 p-3 rounded-md'>
                            <div>
                                <img className='w-full h-48 rounded-md' src={assignment.imageUrl} alt="" />
                            </div>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-3xl text-[#F2AA4CFF] font-bold'>{assignment.title}</h1>

                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className=""><FaUserEdit className='text-4xl text-white'></FaUserEdit></div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

                                        <li><NavLink to={`/assignment_update/${assignment._id}`}>Update</NavLink></li>
                                        <li onClick={() => handleDelete(assignment._id, assignment.email)}><a>Delete</a></li>
                                    </ul>
                                </div>
                            </div>

                            <hr />
                            <div className='flex justify-between text-[#F2AA4CFF] text-xl'>
                                <h3>Marks: {assignment.marks}</h3>
                                <h3>Difficulty level: {assignment.difficultyLevel}</h3>
                            </div>
                            <hr />
                            <div className='text-[#F2AA4CFF]'>
                                <h2><span className='text-red-500 font-bold'>Deadline:</span> {assignment.date}</h2>
                            </div>

                            <NavLink to={`/assignment_details/${assignment._id}`}><button className='btn w-full bg-[#ebe38a] text-xl mt-5'>View details</button></NavLink>
                        </div>
                    </>)
                }

            </div>

            <div className='text-center mt-10'>
            
                <button className='btn bg-[#717b33] text-white mr-3'>Prev</button>
                {
                    pages.map(page=> <button  onClick={()=> setCurrentPage(page)} key={page} className={`${currentPage === page ? 'btn bg-orange-400 text-white mr-3' : 'btn bg-gray-800 text-white mr-3'}`}>{page}</button>)
                }
                <button className='btn bg-[#717b33] text-white'>Next</button>
                <select onChange={(e)=> {setItemsPerPage(parseInt(e.target.value)); setCurrentPage(0)}} defaultValue={itemsPerPage} className='ml-3 border border-orange-600 py-2 px-1 rounded-md'>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>
        </div>

    );
};

export default Assignments;