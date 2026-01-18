// 必要なライブラリやコンポーネント、画像をインポートする
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import background from "../assets/imgs/background.png";
import logo_head from "../assets/imgs/logo-head.png";
import logo_text from "../assets/imgs/logo-text.png";
import {useNoti} from "../context/NotiContext.jsx";
import Notification from "./components/Notification.jsx";

/**
 * 新規登録ページを表示・処理するコンポーネント
 */
function ResetPasswordPage() {
    // --- State管理 ---
    // 各入力フィールドの値を管理するState
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {token} = useParams();
    const { pushMessage } = useNoti();

    // パスワード表示/非表示の状態を管理するState
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // エラーメッセージを管理するState
    const [errorMessage, setErrorMessage] = useState("");






    const navigate = useNavigate();


    const { user } = useAuth();

    if (user) {
        return <Navigate to="/select" replace />;
    }

    const handleSubmit = async (event) => {
        // デフォルトのフォーム送信動作をキャンセル
        event.preventDefault();

        if (password !== confirmPassword) {
            pushMessage({success: false, errorMessage: "パスワードが位置しいない!!!"})
            return;
        }
        // --- Limit ---
        //パスワードをせめて8個以上にする
        if(password.length < 8) {
            pushMessage({success : false, errorMessage : "パスワードを8個以上してください。"});
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({password}),
                credentials: "include",
            })

            if(response.ok) {
                navigate("/login");
                pushMessage({success : true, errorMessage : "パスワード更新しました。ログインしてください."})
                return;
            } else {
                pushMessage({success : false, errorMessage : "最初からやり直してください!!!"})
            }


        }catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }

    };

    // --- レンダリング ---
    return (
        <>
            {/* 背景画像を設定した全画面コンテナ */}
            <div
                className="w-full h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-10`}>
                    <Notification/>
                </div>
                <div className="min-h-screen flex items-center justify-center shadow-lg shadow-gray-500/50">

                    {/* 登録フォームのカード */}
                    <div className={`relative`}>
                        <div className="flex-row justify-center items-center rounded-3xl border border-gray-200 shadow-2xl shadow-gray-500/50 px-10 py-15">

                            {/* カード上部に表示されるロゴ */}
                            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 cursor-pointer z-10`}>
                                <img src={logo_head} alt="logo-head" className="w-25 border-1 p-0.5 border-gray-400 shadow-2xl backdrop-blur-xl rounded-full" onClick={() => {navigate('/login')}}/>
                            </div>

                            {/* 登録フォーム */}
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <img src={logo_text} alt="logo-text" className="mb-2 mx-auto w-30" />





                                {/* パスワード入力フィールド */}
                                <div className="flex flex-col items-center justify-center">
                                    <div className="shadow-lg flex gap-2 items-center bg-white/70 p-2 hover:shadow-xl duration-300 border border-gray-400 group delay-200 rounded-md w-11/12">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[1rem] h-[1rem] group-hover:rotate-[360deg] duration-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                        </svg>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="flex-1 focus:outline-none bg-transparent w-full"
                                            placeholder="新しいパスワード"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        {/* パスワード表示/非表示切り替えボタン */}
                                        <div className="cursor-pointer" onClick={() => { setShowPassword(!showPassword) }}>
                                            {!showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[1rem] h-[1rem]">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[1rem] h-[1rem]">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 確認用パスワード入力フィールド */}
                                <div className="flex flex-col items-center justify-center">
                                    <div className="shadow-lg flex gap-2 items-center bg-white/70 p-2 hover:shadow-xl duration-300 border border-gray-400 group delay-200 rounded-md w-11/12">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[1rem] h-[1rem] group-hover:rotate-[360deg] duration-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                        </svg>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="flex-1 focus:outline-none bg-transparent w-full"
                                            placeholder="確認新しいパスワード"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        {/* 確認用パスワード表示/非表示切り替えボタン */}
                                        <div className="cursor-pointer" onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}>
                                            {!showConfirmPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[1rem] h-[1rem]">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[1rem] h-[1rem]">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 新規登録ボタン */}
                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="text-black/80 hover:shadow-[inset_0_0_10px_#599896] hover:scale-103 transition-transform duration-500 active:scale-98 border border-gray-400 rounded-full shadow-md px-5.5 py-1.5 cursor-pointer"
                                    >
                                        パスワード更新
                                    </button>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPasswordPage;
