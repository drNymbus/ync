import { createContext } from 'react';
import axios from 'axios';

// init Context
const MailAPIContext = createContext();

export const MailAPIProvider = ({ children }) => {
    // const api_address = process.env.API_CONTACT_POINT;
    const api_address = 'http://88.174.59.203:15779';
    const config = {withCredentials: true, headers: {'Content-Type':'application/json', 'Accept':'application/json'}};

    const mailConfirmation = async (order) => {
        try {
            const res = await axios.post(`${api_address}/confirm_order`, {order}, config);
            return res;
        } catch (e) { console.error(`[mailConfirmation] ${e.message} ($e.status)`); }
    };


    return (
        <MailAPIContext.Provider value={{ mailConfirmation }}>
            {children}
        </MailAPIContext.Provider>
    );

};

export default MailAPIContext;