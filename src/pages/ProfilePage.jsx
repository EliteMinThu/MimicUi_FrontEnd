import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import logo_head from "../assets/imgs/logo-head.png";
import {useNoti} from "../context/NotiContext.jsx";

/**
 * プロフィールページのコンポーネント
 * ユーザー情報を表示・編集する
 */
const ProfilePage = () => {
  const { user, setIsLoading, setUser } = useAuth();
  const { pushMessage } = useNoti();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");

  // ユーザー情報を編集用stateにセット
  useEffect(() => {
    if (user) {
      setEditedUsername(user.username);
    }
  }, [user]);

  /**
   * プロフィール情報を更新する関数
   */
  const handleUpdateProfile = async () => {
      setIsLoading(true);
      pushMessage(null);

    try {
      const response = await fetch("http://localhost:5000/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({editedUsername}),
      });

      if (response.ok) {
        setIsEditing(false);
        const data = await response.json();
        const updatedUser = {
            ...user,
            "username": data.username,
        }
        setUser(updatedUser);
      } else {
        const data = await response.json();
          pushMessage(data.message || "プロフィールの更新に失敗しました");
      }
    } catch (err) {
        pushMessage("エラーが発生しました。後でもう一度お試しください。");
      console.error("Update profile error:", err);
    } finally {
        setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-600">ユーザー情報を読み込んでいます...</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-10/12 px-2 md:px-0">
      <div className="relative bg-white/10 border border-gray-400 rounded-2xl md:rounded-3xl shadow-2xl shadow-gray-500/50 p-4 md:p-6 lg:p-8">
        {/* ヘッダー部分 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
          <div className="flex items-center space-x-4 md:space-x-6 mb-4 md:mb-0">
            {/* プロフィール画像 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-brand/20 rounded-full blur-xl"></div>
              <img
                src={logo_head}
                alt="Profile"
                className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-1">
                {user.username || "ユーザー"}
              </h1>
              <p className="text-sm md:text-base text-gray-600">プロフィール</p>
            </div>
          </div>

          {/* 編集ボタン */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 md:px-6 py-2 md:py-3 bg-brand/30 text-primary rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-brand/30 transition-colors duration-300 shadow-md hover:shadow-lg border border-white/50 cursor-pointer"
            >
              編集
            </button>
          )}
        </div>


        {/* プロフィール情報 */}
        <div className="space-y-4 md:space-y-6">
          {/* ユーザー名 */}
          <div>
            <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
              ユーザー名
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedUsername.username}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="w-full px-4 md:px-5 py-2 md:py-3 bg-gray-50 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base "
                placeholder={user.username}
              />
            ) : (
              <div className="px-4 md:px-5 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm md:text-base text-gray-800">
                {user.username || "未設定"}
              </div>
            )}
          </div>

          {/* メールアドレス */}
          <div>
            <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
              メールアドレス
            </label>
              <div className="px-4 md:px-5 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm md:text-base text-gray-800">
                  {user.email || "未設定"}
              </div>
          </div>

          {/* アカウント状態 */}
          <div className={`mb-5`}>
            <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
              アカウント状態
            </label>
            <div className="px-4 md:px-5 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl">
              <span
                className={`inline-flex items-center px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold ${
                  user.is_verified
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                }`}
              >
                {user.is_verified ? "✓ 認証済み" : "⚠ 未認証"}
              </span>
            </div>
          </div>
        </div>

        {/* 編集時のボタン */}
        {isEditing && (
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              onClick={handleUpdateProfile}
              className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-brand/10 border border-white/50 text-primary cursor-pointer rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-brand/30 transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
            保存
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedUsername(user.username);
              }}
              className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-200 text-gray-700 rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              キャンセル
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
