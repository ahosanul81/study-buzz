import React, { useEffect, useState } from 'react';
import  { axiosSecure } from '../Hooks/useAxiosSecure';
import { FaExternalLinkAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
const PendingAssignments = () => {
    const [pendingAssignments, setPendingAssignments] = useState([])
    const [pdfLink, setPdfLink] = useState(null)
    const [statusComplete, setStatusComplete] = useState(null)
    const [id, setId] = useState([])
    console.log('id', id);

    useEffect(() => {
        axiosSecure('/assignment_status_pending')
            .then(res => {
                // console.log(res.data);
                setPendingAssignments(res.data)
            })
    }, [])

    const handleSubmit = (e) => {
        const obtainedMarks = e.target.obtainedMarks.value
        const examinerFeedback = e.target.examinerFeedback.value
        console.log(obtainedMarks, examinerFeedback);
        const updateByExaminer = { obtainedMarks, examinerFeedback, statusComplete }
        axiosSecure.patch(`/assignment_status/${id}`, updateByExaminer)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
    }

    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Examinee Name</th>
                            <th>Assignment Title</th>
                            <th>Assignment Mark</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            pendingAssignments.map(assignment => <>
                                <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
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
                                    <td>{assignment.status}</td>

                                    <th>
                                        <button className="btn bg-gray-700 text-white hover:text-black" onClick={() => { document.getElementById('my_modal_3').showModal(); setStatusComplete('complete'); setId(assignment._id) }}>Give marks</button>
                                        <dialog id="my_modal_3" className="modal">
                                            <div className="modal-box  w-11/12 max-w-5xl">
                                                <div className='flex flex-col lg:flex-row justify-between gap-5 lg:gap-0'>
                                                    <div className='w-full lg:w-1/2'>
                                                        <h3 className="font-bold text-lg flex items-center gap-3">View Assignment <FaExternalLinkAlt onClick={() => setPdfLink(assignment.pdfLink)}></FaExternalLinkAlt></h3>
                                                        <p className="py-4">{assignment.feedback}</p>

                                                        <div className='px-5'>
                                                            <form onSubmit={handleSubmit}>
                                                                <div className="col-span-full sm:col-span-3">
                                                                    <label className="text-sm">Obtained Mark</label>
                                                                    <input id="obtainedMarks" name='obtainedMarks' type="text" required placeholder="Marks" className="w-full p-2 border border-orange-300 rounded-md  text-gray-900" />
                                                                </div>
                                                                <div className="col-span-full sm:col-span-3">
                                                                    <label className="text-sm">Examiner Feedback</label>
                                                                    <input id="examinerFeedback" name='examinerFeedback' type="text" placeholder="Place your feedback here" className="w-full p-2 border border-orange-300 rounded-md  text-gray-900" />
                                                                </div>
                                                                <button  className='btn bg-gray-700 text-white hover:text-black mt-5 w-full'>Submit</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div className='border-2 border-orange-600 w-full lg:w-1/2'>
                                                        <h3 className={`${pdfLink ? 'hidden' : 'block'}`}>Assignment will be shown here in PDF format</h3>
                                                        <iframe src={pdfLink} height={400} width={500} placeholder="Assignment will be shown here in PDF format"></iframe>
                                                    </div>
                                                </div>

                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        {/* if there is a button, it will close the modal */}
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </th>
                                </tr>


                            </>)
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

export default PendingAssignments;