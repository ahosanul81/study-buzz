import React from 'react';
import { useContext,  useState } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { axiosSecure } from '../../Hooks/useAxiosSecure';
import { useLoaderData } from 'react-router-dom';
import { GroupStudyContext } from '../../Context/GroupStudyProvider';


const AssignmentDeatils = () => {
    const {user} = useContext(GroupStudyContext)
    const assignmentDetail = useLoaderData()
    const {_id, title, difficultyLevel, marks, imageUrl, date, description } = assignmentDetail
    const takenAssId = _id;



    const [difficultyLevelTaken, setDifficultyLevelTaken] = useState([])
    const [difficultyLevelOpen, setDifficultyLevelOpen] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    console.log(difficultyLevelTaken);

    const handleDifficultyLevel = (item) => {
        setDifficultyLevelTaken(item)
        setDifficultyLevelOpen(false)
    }

    const handleTakenAssignment = (e) => {
        e.preventDefault()
        const form = e.target;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const title = form.title.value;
        const difficultyLevel = form.difficultyLevel.value;
        const marks = form.marks.value;
        const obtainedMarks = "";
        const imageUrl = form.imageUrl.value;
        const date = form.date.value;
        const description = form.description.value;
        const pdfLink = form.pdfLink.value;
        const feedback = form.feedback.value;
        const status = 'pending'
        console.log(title, difficultyLevel, marks, imageUrl, date, description);

        const takenAssignment = {takenAssId, fullName, email, title, difficultyLevel,marks, obtainedMarks, imageUrl, date, description, pdfLink, feedback, status }
        console.log(takenAssignment);

        axiosSecure.post(`${import.meta.env.VITE_API_KEY}/assignments_taken`, takenAssignment)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1000,
                  
                  });
            })
    }

    return (
        <div className='container mx-auto '>
            <h1 className='text-4xl font-bold text-center mb-8'>Assignment details</h1>
            <div className=' flex flex-col lg:flex-row justify-evenly items-center gap-4'>
                <div className='w-full p-3 lg:w-4/12 h-72 flex flex-col justify-center space-y-6 bg-[#ADEFD1FF] '>
                    <h1 className='text-3xl font-bold text-[#00203FFF]'>{title}</h1>
                    <hr />
                    <h1 className='text-2xl font-medium'>Difficulty level: {difficultyLevel}</h1>
                    <hr />
                    <h3 className='text-2xl font-medium'>Marks: {marks}</h3>
                </div>
                <div className='w-full p-3 lg:w-4/12 flex flex-col justify-center '>
                    <img className='w-full h-full' src={imageUrl} alt="" />
                </div>
                <div className='w-full p-3 lg:w-4/12 flex flex-col justify-center  bg-[#606060FF] space-y-4 lg:p-12'>
                    <h4><span className='text-xl font-bold'>Description:</span> <br /> <span className='text-[#D6ED17FF] '>{description}</span></h4>
                    <h3><span className='text-red-500 font-bold'>Deadline:</span> <span className='text-white'>{date}</span></h3>
                </div>
            </div>


           
            <button className="btn bg-gray-800 w-full text-white mt-9 hover:text-black" onClick={() => document.getElementById('my_modal_4').showModal()}>Take assignment</button>

            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div>
                        <div>
                            <section className="lg:p-6 bg-gray-100 text-gray-900">
                                <form onSubmit={handleTakenAssignment} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                                    <fieldset className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:p-6 rounded-md shadow-sm bg-gray-50">
                                        <div className="space-y-2 col-span-full lg:col-span-1">
                                            <p className="font-medium">Assignment Information</p>
                                            <p className="text-xs">Describe your choice and ambition about your assignment.</p>

                                            <h1 className='text-4xl font-semibold'>Complete Assignment</h1>
                                        </div>
                                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                            <div className="col-span-full sm:col-span-3">
                                                <label className="text-sm">Full name</label>
                                                <input defaultValue={user?.displayName} readOnly id="fullName" name='fullName' type="text" placeholder="Full name" className="w-full p-2 border border-orange-300 rounded-md  text-gray-900" />
                                            </div>
                                            <div className="col-span-full sm:col-span-3">
                                                <label className="text-sm">Your Email</label>
                                                <input defaultValue={user?.email} readOnly id="email" name='email' type="email" placeholder="Your email" className="w-full p-2 border border-orange-300 rounded-md  text-gray-900" />
                                            </div>
                                            <div className="col-span-full sm:col-span-3">
                                                <label className="text-sm">Assignment Title</label>
                                                <input defaultValue={title} id="title" name='title' type="text" required placeholder="Title" className="w-full p-2 border border-orange-300 rounded-md  text-gray-900" />
                                            </div>
                                         


                                            <div className="dropdown dropdown-down  col-span-full sm:col-span-3 relative">
                                                <label htmlFor="lastname" className="text-sm">Assignment difficulty level</label>
                                                <input
                                                    defaultValue={difficultyLevel}
                                                    readOnly
                                                 
                                                    id="difficultyLevel"
                                                    name='difficultyLevel'
                                                    type="text"
                                                    placeholder="level"
                                                    className="w-full p-2 border border-orange-300 rounded-md  text-gray-900"
                                                    onChange={(e) => handleDifficultyLevel(e.target.value)}
                                                />
                                                <div onClick={() => setDifficultyLevelOpen(true)} tabIndex={0} role="button" className="text-2xl absolute right-3 bottom-2"><MdKeyboardArrowDown></MdKeyboardArrowDown></div>

                                                {difficultyLevelOpen && <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li onClick={() => handleDifficultyLevel('hard')}><a>Hard</a></li>
                                                    <li onClick={() => handleDifficultyLevel('medium')}><a>Medium</a></li>
                                                    <li onClick={() => handleDifficultyLevel('easy')}><a>Easy</a></li>
                                                </ul>}

                                            </div>

                                       
                                            <div className="col-span-full sm:col-span-3">
                                                <label className="text-sm">Marks</label>
                                                <input defaultValue={marks} id="marks" name='marks' type="text" required placeholder="Marks" className="w-full p-2 border border-orange-300 rounded-md  text-gray-900" />
                                            </div>
                                            <div className="col-span-full sm:col-span-3">
                                                <label className="text-sm">Image Url</label>
                                                <input defaultValue={imageUrl} id="imageUrl" name='imageUrl' type="text" placeholder="Image url" className="w-full p-2 border border-orange-300 rounded-md  text-gray-900" />
                                            </div>
                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="firstname" className="text-sm">Date</label> <br />
                                             
                                                <DatePicker defaultValue={date} className="w-full p-2 border border-orange-300 rounded-md  text-gray-900" selected={startDate} name="date" onChange={(date) => setStartDate(date)} />
                                            </div>
                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="lastname" className="text-sm">Description</label>
                                                <textarea defaultValue={description} name='description' id="description" placeholder="Description......." className="w-full p-2 border border-orange-300 rounded-md  text-gray-900"></textarea>
                                            </div>
                                            <div className="col-span-full sm:col-span-3">
                                                <label className="text-sm">PDF link</label>
                                                <input required id="imageUrl" name='pdfLink' type="text" placeholder="Give your pdf link" className="w-full p-2 border border-orange-300 rounded-md  text-gray-900" />
                                            </div>
                                            <div className="col-span-full sm:col-span-3">
                                                <label htmlFor="lastname" className="text-sm">Place your Feedback</label>
                                                <textarea name='feedback' id="feedback" placeholder="feedback......." className="w-full p-2 border border-orange-300 rounded-md  text-gray-900"></textarea>
                                            </div>


                                            <button type='submit' className='btn bg-gray-700 text-white w-full col-span-full hover:text-black'>Submit Assignment</button>
                                        </div>
                                    </fieldset>

                                </form>
                            </section>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                           
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>

    );
};

export default AssignmentDeatils;