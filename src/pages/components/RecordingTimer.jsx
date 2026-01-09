import React from "react";

/**
 * 録画中の経過時間を表示するタイマーコンポーネント
 * @param {object} props - 親コンポーネントから渡されるプロパティ
 * @param {number} props.elapsedTime - 経過時間（秒）
 * @param {boolean} props.isRecording - 録画中かどうかの状態
 */
const RecordingTimer = ({ elapsedTime, isRecording }) => {
  /**
   * 経過時間をMM:SS形式にフォーマットする関数
   * @param {number} seconds - 秒数
   * @returns {string} - MM:SS形式の文字列
   */
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // 録画中でない場合は何も表示しない
  if (!isRecording) {
    return null;
  }

  return (
    <div className="mt-2 flex items-center justify-center">
      <div className="bg-red-500/90 text-white px-4 py-2 rounded-full font-mono font-bold text-lg md:text-xl shadow-lg flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
};

export default RecordingTimer;

