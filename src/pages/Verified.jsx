import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import background from "../assets/imgs/background.png"; // Assuming you have these assets
import logo_text from "../assets/imgs/logo-text.png";

// --- Helper Icons (SVG Components) ---
const VerifyingIcon = () => (
    <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const SuccessIcon = () => (
    <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ErrorIcon = () => (
    <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const Verified = () => {
    // --- Hooks ---
    const { token } = useParams(); // URL ကနေ :token ကိုဖမ်းယူပါ
    const navigate = useNavigate(); // Redirect လုပ်ဖို့အတွက်

    // --- State ---
    const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('メールアドレスを確認しています...'); // User ကိုပြမယ့် message
    const [countdown, setCountdown] = useState(3); // Countdown timer

    // --- Effects ---
    // 1. Page load တာနဲ့ token ကို verify လုပ်ဖို့ useEffect
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setVerificationStatus('error');
                setMessage('認証トークンが見つかりません。');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/auth/verify/${token}`);

                if (response.ok) {
                    setVerificationStatus('success');
                    setMessage('メール認証が完了しました！');
                } else {
                    const errorData = await response.json();
                    setVerificationStatus('error');
                    setMessage(errorData.message || 'トークンが無効か、有効期限が切れています。');
                }
            } catch (err) {
                setVerificationStatus('error');
                setMessage('サーバーとの通信中にエラーが発生しました。');
            }
        };

        verifyToken();
    }, [token]); // token ပြောင်းလဲမှသာ ဒီ effect အလုပ်လုပ်ပါမယ်

    // 2. Verification အောင်မြင်သွားရင် countdown စဖို့ useEffect
    useEffect(() => {
        if (verificationStatus === 'success') {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            // Cleanup function: component unmount ဖြစ်ရင် interval ကိုရှင်းပါ
            return () => clearInterval(timer);
        }
    }, [verificationStatus]); // status က 'success' ဖြစ်သွားမှ ဒီ effect အလုပ်လုပ်ပါမယ်

    // 3. Countdown 0 ဖြစ်သွားရင် login page ကိုပို့ဖို့ useEffect
    useEffect(() => {
        if (countdown === 0) {
            navigate('/login');
        }
    }, [countdown, navigate]); // countdown ပြောင်းလဲတိုင်းစစ်ဆေးပါ

    // --- UI Rendering Logic ---
    const renderContent = () => {
        switch (verificationStatus) {
            case 'success':
                return (
                    <>
                        <SuccessIcon />
                        <h3 className="text-2xl text-green-600 font-bold">{message}</h3>
                        <p className="text-md text-black/80">
                            {countdown}秒後にログインページへ移動します...
                        </p>
                    </>
                );
            case 'error':
                return (
                    <>
                        <ErrorIcon />
                        <h3 className="text-2xl text-red-500 font-bold">認証エラー</h3>
                        <p className="text-md text-black/80">{message}</p>
                        <Link to="/login" className="mt-4 px-6 py-2 border border-gray-400 bg-secondary rounded-full text-center text-primary hover:bg-gray-200">
                            ログインページに戻る
                        </Link>
                    </>
                );
            default: // 'verifying'
                return (
                    <>
                        <VerifyingIcon />
                        <h3 className="text-2xl text-primary font-bold">{message}</h3>
                    </>
                );
        }
    };

    return (
        <div
            className="w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="flex flex-col h-screen">
                <div className="h-1/12">
                    <img
                        src={logo_text}
                        alt="logo-text"
                        className="w-25 md:w-30 lg:w-40 ms-auto md:ms-10 me-3 pt-5 pb-3"
                    />
                </div>
                <div className="flex justify-center items-center h-11/12">
                    <div className="flex flex-col items-center justify-center gap-4 border border-gray-400 py-10 px-8 text-center rounded-lg shadow-2xl backdrop-blur-xl w-10/12 md:w-8/12 min-h-[300px]">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verified;