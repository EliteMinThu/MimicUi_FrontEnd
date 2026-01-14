// 必要なライブラリやコンポーネント、画像をインポートする
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import background from "../assets/imgs/background.png";
import logo_head from "../assets/imgs/logo-head.png";
import logo_text from "../assets/imgs/logo-text.png";
import LoadingPage from "./LoadingPage.jsx";
import Notification from "./components/Notification.jsx";
import {useNoti} from "../context/NotiContext.jsx";


function ForgetPasswordPage() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { pushMessage } = useNoti();

    const navigate = useNavigate();

    if (loading) {
        return <LoadingPage/>
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
       try {
           const response = await fetch ('http://localhost:5000/api/auth/forgot-password', {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({email})
           })
           const data = await response.json()
           if (response.ok) {
               pushMessage({success: true, errorMessage: data.message})

           } else {
               pushMessage({success: false, errorMessage: data.errorMessage})
           }
       }catch(err) {
           console.log(err);
       }finally {
           setLoading(false);
       }

    };

    // --- レンダリング ---
    return (
        <>
            <div
                className="w-full h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-10`}>
                    <Notification/>
                </div>
                <div className="min-h-screen flex items-center justify-center shadow-lg shadow-gray-500/50">

                    <div className={`relative`}>
                        <div className="flex-row justify-center items-center rounded-3xl border border-gray-200 shadow-2xl shadow-gray-500/50 px-10 py-15">

                            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 cursor-pointer`}>
                                <img src={logo_head} alt="logo-head" className="w-25 border-1 p-0.5 border-gray-400 shadow-2xl backdrop-blur-xl rounded-full" onClick={() =>{navigate('/login')}} />
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <img src={logo_text} alt="logo-text" className="mb-2 mx-auto w-30" />

                                {/* メールアドレス入力フィールド */}
                                <label htmlFor="search-email" className={`cursor-pointer text-primary text-sm `}>アカウントを検索</label>
                                <div className="flex items-center justify-center mt-1">

                                    <div className="shadow-lg flex gap-2 items-center bg-white/70 p-2 hover:shadow-xl duration-300 border border-gray-400 group delay-200 rounded-md w-full">
                                        <svg className="group-hover:rotate-[360deg] duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" height="1em" width="1em">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <path d="M22 6l-10 7L2 6"></path>
                                        </svg>
                                        <input
                                            type="email"
                                            id="search-email"
                                            className="flex-1 focus:outline-none bg-transparent"
                                            placeholder="メールアドレス 記入"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>



                                {/* ログインボタン */}
                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="hover:shadow-[inset_0_0_10px_#599896] hover:scale-103 transition-transform duration-500 active:scale-98 border border-gray-400 rounded-full shadow-md px-4 py-1.5 cursor-pointer"
                                    >
                                        送信
                                    </button>
                                </div>



                            </form>
                            {/* エラーメッセージ表示エリア */}
                            {errorMessage && (
                                <p className="mt-4 text-sm text-red-600 font-semibold text-center">
                                    {errorMessage}
                                </p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgetPasswordPage;
