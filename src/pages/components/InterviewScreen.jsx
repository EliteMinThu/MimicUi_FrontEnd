// 必要なReactのフックと子コンポーネントをインポートする
import React, { useState, useEffect, useCallback } from "react";
import Question from "./Question.jsx";
import InterviewRecordVideo from "./InterviewRecordVideo.jsx";

/**
 * 面接練習画面のメインコンポーネント
 * 質問の取得、表示、ビデオ録画のコンポーネントを管理する
 */
const InterviewScreen = () => {
  // --- State管理 ---
  const [questions, setQuestions] = useState([]); // APIから取得した質問のリスト
  const [currentIndex, setCurrentIndex] = useState(0); // 現在表示している質問のインデックス
  const [isLoading, setIsLoading] = useState(true); // 質問をロード中かどうかの状態
  const [error, setError] = useState(null); // エラーメッセージ

  /**
   * APIから面接の質問を取得し、Stateを更新する関数
   * useCallbackでメモ化し、不要な再生成を防ぐ
   */
  const fetchAndSetQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null); // エラーをリセット
    try {
      const response = await fetch("http://localhost:5000/api/interview/random-test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 認証クッキーをリクエストに含める
      });

      // 認証エラーの場合
      if (response.status === 401) {
        console.error("Authorization failed. Cookie might be missing or invalid.");
        setError("認証に失敗しました。再度ログインしてください。");
        return;
      }

      // その他のHTTPエラーの場合
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // 取得したデータが配列で、中身がある場合
      if (Array.isArray(data) && data.length > 0) {
        setQuestions(data);
        setCurrentIndex(0); // インデックスを最初に戻す
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("質問の読み込みに失敗しました。後でもう一度お試しください。");
    } finally {
      setIsLoading(false); // ローディング状態を解除
    }
  }, []); // 依存配列は空

  // コンポーネントがマウントされた時に質問を取得する
  useEffect(() => {
    fetchAndSetQuestions();
  }, [fetchAndSetQuestions]); // fetchAndSetQuestionsが変更された場合にも再実行

  /**
   * 「終了」ボタンが押されたときに呼び出される関数
   * 次の質問に進むか、質問が尽きたら新しいセットを取得する
   */
  const handleNextQuestion = () => {
    const nextIndex = currentIndex + 1;
    // 次の質問がある場合
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex); // インデックスを更新
    } else {
      // 質問が尽きた場合、新しい質問セットを再取得
      fetchAndSetQuestions();
    }
  };

  // 表示する現在の質問テキストを決定
  const currentQuestionText = isLoading
    ? "質問を読み込んでいます..." // ローディング中
    : error // エラーがある場合
    ? error // エラーメッセージを表示
    : questions.length > 0 // 質問がある場合
    ? questions[currentIndex]?.data // 現在の質問テキスト
    : "質問が見つかりませんでした。"; // 質問がない場合

  // --- レンダリング ---
  return (
    <>
      <div className="flex justify-center items-center w-full h-fit md:h-[530px] px-2 md:px-0">
        <div className="flex flex-col justify-start items-center w-full md:w-10/12 rounded-none md:rounded-2xl md:border md:border-gray-400 md:shadow-2xl md:shadow-gray-500/50 space-y-4 md:space-y-6 py-4 md:py-0">
          {/* エラーメッセージの表示エリア */}
          {error && !isLoading && (
            <div className="text-red-500 p-3 md:p-4 w-full px-4 md:px-6">
              <p className="text-sm md:text-base text-center">{currentQuestionText}</p>
            </div>
          )}
          {/* 質問表示コンポーネント */}
          <div className="flex justify-center w-full md:w-10/12 px-2 md:px-0">
            <Question questionText={currentQuestionText} />
          </div>
          {/* ビデオ録画コンポーネント */}
          <div className="flex justify-center w-full px-2 md:px-0">
            <InterviewRecordVideo onStopInterview={handleNextQuestion} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewScreen;
