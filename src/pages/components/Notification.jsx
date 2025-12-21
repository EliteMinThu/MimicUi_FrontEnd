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
        <div className={`border border-white/50 shadow-2xl shadow-gray-500/50 backdrop-blur-md rounded-md w-full h-full px-10 py-3 `}>
            <div className={`transition-opacity duration-1000 w-100 h-auto ${show ? "opacity-100" : "opacity-0"} flex justify-center items-center`}>
                {message}
            </div>
        </div>
    )



}
export default Notification
