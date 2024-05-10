import React from 'react';

const Faq = () => {
    return (
        <div className='mt-16 bg-slate-100 p-12'>
            <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
            <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>

            <div className='flex justify-around items-center'>

                <div className='w-2/5 ml-16'>
                    <img  src="https://i.ibb.co/KWvQWMQ/images-3.jpg" alt="" />
                </div>

                <div className="join join-vertical w-3/5">
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                        How do I join a study group?
                        </div>
                        <div className="collapse-content">
                            <p>To join a study group, simply browse the available groups on the platform and request to join the ones that match your interests. If the group is public, you can join directly. If it's private, the group admin will need to approve your request.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">
                        Can I create my own study group?
                        </div>
                        <div className="collapse-content">
                            <p>Yes! We encourage users to create their own study groups based on their academic interests and needs. Simply navigate to the 'Create Group' section, fill out the required details, and start inviting members to join your group.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">
                        What should I do if I'm having technical issues?
                        </div>
                        <div className="collapse-content">
                            <p>If you encounter technical issues while using the platform, please reach out to our support team via email at support@example.com. Be sure to include details about the issue you're experiencing, along with any screenshots or error messages, so we can assist you more effectively.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Faq;