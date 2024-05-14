import React, { useContext, useState } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { GroupStudyContext } from '../Context/GroupStudyProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { axiosSecure } from '../Hooks/useAxiosSecure';


const UpdateAssignment = () => {
    const assignment = useLoaderData()
    const navigate = useNavigate()
    const {_id, fullName, email, title, difficultyLevel, marks, imageUrl, date, description } = assignment
    const {user} = useContext(GroupStudyContext)
    // const [difficultyLevelOnUpdate, setDifficultyLevelOnUpdate] = useState([])
    const [difficultyLevelOpen, setDifficultyLevelOpen] = useState([])
    const [startDate, setStartDate] = useState(new Date());

    const handleDifficultyLevel = (item) => {
        // setDifficultyLevelOnUpdate(item)
        setDifficultyLevelOpen(false)
    }


    const handleUpdateAssignment = (e) => {
        e.preventDefault()
        const form = e.target;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const title = form.title.value;
        const difficultyLevel = form.difficultyLevel.value;
        const marks = form.marks.value;
        const imageUrl = form.imageUrl.value;
        const date = startDate
        const description = form.description.value;
        console.log(title, difficultyLevel, marks, imageUrl, date, description);

        const updateAssignment = {fullName, email, title, difficultyLevel, marks, imageUrl, date, description }
        console.log(updateAssignment);

        axiosSecure.patch(`/assignment_update/${_id}`, updateAssignment)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1000
                  });
                  navigate('/assignments')
            })
    }
    return (
        <div>
            <div>
                <section className="p-6 bg-gray-100 text-gray-900">
                    <form onSubmit={handleUpdateAssignment} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
                            <div className="space-y-2 col-span-full lg:col-span-1">
                                <p className="font-medium">Assignment Information</p>
                                <p className="text-xs">Describe your choice and ambition about your assignment.</p>

                                <h1 className='text-4xl font-semibold'>Update Assignment</h1>
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
                                {/* <div className="col-span-full sm:col-span-3 relative"> */}


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

                                {/* </div> */}
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
                                    {/* <input id="date" name='date' type="text" placeholder="Date" className="w-full p-2 border border-orange-300 rounded-md  text-gray-900" /> */}
                                    <DatePicker defaultValue={date} className="w-full p-2 border border-orange-300 rounded-md  text-gray-900" selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="lastname" className="text-sm">Description</label>
                                    <textarea defaultValue={description} name='description' id="description" placeholder="Description......." className="w-full p-2 border border-orange-300 rounded-md  text-gray-900"></textarea>
                                </div>


                                <button type='submit' className='btn bg-gray-700 text-white w-full col-span-full hover:text-black'>Update Assignment</button>
                            </div>
                        </fieldset>

                    </form>
                </section>
            </div>
        </div>
    );
};

export default UpdateAssignment;