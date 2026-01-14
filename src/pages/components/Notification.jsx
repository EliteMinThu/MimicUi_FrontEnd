import React, {useEffect, useState} from 'react'
import {useNoti} from "../../context/NotiContext.jsx";

const Notification = () => {

    const {message, clearMessage} = useNoti();

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!message) return;
        setShow(true);
        const timer = setTimeout(() => {
            setShow(false);
            clearMessage();
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    if(!message) return null;
    return (
        <div className={`border border-white/50 shadow-2xl shadow-gray-500/50 backdrop-blur-md rounded-md w-auto h-full`}>
            <div className={`text-xs md:text-md font-bold transition-opacity duration-1000 w-80 h-auto ${show ? "opacity-100" : "opacity-0"} flex justify-center items-center ${message.success ? "text-primary" : "text-red-500"} px-7 py-3.5 text-center`}>
                {message.errorMessage}
            </div>
        </div>
    )



}
export default Notification
