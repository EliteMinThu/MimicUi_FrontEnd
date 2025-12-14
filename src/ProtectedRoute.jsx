// 必要なReactのフックとコンポーネントをインポートする
import { useAuth } from "./context/AuthContext.jsx";
import { Navigate, useLocation } from "react-router-dom";
import {useEffect} from "react";

/**
 * 認証が必要なルートへのアクセスを制御するコンポーネント
 * @param {object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - このコンポーネントでラップされる子コンポーネント（保護対象のページ）
 */
const ProtectedRoute = ({ children }) => {
    // AuthContextからユーザー情報とローディング状態を取得
    const { user,isVerified, isLoading } = useAuth();
    // 現在のURLパス情報を取得
    const location = useLocation();

    // 認証状態を確認中の場合、ローディングメッセージを表示
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // 1. ユーザーがログインしていない場合、ログインページへリダイレクト
    if (!user && !isVerified) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;