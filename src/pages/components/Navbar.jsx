// ナビゲーションアイコンとして使用する画像をインポートする
import logo_head from "../../assets/imgs/logo-head.png";
import home from "../../assets/imgs/home.png";
import cv from "../../assets/imgs/cvform.png";
import history from "../../assets/imgs/history.png";
import profile from "../../assets/imgs/profile.png";
import logout from "../../assets/imgs/logout.png";
// React Router と React のフックをインポートする
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

/**
 * サイドナビゲーションバーを表示するコンポーネント
 */
const Navbar = () => {
  // --- State管理 ---
  // 画面がモバイルサイズかどうかを管理するState
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // --- Hooks ---
  // 現在のURLパス情報を取得
  const location = useLocation();
  // ページ遷移を管理するuseNavigateフック
  const navigate = useNavigate();

  // --- Effect ---
  // 画面のリサイズを検知して、isMobileの状態を更新する
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // リサイズイベントリスナーを追加
    window.addEventListener("resize", handleResize);
    // コンポーネントがアンマウントされるときにイベントリスナーを削除
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 空の依存配列で、初回レンダリング時のみ実行

  // ナビゲーション項目のリスト
  const navList = [
    { icon: logo_head, label: "Mimic", path: "/" },
    { icon: home, label: "ホームページ", path: "/interview" },
    { icon: cv, label: "履歴書", path: "/cvform" },
    { icon: history, label: "歴史", path: "/history" },
    { icon: profile, label: "プロフィール", path: "/profile" },
    { icon: logout, label: "ログアウト", path: "/logout" },
  ];

  // 現在アクティブなナビゲーション項目のインデックスを検索
  const activeIndex = navList.findIndex(
    (item) => item.path === location.pathname
  );

  // --- アクティブインジケーターの位置計算 ---
  // モバイル表示時のアクティブインジケーターの左位置を計算
  const mobileLeft =
    activeIndex === 1 ? activeIndex * 64 + 20 :
    activeIndex === 2 ? activeIndex * 64 + 7.5 :
    activeIndex === 3 ? activeIndex * 62 + 3 :
    activeIndex === 4 ? activeIndex * 60 :
    activeIndex === 5 ? activeIndex * 56 + 10.5 : 0;

  // デスクトップ表示時のアクティブインジケーターの上位置を計算
  const desktopTop =
    activeIndex === 1 ? activeIndex * 64 + 16 :
    activeIndex === 2 ? activeIndex * 64 + 6 :
    activeIndex === 3 ? activeIndex * 63 + 1 :
    activeIndex === 4 ? activeIndex * 60 + 5.5 :
    activeIndex === 5 ? activeIndex * 60 + 2 : 0;

  // --- レンダリング ---
  return (
    <>
      <nav className="flex flex-row justify-center items-center w-full md:w-fit md:h-auto">
        <ul className="relative flex flex-row md:flex-col h-16 md:h-auto w-85 md:w-fit space-x-5 md:space-x-0 md:space-y-6 md:pt-1 md:pb-5 border border-gray-400 rounded-full shadow-lg shadow-gray-500/50 justify-center items-center">
          {/* アクティブな項目を示すインジケーター */}
          <div
            className="absolute w-11 h-11 bg-white border border-gray-400 rounded-full transition-all duration-500 shadow-lg"
            style={{
              top: isMobile ? "50%" : `${desktopTop}px`,
              left: isMobile ? `${mobileLeft}px` : "50%",
              transform: isMobile ? "translateY(-50%)" : "translateX(-50%)",
            }}
          ></div>
          {/* ナビゲーション項目をループで表示 */}
          {navList.map((item, index) => (
            <li
              className="relative group cursor-pointer h-full flex flex-col justify-start items-center md:flex-row md:justify-center"
              key={index}
              onClick={() => navigate(item.path)}
            >
              <img
                className={`md:mx-auto my-auto hover:scale-110 active:scale-95 rounded-full transition duration-1000 ease-in-out ${item.icon === logo_head ? "w-15" : "w-8"}`}
                src={item.icon}
                alt={item.label}
              />
              {/* ホバー時に表示されるツールチップ */}
              <span
                className="absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-white/50 text-black text-xs px-3 py-1 rounded-md whitespace-nowrap transition duration-200"
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
