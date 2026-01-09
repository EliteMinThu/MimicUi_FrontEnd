import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import logo_head from "../assets/imgs/logo-head.png";

/**
 * プロフィールページのコンポーネント
 * ユーザー情報を表示・編集する
 */
const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Password change states
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // ユーザー情報を編集用stateにセット
  useEffect(() => {
    if (user) {
      setEditedUser({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  /**
   * パスワードを変更する関数
   */
  const handleChangePassword = async () => {
    // バリデーション
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError("すべてのフィールドを入力してください");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("新しいパスワードと確認パスワードが一致しません");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("パスワードは6文字以上である必要があります");
      return;
    }

    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(false);

    try {
      const response = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setPasswordSuccess(true);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordChange(false);
        setTimeout(() => {
          setPasswordSuccess(false);
        }, 3000);
      } else {
        const data = await response.json();
        setPasswordError(data.message || "パスワードの変更に失敗しました");
      }
    } catch (err) {
      setPasswordError("エラーが発生しました。後でもう一度お試しください。");
      console.error("Change password error:", err);
    } finally {
      setPasswordLoading(false);
    }
  };

  /**
   * プロフィール情報を更新する関数
   */
  const handleUpdateProfile = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:5000/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        setSuccess(true);
        setIsEditing(false);
        // ページをリロードして最新のユーザー情報を取得
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.message || "プロフィールの更新に失敗しました");
      }
    } catch (err) {
      setError("エラーが発生しました。後でもう一度お試しください。");
      console.error("Update profile error:", err);
    } finally {
      setLoading(false);
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
      <div className="relative bg-white/90 backdrop-blur-sm border border-gray-400 rounded-2xl md:rounded-3xl shadow-2xl shadow-gray-500/50 p-4 md:p-6 lg:p-8">
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
              className="px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              編集
            </button>
          )}
        </div>

        {/* 成功メッセージ */}
        {success && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm md:text-base">
            プロフィールが正常に更新されました
          </div>
        )}

        {/* エラーメッセージ */}
        {error && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm md:text-base">
            {error}
          </div>
        )}

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
                value={editedUser.username}
                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                className="w-full px-4 md:px-5 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                placeholder="ユーザー名を入力"
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
            {isEditing ? (
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                className="w-full px-4 md:px-5 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                placeholder="メールアドレスを入力"
              />
            ) : (
              <div className="px-4 md:px-5 py-2 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm md:text-base text-gray-800">
                {user.email || "未設定"}
              </div>
            )}
          </div>

          {/* アカウント状態 */}
          <div>
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

        {/* パスワード変更セクション */}
        <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                パスワード変更
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                アカウントのセキュリティのために定期的にパスワードを変更してください
              </p>
            </div>
            {!showPasswordChange && (
              <button
                onClick={() => setShowPasswordChange(true)}
                className="mt-3 md:mt-0 px-4 md:px-6 py-2 md:py-3 bg-gray-600 text-white rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-gray-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                パスワード変更
              </button>
            )}
          </div>

          {/* パスワード変更フォーム */}
          {showPasswordChange && (
            <div className="space-y-4 md:space-y-6">
              {/* 成功メッセージ */}
              {passwordSuccess && (
                <div className="p-3 md:p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm md:text-base">
                  パスワードが正常に変更されました
                </div>
              )}

              {/* エラーメッセージ */}
              {passwordError && (
                <div className="p-3 md:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm md:text-base">
                  {passwordError}
                </div>
              )}

              {/* 現在のパスワード */}
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                  現在のパスワード
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    className="w-full px-4 md:px-5 py-2 md:py-3 pr-10 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                    placeholder="現在のパスワードを入力"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({ ...showPasswords, current: !showPasswords.current })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.current ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* 新しいパスワード */}
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                  新しいパスワード
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className="w-full px-4 md:px-5 py-2 md:py-3 pr-10 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                    placeholder="新しいパスワードを入力（6文字以上）"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({ ...showPasswords, new: !showPasswords.new })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.new ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* 確認用パスワード */}
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                  新しいパスワード（確認）
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    className="w-full px-4 md:px-5 py-2 md:py-3 pr-10 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                    placeholder="新しいパスワードを再度入力"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.confirm ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* パスワード変更ボタン */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-600 text-white rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-gray-700 transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {passwordLoading ? "変更中..." : "パスワード変更"}
                </button>
                <button
                  onClick={() => {
                    setShowPasswordChange(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setPasswordError(null);
                    setPasswordSuccess(false);
                  }}
                  disabled={passwordLoading}
                  className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-200 text-gray-700 rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  キャンセル
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 編集時のボタン */}
        {isEditing && (
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "更新中..." : "保存"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedUser({
                  username: user.username || "",
                  email: user.email || "",
                });
                setError(null);
              }}
              disabled={loading}
              className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-200 text-gray-700 rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
