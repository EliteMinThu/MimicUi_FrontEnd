// 必要なReactのフックをインポートする
import { useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingPage from "./LoadingPage.jsx";

/**
 * ログアウト処理を実行するためのコンポーネント
 * このページにアクセスすると、自動的にログアウト処理が行われ、ログインページにリダイレクトされる
 */
const LogoutPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const doLogout = async () => {
            await logout();          // ← 完了を待つ
            navigate('/login', { replace: true });
        };

        doLogout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 空の依存配列で、コンポーネントマウント時に一度だけ実行

    return <LoadingPage />;
};

export default LogoutPage;
