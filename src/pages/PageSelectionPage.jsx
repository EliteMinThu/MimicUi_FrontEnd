import React from "react";
import { useNavigate } from "react-router-dom";
import logo_head from "../assets/imgs/logo-head.png";
import home from "../assets/imgs/home.png";
import cv from "../assets/imgs/cvform.png";
import history from "../assets/imgs/history.png";
import profile from "../assets/imgs/profile.png";

/**
 * ログイン後に表示されるページ選択画面
 * ユーザーがアクセスしたいページを選択できる
 */
const PageSelectionPage = () => {
  const navigate = useNavigate();

  // 選択可能なページのリスト
  const pageOptions = [
    {
      id: "interview",
      icon: home,
      title: "面接練習",
      description: "AI面接の練習を開始します",
      path: "/interview",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      lightGradient: "from-blue-100 to-cyan-100",
    },
    {
      id: "cvform",
      icon: cv,
      title: "履歴書",
      description: "履歴書テンプレートを表示・ダウンロード",
      path: "/cvform",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      lightGradient: "from-purple-100 to-pink-100",
    },
    {
      id: "history",
      icon: history,
      title: "履歴一覧",
      description: "過去の面接履歴を確認",
      path: "/history",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      lightGradient: "from-orange-100 to-amber-100",
    },
    {
      id: "profile",
      icon: profile,
      title: "プロフィール",
      description: "アカウント情報の確認・編集",
      path: "/profile",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      lightGradient: "from-green-100 to-emerald-100",
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 py-4 md:py-6 overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="mb-3 md:mb-4 text-center animate-fade-in flex-shrink-0">
        <div className="flex justify-center mb-2 md:mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-brand/20 rounded-full blur-xl"></div>
            <img
              src={logo_head}
              alt="Mimic Logo"
              className="relative w-14 h-14 md:w-18 md:h-18 rounded-full border-4 border-white/50 shadow-2xl"
            />
          </div>
        </div>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-1 md:mb-2 tracking-tight">
          ようこそ、Mimicへ
        </h1>
        <p className="text-xs md:text-sm text-gray-600 font-medium">
          アクセスしたいページを選択してください
        </p>
      </div>

      {/* ページ選択カードグリッド */}
      <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-3 md:mb-4 flex-1 self-center">
        {pageOptions.map((option, index) => (
          <div
            key={option.id}
            onClick={() => navigate(option.path)}
            className="group relative cursor-pointer h-full w-full"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Card Container */}
            <div className="relative h-full min-h-[180px] md:min-h-[200px] lg:min-h-[220px] rounded-2xl md:rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 active:scale-100">
              
              {/* Gradient Background Layer */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.lightGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Shimmer Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

              {/* Content */}
              <div className="relative h-full flex flex-col items-center md:items-center justify-center p-4 md:p-5 lg:p-6 text-center">
                {/* Icon Container with Gradient Border */}
                <div className="relative mb-3 md:mb-4 mx-auto flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} rounded-xl md:rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  <div className={`relative bg-gradient-to-br ${option.gradient} p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center`}>
                    <img
                      src={option.icon}
                      alt={option.title}
                      className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain filter brightness-0 invert"
                    />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300">
                  {option.title}
                </h2>

                {/* Description */}
                <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-5 leading-relaxed px-2">
                  {option.description}
                </p>

                {/* Action Button */}
                <div className="mt-auto w-full">
                  <div className={`inline-flex items-center justify-center px-4 md:px-6 py-2 bg-gradient-to-r ${option.gradient} text-white rounded-lg md:rounded-xl font-semibold text-xs md:text-sm shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100`}>
                    <span className="mr-1 md:mr-2">選択</span>
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}></div>
              <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${option.gradient} opacity-0 group-hover:opacity-10 rounded-tr-full transition-opacity duration-500`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Message */}
      <div className="text-center animate-fade-in flex-shrink-0">
        <p className="text-xs text-gray-500 italic">
          ナビゲーションバーからもアクセスできます
        </p>
      </div>

      {/* CSS for fade-in animation */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PageSelectionPage;
