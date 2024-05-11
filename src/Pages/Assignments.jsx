import React, { useEffect, useState } from 'react';
import { axiosSecure } from '../Hooks/useAxiosSecure';
import { MdKeyboardArrowDown } from "react-icons/md";

const Assignments = () => {
    const [assignments, setAssignments] = useState([])
    const [difficultyLevel, setDifficultyLevel] = useState(null)
    const [difficultyLevelOpen, setDifficultyLevelOpen] = useState([])
    const [sortByDifficultyLevel, setSortByDifficultyLevel] = useState([])
    console.log('difficultyLevel', difficultyLevel);

    const handleDifficultyLevel = (item) => {
        setDifficultyLevel(item)
        setDifficultyLevelOpen(false)
    }

    useEffect(() => {
        axiosSecure('/assignments',)
            .then(res => {
                // console.log(res.data);
                setAssignments(res.data)
            })
    }, [])

    useEffect(() => {
        axiosSecure(`/assignments/difficulty_level?difficultyLevel=${difficultyLevel}`)
            .then(res => {
                console.log(res.data);
                setSortByDifficultyLevel(res.data)
            })
    }, [difficultyLevel])


    return (
        <div>
            <div className='text-center'>
                <div className="dropdown mb-10 text-center">
                    <div onClick={() => setDifficultyLevelOpen(true)} tabIndex={0} role="button" className="btn m-1"> Difficulty level <MdKeyboardArrowDown className='text-2xl'></MdKeyboardArrowDown></div>
                    {difficultyLevelOpen && <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={() => handleDifficultyLevel('hard')}><a>Hard</a></li>
                        <li onClick={() => handleDifficultyLevel('medium')}><a>Medium</a></li>
                        <li onClick={() => handleDifficultyLevel('easy')}><a>Easy</a></li>
                    </ul>}
                </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>

                {
                    difficultyLevel ? sortByDifficultyLevel.map(assignment => <>
                        <div className='w-full bg-[#222b34] space-y-5 p-3 rounded-md'>
                            <div>
                                <img className='w-full h-48 rounded-md' src={assignment.imageUrl} alt="" />
                            </div>
                            <div>
                                <h1 className='text-3xl text-[#F2AA4CFF] font-bold'>{assignment.title}</h1>
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
                        </div>
                    </>) : assignments.map(assignment => <>
                        <div className='w-full bg-[#222b34] space-y-5 p-3 rounded-md'>
                            <div>
                                <img className='w-full h-48 rounded-md' src={assignment.imageUrl} alt="" />
                            </div>
                            <div>
                                <h1 className='text-3xl text-[#F2AA4CFF] font-bold'>{assignment.title}</h1>
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
                        </div>
                    </>)

                }

               

            </div>
        </div>

    );
};

export default Assignments;