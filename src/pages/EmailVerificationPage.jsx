import React, {useEffect, useState} from 'react'
import background from "../assets/imgs/background.png";
import logo_text from "../assets/imgs/logo-text.png";
import {Link, Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import LoadingPage from "./LoadingPage.jsx";


const EmailVerificationPage = () => {

    const location = useLocation();
    const { isVerified,  } = useAuth();
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
            }else if(!isVerified) {
                console.log("please login again")
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
                <div className="relative flex flex-col h-screen">
                    <div className={`absolute h-1/12 top-5 md:left-7 right-8`}>
                        <img
                            src={logo_text}
                            alt="logo-text"
                            className="w-25 md:w-30 lg:w-40 "
                        />
                    </div>
                    <div className={`flex  justify-center items-center h-12/12`}>
                        <div className={` flex flex-col items-center  border border-gray-400 py-4 px-8 text-center rounded-lg shadow-2xl backdrop-blur-xl w-8/12 space-y-6`}>
                            {/*<div className={`absolute top-3 right-5`}>*/}
                            {/*    <span className={` p-2  border border-gray-400 bg-secondary rounded-full`}>*/}
                            {/*        5*/}
                            {/*    </span>*/}
                            {/*</div>*/}
                            <div>
                                <h3 className={`text-2xl text-hu`}>メールアドレスの確認</h3>
                            </div>
                            <div>
                                <p className={`text-md text-black/80 leading-relaxed`}>
                                    ご登録いただいたメールアドレスに、確認用のメールを送信しました。メールに記載されているURL（リンク）をクリックして、登録を完了してください。
                                </p>
                            </div>
                            <div className={`cursor-pointer hover:scale-101 active:scale-98 transition duration-200 ease-in-out`}>
                                <p className={`px-6 py-3 border border-gray-400 bg-secondary rounded-full text-center text-primary`}>
                                    <button onClick={resetVerification}>
                                        確認メールを再送信する
                                    </button>
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
