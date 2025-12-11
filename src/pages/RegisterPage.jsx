// 必要なライブラリやコンポーネント、画像をインポートする
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import background from "../assets/imgs/background.png";
import logo_head from "../assets/imgs/logo-head.png";
import logo_text from "../assets/imgs/logo-text.png";

/**
 * 新規登録ページを表示・処理するコンポーネント
 */
function RegisterPage() {
    // --- State管理 ---
    // 各入力フィールドの値を管理するState
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // パスワード表示/非表示の状態を管理するState
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // エラーメッセージを管理するState
    const [errorMessage, setErrorMessage] = useState("");

    // --- Hooks ---
    // AuthContextからregister関数を取得
    const { register } = useAuth();
    // ページ遷移を管理するuseNavigateフック
    const navigate = useNavigate();

    /**
     * フォームが送信されたときに実行される非同期関数
     * @param {Event} event - フォーム送信イベント
     */
    const handleSubmit = async (event) => {
        // デフォルトのフォーム送信動作をキャンセル
        event.preventDefault();

        // パスワードと確認用パスワードが一致しない場合はエラーメッセージを設定して処理を中断
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            console.log(errorMessage);
            return;
        }

        // AuthContextのregister関数を呼び出し、ユーザー登録を試みる
        const result = await register(username, email, password);

        // 登録が成功した場合
        if (result.success) {
            // メール認証ページに遷移する
            navigate("/email-verify");
        } else {
            // 登録が失敗した場合、エラーメッセージを設定する
            setErrorMessage(result.message);
            console.log(result.message);
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
                <div className="min-h-screen flex items-center justify-center shadow-lg shadow-gray-500/50">

                    {/* 登録フォームのカード */}
                    <div className={`relative`}>
                        <div className="flex-row justify-center items-center rounded-3xl border border-gray-200 shadow-2xl shadow-gray-500/50 px-10 py-15">

                            {/* カード上部に表示されるロゴ */}
                            <div className={`absolute -top-12 left-1/2 -translate-x-1/2`}>
                                <img src={logo_head} alt="logo-head" className="w-25 border-1 p-0.5 border-gray-400 shadow-2xl backdrop-blur-xl rounded-full" />
                            </div>

                            {/* 登録フォーム */}
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <img src={logo_text} alt="logo-text" className="mb-2 mx-auto w-30" />

                                {/* ユーザー名入力フィールド */}
                                <div className="flex items-center justify-center">
                                    <div className="shadow-lg flex gap-2 items-center bg-white/70 p-2 hover:shadow-xl duration-300 border border-gray-400 group delay-200 rounded-md w-11/12">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[1rem] h-[1rem] group-hover:rotate-[360deg] duration-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        <input
                                            type="text"
                                            className="flex-1 focus:outline-none bg-transparent"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* メールアドレス入力フィールド */}
                                <div className="flex items-center justify-center">
                                    <div className="shadow-lg flex gap-2 items-center bg-white/70 p-2 hover:shadow-xl duration-300 border border-gray-400 group delay-200 rounded-md w-11/12">
                                        <svg className="group-hover:rotate-[360deg] duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" height="1em" width="1em">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <path d="M22 6l-10 7L2 6"></path>
                                        </svg>
                                        <input
                                            type="email"
                                            className="flex-1 focus:outline-none bg-transparent"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* パスワード入力フィールド */}
                                <div className="flex flex-col items-center justify-center">
                                    <div className="shadow-lg flex gap-2 items-center bg-white/70 p-2 hover:shadow-xl duration-300 border border-gray-400 group delay-200 rounded-md w-11/12">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[1rem] h-[1rem] group-hover:rotate-[360deg] duration-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                        </svg>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="flex-1 focus:outline-none bg-transparent"
                                            placeholder="Password"
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
                                            className="flex-1 focus:outline-none bg-transparent"
                                            placeholder="Confirm Password"
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
                                        className="text-black/80 hover:shadow-[inset_0_0_10px_#599896] hover:scale-103 transition-transform duration-500 active:scale-98 border border-gray-400 rounded-full shadow-md px-5.5 py-1.5 "
                                    >
                                        新規登録
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

export default RegisterPage;
