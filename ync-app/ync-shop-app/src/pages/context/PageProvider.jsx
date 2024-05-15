import React, {useEffect, useContext, useState, createContext} from 'react';

// init Context
const PageContext = createContext();


export const PageProvider = ({ children }) => {

// State
    const [page, setPage] = useState(null);

//Render
    return (

        <PageContext.Provider value={{ page, setPage }}> 
            {children}
        </PageContext.Provider>

    );

};

export default PageContext;