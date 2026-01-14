import {createContext, useContext, useState} from "react";


const notiContext = createContext(null);

export const useNoti = () => {
    return useContext(notiContext);
}

export const NotiProvider = ({children}) => {
    const [ message, setMessage ] = useState(null);

    const pushMessage = (msg) => {
        setMessage(msg);
    }

    const clearMessage = () => {
        setMessage("");
    }

    return (
        <notiContext.Provider value={{message, pushMessage, clearMessage}}>
            {children}
        </notiContext.Provider>
    )
}