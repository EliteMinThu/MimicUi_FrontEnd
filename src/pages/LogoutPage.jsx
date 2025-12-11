// 必要なReactのフックをインポートする
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

/**
 * ログアウト処理を実行するためのコンポーネント
 * このページにアクセスすると、自動的にログアウト処理が行われ、ログインページにリダイレクトされる
 */
const LogoutPage = () => {
  // --- Hooks ---
  // AuthContextからlogout関数を取得
  const { logout } = useAuth();
  // ページ遷移を管理するuseNavigateフック
  const navigate = useNavigate();

  // コンポーネントがマウントされた時に一度だけ実行される
  useEffect(() => {
    // ログアウト処理を実行する
    logout();
    // ログインページにリダイレクトする
    // { replace: true } は、ブラウザの履歴にログアウトページを残さないようにするためのオプション
    navigate('/login', { replace: true });
  }, [logout, navigate]); // useEffectの依存配列にlogoutとnavigateを指定

  // このコンポーネントはUIを持たないため、nullを返す
  return null;
};

export default LogoutPage;
