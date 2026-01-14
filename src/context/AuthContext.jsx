// 必要なReactのフックをインポートする
import { createContext, useContext, useEffect, useState } from "react";
import {useNoti} from "./NotiContext.jsx";

// 認証情報を保持するためのContextを作成
const AuthContext = createContext(null);

/**
 * AuthContextを簡単に利用するためのカスタムフック
 * @returns {object} AuthContextの値 (user, isLoading, login, logout, registerなど)
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * 認証状態をグローバルに提供するプロバイダーコンポーネント
 * @param {object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - このプロバイダーでラップされる子コンポーネント
 */
export const AuthProvider = ({ children }) => {
  // --- State管理 ---
  // ログインしているユーザー情報を保持するState
  const [user, setUser] = useState(null);

  // verified user
  const [isVerified, setIsVerified] = useState(null);

  // 認証状態の確認中かどうかを示すローディングState
  const [isLoading, setIsLoading] = useState(true);


  // バックエンドAPIのベースURL
  const API_URL = "http://localhost:5000/api/auth";

  // コンポーネントがマウントされた時に一度だけ実行される
  useEffect(() => {
    // ユーザーが既にログインしているか確認する
    checkUserLoggedIn();
  }, []);

  /**
   * アプリケーション起動時に、クッキーを利用してユーザーのログイン状態を確認する非同期関数
   */
  const checkUserLoggedIn = async () => {
    try {
      const response = await fetch(`${API_URL}/check-auth`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include", // クッキーをリクエストに含める
      });

      if (response.ok) {
        // ログイン状態が有効な場合、ユーザー情報をセットする
        const data = await response.json();
        setUser(data.user);// 修正: data.user をセットする
        setIsVerified(data.user.is_verified)
      } else {
        // ログイン状態が無効な場合、ユーザー情報をnullにする
        setUser(null);
      }
    } catch (e) {
      console.log("Auth Check Error", e);
      setUser(null);
    } finally {
      // 確認処理が完了したら、ローディング状態を解除する
      setIsLoading(false);
    }
  };

  /**
   * 新規ユーザー登録を行う非同期関数
   * @param {string} username - ユーザー名
   * @param {string} email - メールアドレス
   * @param {string} password - パスワード
   * @returns {Promise<object>} 登録の成功/失敗とエラーメッセージを含むオブジェクト
   */
  const register = async (username, email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });
      
      const data = await response.json(); // レスポンスをJSONとしてパース

      if (response.ok) {
        // 登録成功後、返されたユーザー情報でStateを更新
        setIsVerified(data.is_verified); // 修正: data.user をセットする
        return { success: true };
      } else {
        // 失敗した場合、バックエンドからのエラーメッセージを返す
        return { success: false, errorMessage: data.RegisterError || "新規登録はしっぱいしました!!!" };
      }
    } catch (error) {
      return { success: false, error: error };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ログイン処理を行う非同期関数
   * @param {string} email - メールアドレス
   * @param {string} password - パスワード
   * @returns {Promise<object>} ログインの成功/失敗とエラーメッセージを含むオブジェクト
   */
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json(); // レスポンスをJSONとしてパース

      if (response.ok) {


        if(data.is_verified && data.user) {
            // ログイン成功後、返されたユーザー情報でStateを更新
            setUser(data.user);
            console.log(data.user)
        }else if (data.is_verified === false) {
            // ログイン成功後、返されたユーザー情報にis_verifiedがfalse の場合 isVerified Stateを更新
            setIsVerified(data);
            console.log(data)
        }

        return { success: true, is_verified: data.is_verified };
      } else {
        // 失敗した場合、バックエンドからのエラーメッセージを返す

          // console.log(data.is_verified)
        const errorMessage =  Object.values(data);

        return { success: false, errorMessage};
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ログアウト処理を行う非同期関数
   */
  const logout = async () => {
    try {
      // サーバーにログアウトリクエストを送信し、クッキーを無効化する
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.log("logout error", e);
    } finally {
      // フロントエンドのユーザー状態をnullにリセットする
      setUser(null);
      setIsVerified(null);
    }
  };

  // Context.Providerを介して、認証に関する値や関数を子コンポーネントに提供する
  return (
    <AuthContext.Provider value={{ user, isVerified, isLoading, setIsLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
