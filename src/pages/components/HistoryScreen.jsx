import React from "react";

/**
 * 面接の履歴を表示するためのコンポーネント
 */
const HistoryScreen = () => {
  // サンプルデータ（将来的にはAPIから取得することを想定）
  const historyData = [
    { id: 1, question: "長所", date: "1月28日", file: "Detail", grade: "A" },
    { id: 2, question: "短所", date: "1月27日", file: "Detail", grade: "B" },
    { id: 3, question: "志望動機", date: "1月26日", file: "Detail", grade: "A" },
    { id: 4, question: "自己PR", date: "1月25日", file: "Detail", grade: "C" },
    { id: 5, question: "ガクチカ", date: "1月24日", file: "Detail", grade: "B" },
  ];

  // --- レンダリング ---
  return (
    <>
      <div className="flex justify-center items-center w-full h-[530px]">
        <div className="relative w-10/12 rounded-3xl border border-gray-400 shadow-2xl px-5 pb-1 pt-4 shadow-gray-500/50">
          {/* ページのタイトル部分 */}
          <div className="absolute -top-11 right-6">
            <div className="px-10 py-1 rounded-full bg-BGdanger shadow-md shadow-gray-500/50 border border-gray-400">
              <span className="text-xl text-black">履歴一覧</span>
            </div>
          </div>

          {/* テーブルヘッダー */}
          <div className="flex justify-center grid grid-cols-5 gap-2 bg-BGdanger shadow-md rounded-t border border-gray-800 px-4 py-2 mb-3">
            {["質問内容", "日時", "ファイル", "評価", "取り消し"].map((label, idx) => (
              <button
                key={label}
                className="flex items-center justify-center px-6 py-3 rounded-md text-black bg-white border border-gray-800"
              >
                <span>{label}</span>
                {/* ソート機能を示す矢印（現在はUIのみ） */}
                {idx === 0 && <span className="text-xs">▼</span>}
              </button>
            ))}
          </div>

          {/* 履歴データテーブルの本体 */}
          <div className="overflow-hidden">
            {historyData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 items-center px-8 py-4 text-gray-800 odd:bg-white even:bg-secondary mb-1.5 rounded text-md"
              >
                {/* 各列のデータ */}
                <div className="text-center">{item.question}</div>
                <div className="text-center">{item.date}</div>
                <div className="text-center text-blue-700 underline cursor-pointer">{item.file}</div>
                <div className="text-center font-semibold">{item.grade}</div>
                <div className="flex justify-center">
                  <button className="px-5 py-1 rounded-full bg-danger/50 border border-gray-500">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ページネーション（現在はUIのみ） */}
          <div className="my-3 flex justify-center gap-4">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-full border shadow-sm text-sm ${
                  page === 1 ? "bg-orange-200 border-orange-300" : "bg-white border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryScreen;
