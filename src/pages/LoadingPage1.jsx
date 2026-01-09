import React from 'react';
import background from "../assets/imgs/background.png";

// Online Link ကို တိုက်ရိုက် variable ထဲ ထည့်ထားပါတယ်
// (မှတ်ချက် - ဒီ Link က အွန်လိုင်းကမို့ တစ်ခါတလေ ကြာရင် ပျက်သွားနိုင်ပါတယ်)
const catGifUrl = "https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif";

const LoadingPage1 = () => {
    return (
        <>
            <div
                className="flex justify-center items-center w-full h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${background})` }}
            >
                {/* Wheel Container */}
                <div className="relative w-60 h-60 flex justify-center items-center">

                    {/* ၁။ ဘီး (The Wheel - CSS Only) */}
                    {/* animate-spin-slow class မရှိရင် အောက်က style tag ထဲက code ကိုထည့်ပါ */}
                    <div
                        className="absolute w-full h-full border-[8px] border-gray-600 border-dashed rounded-full"
                        style={{ animation: 'spin 3s linear infinite' }}
                    ></div>

                    {/* ၂။ ကြောင် (The Cat - Online GIF) */}
                    <img
                        src={catGifUrl}
                        alt="Running Cat"
                        className="absolute w-32 h-auto bottom-6 object-contain z-10"
                        style={{
                            // ကြောင်ပုံက ဘယ်ဘက်လှည့်နေရင် ညာဘက်လှည့်အောင် flip လုပ်ခြင်း
                            // (ပုံမူရင်းပေါ်မူတည်ပြီး လိုရင်သုံးပါ)
                            transform: 'scaleX(-1)'
                        }}
                    />
                </div>
            </div>

            {/* Inline CSS for Spin Animation */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </>
    )
}
export default LoadingPage1;