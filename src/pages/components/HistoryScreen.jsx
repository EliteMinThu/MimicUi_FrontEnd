import React, { useState } from "react"; // 1. useState ကို import လုပ်ပါ
import FeedBackpage from "../FeedBackpage.jsx";

/**
 * 面接の履歴を表示するためのコンポーネント
 */
const HistoryScreen = () => {
    // 2. Modal (အဖြူရောင် box) ပွင့်/ပိတ် ထိန်းချုပ်ဖို့ State ကြေညာပါ
    const [showFeedback, setShowFeedback] = useState(false);
    // Coordinates အတွက် state အသစ်ထပ်ထည့်ပါ
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

    // サンプルデータ
    const historyData = [
        { id: 1, question: "長所", date: "1月28日", file: "Detail", grade: "A" },
        { id: 2, question: "短所", date: "1月27日", file: "Detail", grade: "B" },
        { id: 3, question: "志望動機", date: "1月26日", file: "Detail", grade: "A" },
        { id: 4, question: "自己PR", date: "1月25日", file: "Detail", grade: "C" },
        { id: 5, question: "ガクチカ", date: "1月24日", file: "Detail", grade: "B" },
    ];

    // Modal ပိတ်မယ့် Function
    const handleCloseModal = () => {
        setShowFeedback(false);
    };

    // Animation အတွက် style tag ထည့်ပါ (Tailwind config မပြင်ချင်သူများအတွက်)
    const animationStyle = `
  @keyframes popOut {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-pop {
    animation: popOut 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
`;

    return (
        <>
            <div className={`flex justify-center items-center w-full min-h-[400px] md:h-[530px] px-2 md:px-0`}>
                <div className="relative w-full md:w-10/12 rounded-2xl md:rounded-3xl border border-gray-400 shadow-2xl px-3 md:px-5 pb-1 pt-6 md:pt-4 shadow-gray-500/50">
                    {/* ページのタイトル部分 */}
                    <div className="absolute -top-8 md:-top-11 right-4 md:right-6">
                        <div className="px-4 md:px-10 py-1 rounded-full bg-BGdanger shadow-md shadow-gray-500/50 border border-gray-400">
                            <span className="text-sm md:text-xl text-black">履歴一覧</span>
                        </div>
                    </div>

                    {/* テーブルヘッダー */}
                    {/* Desktop: Grid layout */}
                    <div className="hidden md:flex md:justify-center md:grid md:grid-cols-5 gap-2 bg-BGdanger shadow-md rounded-t border border-gray-800 px-4 py-2 mb-3">
                        {["質問内容", "日時", "ファイル", "評価", "取り消し"].map((label, idx) => (
                            <button
                                key={label}
                                className="flex items-center justify-center px-4 md:px-6 py-2 md:py-3 rounded-md text-black bg-white border border-gray-800 text-xs md:text-sm"
                            >
                                <span>{label}</span>
                                {idx === 0 && <span className="text-xs ml-1">▼</span>}
                            </button>
                        ))}
                    </div>
                    
                    {/* Mobile: Hidden header labels (will be shown in card layout) */}
                    <div className="md:hidden text-xs text-gray-600 mb-2 px-2">
                        <span className="text-xs">履歴データ</span>
                    </div>

                    {/* 履歴データテーブルの本体 */}
                    <div className="overflow-x-auto md:overflow-x-hidden overflow-y-visible">
                        {/* Desktop: Grid layout */}
                        <div className="hidden md:block">
                            {historyData.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-5 items-center px-4 md:px-8 py-3 md:py-4 text-gray-800 odd:bg-white even:bg-secondary mb-1.5 rounded text-sm md:text-md"
                                >
                                    <div className="text-center">{item.question}</div>
                                    <div className="text-center">{item.date}</div>

                                    {/* 3. Detail ကိုနှိပ်ရင် setShowFeedback(true) ကိုခေါ်ပါ */}
                                    <div
                                        className="text-center text-blue-700 underline cursor-pointer"
                                        onClick={(e) => {
                                            // Mouse နှိပ်လိုက်တဲ့ မျက်နှာပြင် Screen နေရာ (x, y) ကို ယူပါတယ်
                                            const rect = e.target.getBoundingClientRect();
                                            setClickPosition({
                                                x: rect.left + rect.width / 2,
                                                y: rect.top + rect.height / 2
                                            });
                                            setShowFeedback(true);
                                        }}
                                    >
                                        {item.file}
                                    </div>

                                    <div className="text-center font-semibold">{item.grade}</div>
                                    <div className="flex justify-center">
                                        <button className="px-3 md:px-5 py-1 rounded-full bg-danger/50 border border-gray-500 text-xs md:text-sm">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile: Card layout */}
                        <div className="md:hidden space-y-3">
                            {historyData.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">質問内容</div>
                                            <div className="text-sm font-medium text-gray-800">{item.question}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500 mb-1">評価</div>
                                            <div className="text-lg font-semibold text-gray-800">{item.grade}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mb-2 pt-2 border-t border-gray-200">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">日時</div>
                                            <div className="text-sm text-gray-700">{item.date}</div>
                                        </div>
                                        <div
                                            className="text-sm text-blue-700 underline cursor-pointer"
                                            onClick={(e) => {
                                                const rect = e.target.getBoundingClientRect();
                                                setClickPosition({
                                                    x: rect.left + rect.width / 2,
                                                    y: rect.top + rect.height / 2
                                                });
                                                setShowFeedback(true);
                                            }}
                                        >
                                            {item.file}
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-2 border-t border-gray-200">
                                        <button className="px-4 py-1.5 rounded-full bg-danger/50 border border-gray-500 text-xs">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ページネーション */}
                    <div className="my-3 flex justify-center gap-2 md:gap-4">
                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full border shadow-sm text-xs md:text-sm ${
                                    page === 1 ? "bg-orange-200 border-orange-300" : "bg-white border-gray-300"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Feedback Modal (အဖြူရောင် Box) */}
            {showFeedback && (
                <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50 p-2 md:p-0">
                    <style>{animationStyle}</style> {/* CSS Keyframes ထည့်သွင်းခြင်း */}

                    <div
                        // ဒီနေရာမှာ Animation class ထည့်ပါတယ်
                        className="bg-white/10 rounded-lg shadow-xl w-full h-full md:w-10/12 md:h-11/12 border border-gray-400 overflow-auto relative p-2 md:p-4 animate-pop overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white/10"

                        // Box ပွင့်လာမယ့် အစမှတ်ကို သတ်မှတ်ပါတယ် (Mouse နှိပ်လိုက်တဲ့နေရာ)
                        // Mobile မှာ center ကနေ animate လုပ်မယ်
                        style={{
                            transformOrigin: window.innerWidth < 768 
                                ? "center center" 
                                : `${clickPosition.x - (window.innerWidth/2) + (window.innerWidth * 0.75 / 2)}px ${clickPosition.y - (window.innerHeight/2) + (window.innerHeight * 0.75 / 2)}px`
                            // သတိပြုရန် - အပေါ်က math က ရှုပ်ထွေးနိုင်တာမို့ ရိုးရိုးရှင်းရှင်း လိုချင်ရင် အောက်ကအတိုင်း သုံးနိုင်ပါတယ်:
                            // transformOrigin: "center center" // (ဒါဆိုရင်တော့ အလယ်ကနေ ကန်ထွက်လာပါမယ်)
                        }}
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 md:top-4 right-2 md:right-4 z-50 cursor-pointer hover:scale-110 active:scale-90 duration-300 bg-white/80 md:bg-white/50 rounded-full p-1 md:p-1 border border-brand"
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="size-5 md:size-6 text-black/70 md:text-black/50">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                                </svg>
                            </span>
                        </button>
                        <FeedBackpage/>
                    </div>
                </div>
            )}
        </>
    );
};

export default HistoryScreen;