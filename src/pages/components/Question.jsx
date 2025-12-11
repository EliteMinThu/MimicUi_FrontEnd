// 必要なアセットとReactのフックをインポートする
import interview_man from "../../assets/imgs/questionImages/interviewman.png";
import speaker from "../../assets/imgs/questionImages/speaker.png";
import { useState } from "react";

/**
 * 音声読み上げ中のローディングアニメーションを表示するコンポーネント
 */
const LoadingSpinner = () => (
  <div className="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
);

/**
 * 面接の質問文を表示し、音声読み上げ機能を提供するコンポーネント
 * @param {object} props - 親コンポーネントから渡されるプロパティ
 * @param {string} props.questionText - 表示する質問のテキスト
 */
const Question = ({ questionText }) => {
  // --- State管理 ---
  // テキストを読み上げ中かどうかを管理するState
  const [isSpeaking, setIsSpeaking] = useState(false);

  /**
   * スピーカーアイコンがクリックされたときに実行される関数
   * Web Speech APIを使用して質問テキストを読み上げる
   */
  const handleTTS = () => {
    // すでに読み上げ中、またはテキストが空かローディング中の場合は何もしない
    if (isSpeaking || !questionText || questionText.includes("...")) {
      return;
    }

    try {
      // 読み上げ開始
      setIsSpeaking(true);

      // 既存の読み上げがあればキャンセルする
      window.speechSynthesis.cancel();

      // 新しい読み上げインスタンスを作成
      const utterance = new SpeechSynthesisUtterance(questionText);
      utterance.lang = 'ja-JP'; // 言語を日本語に設定
      utterance.rate = 0.9;     // 読み上げ速度を少し遅めに設定

      // 読み上げが終了したときのイベントハンドラ
      utterance.onend = () => {
        setIsSpeaking(false); // ローディング状態を解除
      };

      // 読み上げ中にエラーが発生したときのイベントハンドラ
      utterance.onerror = (event) => {
        console.error("SpeechSynthesis Error", event);
        setIsSpeaking(false); // ローディング状態を解除
      };

      // 読み上げを実行
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error initializing TTS:", error);
      setIsSpeaking(false); // エラーが発生した場合もローディング状態を解除
    }
  };

  // --- レンダリング ---
  return (
    <>
      <div className="border border-1 border-gray-200 bg-white/50 rounded-md shadow-lg shadow-gray-500/50 mt-8 py-2 min-w-9/12 h-fit">
        <div className="flex justify-between h-full items-center">
          {/* 左側の面接官アイコン (モバイルでは非表示) */}
          <div className="ms-10">
            <img
              className="w-12 h-15 hidden md:block"
              src={interview_man}
              alt="Interview-Man"
            />
          </div>
          {/* 中央の質問テキスト */}
          <div className="font-bold text-2xl text-primary text-center px-4">
            {questionText}
          </div>
          {/* 右側の音声読み上げアイコン/ローディングスピナー */}
          <div className="pe-5 md:pe-10 hover:scale-103 active:scale-98 cursor-pointer transition duration-500 ease-in-out" onClick={handleTTS}>
            {isSpeaking ? (
              <LoadingSpinner /> // 読み上げ中はスピナーを表示
            ) : (
              <img className="w-12 h-10" src={speaker} alt="speaker" /> // 通常はスピーカーアイコンを表示
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
