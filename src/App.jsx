// 必要なコンポーネントやアセット、フックをインポートする
import AppContent from "./AppContent.jsx";
import background from "./assets/imgs/background.png";
import logo_text from "./assets/imgs/logo-text.png";
import Navbar from "./pages/components/Navbar.jsx";
import React from "react";
import { useAuth } from "./context/AuthContext.jsx";
import "./App.css";
import LoadingPage from "./pages/LoadingPage.jsx";

/**
 * アプリケーションのルート（最上位）コンポーネント
 * ユーザーの認証状態に応じて表示を切り替える役割を持つ
 */
const App = () => {
  // AuthContextからユーザー情報とローディング状態を取得
  const { user, isLoading } = useAuth();

  // 認証状態を確認中の場合、ローディング画面を表示
  if (isLoading) {
    return <LoadingPage />;
  }

  // --- レンダリング ---
  return (
    <>
      {/* ユーザーがログインしていない場合 */}
      {!user ? (
        // AppContentのみをレンダリング（主にログインページや登録ページが表示される）
        <AppContent user={user} />
      ) : (
        // ユーザーがログインしている場合
        <div
          className="w-full h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="w-screen h-full flex-col overflow-hidden">
            {/* ヘッダー部分：ロゴ画像 */}
            <div className={`h-1/12`}>
              <img
                src={logo_text}
                alt="logo-text"
                className="w-25 md:w-30 lg:w-40 ms-auto md:ms-10 me-3 pt-5 pb-3"
              />
            </div>
            {/* メインコンテンツ部分 */}
            <div className="md:h-10/12 h-full flex flex-col md:flex-row">
              {/* 左側：ナビゲーションバー */}
              <div className="w-full md:w-2/12 flex items-center justify-center">
                <Navbar />
              </div>
              {/* 右側：メインのページコンテンツ */}
              <div className="flex justify-center items-start md:items-center w-full h-full md:w-9/12 pt-20 md:pt-0">
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
