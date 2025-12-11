import React from "react";
import CvScreen from "./components/CvScreen.jsx";

/**
 * 履歴書（CV）フォームページのメインコンポーネント
 * 実際の表示内容はCvScreenコンポーネントに委譲している
 */
const CvFormPage = () => {
  return (
    <>
      {/* 履歴書フォームのUIとロジックを持つCvScreenコンポーネントをレンダリング */}
      <CvScreen />
    </>
  );
};

export default CvFormPage;
