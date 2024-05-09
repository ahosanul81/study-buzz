import React, { createContext } from 'react';
const GroupStudyContext = createContext()
const GroupStudyProvider = ({ children }) => {




    const studyInfo = {}
    return (
        <div>
            <GroupStudyContext.Provider value={studyInfo}>
                {children}
            </GroupStudyContext.Provider>
        </div>
    );
};

export default GroupStudyProvider;