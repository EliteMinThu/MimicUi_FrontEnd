import React from "react";
import HistoryScreen from "./components/HistoryScreen.jsx";

/**
 * 面接履歴ページのメインコンポーネント
 * 実際の表示内容はHistoryScreenコンポーネントに委譲している
 */
const HistoryPage = () => {
  return (
    <>
      {/* 面接履歴のUIとロジックを持つHistoryScreenコンポーネントをレンダリング */}
      <HistoryScreen />
    </>
  );
};

export default HistoryPage;
