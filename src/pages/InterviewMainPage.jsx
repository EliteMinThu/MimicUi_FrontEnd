import React from "react";
import InterviewScreen from "./components/InterviewScreen.jsx";

/**
 * 面接練習ページのメインコンポーネント
 * 実際の表示内容はInterviewScreenコンポーネントに委譲している
 */
const InterviewMainPage = () => {
  return (
    <>
      {/* 面接練習のUIとロジックを持つInterviewScreenコンポーネントをレンダリング */}
      <InterviewScreen />
    </>
  );
};

export default InterviewMainPage;
