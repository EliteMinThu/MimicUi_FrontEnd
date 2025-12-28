// 必要なReactのフックをインポートする
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingPage from "./LoadingPage.jsx";

/**
 * ログアウト処理を実行するためのコンポーネント
 * このページにアクセスすると、自動的にログアウト処理が行われ、ログインページにリダイレクトされる
 */
const LogoutPage = () => {
    const { logout, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const doLogout = async () => {
            await logout();          // ← 完了を待つ
            navigate('/login', { replace: true });
        };

        doLogout();
    }, [logout, navigate]);

    return <LoadingPage />;
};

export default LogoutPage;
