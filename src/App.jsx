// 必要なコンポーネントやアセット、フックをインポートする
import AppContent from "./AppContent.jsx";
import background from "./assets/imgs/background.png";
import logo_text from "./assets/imgs/logo-text.png";
import Navbar from "./pages/components/Navbar.jsx";
import React from "react";
import { useAuth } from "./context/AuthContext.jsx";
import { useLocation } from "react-router-dom";
import "./App.css";
import LoadingPage from "./pages/LoadingPage.jsx";

/**
 * アプリケーションのルート（最上位）コンポーネント
 * ユーザーの認証状態に応じて表示を切り替える役割を持つ
 */
const App = () => {
  // AuthContextからユーザー情報とローディング状態を取得
  const { user, isVerified, isLoading } = useAuth();
  // 現在のURLパスを取得
  const location = useLocation();

  // 認証状態を確認中の場合、ローディング画面を表示
  if (isLoading) {
    return <LoadingPage />;
  }

  // ページ選択ページではナビゲーションバーを表示しない
  const showNavbar = location.pathname !== "/select";


  // --- レンダリング ---
  return (
    <>
      {/* ユーザーがログインしていない場合 */}
      {!user ? (
        // AppContentのみをレンダリング（主にログインページや登録ページが表示される）
          <AppContent user={user} isVerified={isVerified}/>
      ) : (
          <div
              className="w-full h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${background})` }}
          >
              <div className="w-screen h-full flex-col overflow-x-hidden ">
                  {/* ヘッダー部分：ロゴ画像（ページ選択ページでは非表示） */}
                  {showNavbar && (
                      <div className={`h-1/12 hidden md:block`}>
                          <img
                              src={logo_text}
                              alt="logo-text"
                              className="w-25 md:w-30 lg:w-40 ms-auto md:ms-10 me-3 pt-5 pb-3"
                          />
                      </div>
                  )}
                  {/*// メインコンテンツ部分*/}
                  <div className={`${showNavbar ? 'md:h-10/12 h-full flex flex-col md:flex-row' : 'h-full flex justify-center items-center'}`}>
                      {/* 左側：ナビゲーションバー（ページ選択ページでは非表示） */}
                      {showNavbar && (
                          <div className="w-full mt-5 md:w-2/12 flex items-center justify-center">
                              <Navbar />
                          </div>
                      )}
                      {/*右側：メインのページコンテンツ */}
                      <div className={`flex justify-center items-start md:items-center ${showNavbar ? 'w-full h-full md:w-9/12 pt-20 md:pt-0' : 'w-full h-full'}`}>
                          <AppContent user={user} />
                      </div>
                  </div>
              </div>
          </div>
      )}
    </>
  );
};

export default App;
