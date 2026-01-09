// 必要なReactのフックと画像をインポートする
import React, { useState } from 'react';
import download_icon from '../../assets/imgs/cvImages/downloadIcon.png';
import gaijin1 from '../../assets/imgs/cvImages/gaijin1.png';
import gaijin2 from '../../assets/imgs/cvImages/gaijin2.png';

/**
 * 履歴書（CV）のテンプレートを表示・ダウンロードするためのコンポーネント
 */
const CvScreen = () => {
    // --- State管理 ---
    // 表示する履歴書の対象者（日本人 or 外国人）を管理するState
    const [checkPerson, setCheckPerson] = useState("japanese");

    // --- レンダリング ---
    return (
        <>
            <div className="flex justify-center items-center w-full h-fit md:h-135 2xl:h-170 px-2 md:px-0">
                <div className="relative flex-col justify-center items-center w-full md:w-10/12 h-full rounded-xl md:rounded-2xl border border-gray-400 shadow-2xl shadow-gray-500/50 pt-12 md:pt-0">
                    {/* 対象者切り替えボタン */}
                    <div className="absolute flex space-x-2 md:space-x-3 -top-8 md:-top-11 left-3 md:left-6">
                        {/* 日本人向けボタン */}
                        <div className={`border border-gray-500 px-2 md:px-3 py-1 rounded-full shadow-lg shadow-gray-500/50 ${checkPerson === "japanese" ? "bg-danger/50" : "bg-white/30"} transition duration-500 ease-in-out hover:scale-103 active:scale-98`}>
                            <button className="cursor-pointer text-xs md:text-sm" onClick={() => setCheckPerson("japanese")}>日本人</button>
                        </div>
                        {/* 外国人向けボタン */}
                        <div className={`border border-gray-500 px-2 md:px-3 py-1 rounded-full shadow-lg shadow-gray-500/50 ${checkPerson === "foreigner" ? "bg-danger/50" : "bg-white/30"} transition duration-500 ease-in-out hover:scale-103 active:scale-98`}>
                            <button className="cursor-pointer text-xs md:text-sm" onClick={() => setCheckPerson("foreigner")}>外国人</button>
                        </div>
                    </div>

                    {/* ダウンロードボタン */}
                    <div>
                        <a
                            // Stateに応じてダウンロードするファイルのURLを動的に変更
                            href={`${checkPerson === "japanese" ? "https://docs.google.com/document/d/18cPX4qdHuSHURhjsJ4Aio3KvNg_GBEML/edit?usp=sharing&ouid=112817375951158609824&rtpof=true&sd=true" : "https://docs.google.com/document/d/1SkqPditnzDJluiqe5DG1t1Y76p1QZMQg/view"}`}
                            target="_blank" // 新しいタブで開く
                            rel="noopener noreferrer" // セキュリティ対策
                            className={`absolute -top-8 md:-top-11 right-3 md:right-6 border border-gray-500 rounded-full p-1.5 md:p-2 shadow-lg shadow-gray-500/50 cursor-pointer hover:scale-103 active:scale-98`}
                        >
                            <img className="size-4 md:size-5" src={download_icon} alt="downloadIcon" />
                        </a>
                    </div>

                    {/* 日本人向けコンテンツ（現在はテキストのみ） */}
                    <div className={`${checkPerson === "japanese" ? "block" : "hidden"} p-4 md:p-6`}>
                        {/* ここに日本人向けの履歴書テンプレートのプレビューなどを表示 */}
                        <p className="text-sm md:text-base text-center text-gray-700">日本人向け履歴書テンプレート</p>
                    </div>

                    {/* 外国人向けコンテンツ（画像表示） */}
                    <div className={`${checkPerson === "foreigner" ? "block" : "hidden"} flex flex-col md:relative h-full w-full`}>
                        {/* Mobile: Stack vertically, Desktop: Side by side with absolute positioning */}
                        <div className={`w-full md:w-6/12 md:absolute md:top-0 md:left-0`}>
                            <img className={`w-full h-auto md:h-135 2xl:h-170 p-1 md:pe-0 `} src={gaijin1} alt="外国人向け履歴書サンプル1" />
                        </div>
                        <div className={`w-full md:w-6/12 md:absolute md:top-0 md:right-0`}>
                            <img className="w-full h-auto md:h-135 2xl:h-170 p-1 md:ps-0 " src={gaijin2} alt="外国人向け履歴書サンプル2" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CvScreen;
