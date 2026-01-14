import React, {useEffect, useState} from 'react'
import background from "../assets/imgs/background.png";
import logo_text from "../assets/imgs/logo-text.png";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import LoadingPage from "./LoadingPage.jsx";
import Notification from "./components/Notification.jsx";
import {useNoti} from "../context/NotiContext.jsx";


const EmailVerificationPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { isVerified } = useAuth();
    const { pushMessage } = useNoti()
    const [loading, setLoading] =useState(false)

    if (!location.state?.allowed) {
        return <Navigate to="/cvform" replace />;
    }

    if (loading) {
        return <><LoadingPage/></>
    }


    const resetVerification = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/reset-token', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({isVerified}),
                credentials: "include",
            })

            const data = await response.json();
            if(response.ok) {
                console.log("please check email");
                pushMessage({success:true, errorMessage : "メールをチャックしてください!!!"});
            }else if(!isVerified) {
                console.log("please login again")
                pushMessage({success:false, errorMessage : "もう一度ログインしてください!!!"});
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div
                className="w-full h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-10`}>
                    <Notification/>
                </div>
                <div className="relative flex flex-col h-screen">
                    <div className={`group absolute top-5 h-1/12 left-7 w-fit cursor-pointer `}>
                        <img
                            src={logo_text}
                            alt="logo-text"
                            className="w-25 md:w-30 lg:w-40 "
                            onClick={() => {
                                navigate('/login')
                            }}
                        />
                        <div className="absolute top-12 left-0 bg-white/10 shadow-2xl border border-gray-400 text-primary text-xs font-semibold p-2 rounded
                opacity-0 translate-y-2
                transition-all duration-500 ease-out
                group-hover:opacity-100 group-hover:translate-y-0">
                            ログインパージへ
                        </div>

                    </div>
                    <div className={`flex  justify-center items-center h-12/12`}>
                        <div
                            className={` flex flex-col items-center  border border-gray-400 py-4 px-8 text-center rounded-lg shadow-2xl backdrop-blur-xl w-8/12 space-y-6`}>
                            {/*<div className={`absolute top-3 right-5`}>*/}
                            {/*    <span className={` p-2  border border-gray-400 bg-secondary rounded-full`}>*/}
                            {/*        5*/}
                            {/*    </span>*/}
                            {/*</div>*/}
                            <div>
                                <h3 className={`text-2xl text-hu`}>メールアドレスの確認</h3>
                            </div>
                            <div>
                                <p className={`text-[16px] md:text-md text-black/80 leading-relaxed`}>
                                    ご登録いただいたメールアドレスに、確認用のメールを送信しました。メールに記載されているURL（リンク）をクリックして、登録を完了してください。
                                </p>
                            </div>
                            <div className={`cursor-pointer hover:scale-101 active:scale-98 transition duration-200 ease-in-out`}>
                                <p className={`px-6 py-2.5 md:py-3.5 border border-gray-400 bg-secondary rounded-full text-center text-primary`}>
                                    <div onClick={resetVerification} className={`text-xs md:text-md`}>
                                        確認メールを再送信する
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EmailVerificationPage
