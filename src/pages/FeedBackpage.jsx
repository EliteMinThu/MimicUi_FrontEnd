import React, { useEffect } from "react";
import background from "../assets/imgs/background.png";
import logoHead from "../assets/imgs/logo-head.png";
import RadarCard from "./components/RadarCard.jsx";
import "./FeedBackpage.css";
import { initFeedBackAnimations } from "./FeedBackpage.animations.js";


const FeedBackpage = () => {
  useEffect(() => {
    // Initialize animations when component mounts
    initFeedBackAnimations();
  }, []);

  return <>
              <div className={`flex-row justify-center items-center w-full h-full backdrop-blur-8xl px-4 md:px-0`}>
                  <div className={`h-12/12 pt-10 md:pt-25`}>
                    <div className={`flex justify-center items-center w-full`}>
                        <p className={`feedback-section-title border border-brand w-fit px-4 md:px-10 py-2 md:py-3 text-center font-bold text-brand bg-white/90 rounded-md tracking-widest text-base md:text-xl`}>
                            総合評価
                        </p>
                    </div>
                    <div className="flex justify-center items-center w-full mt-6 md:mt-10">
                        <div className={`feedback-grade-card relative card border border-gray-400 rounded-lg w-[140px] h-[186px] md:w-[190px] md:h-[254px]`}>
                            <div className="flex justify-center items-center bg-white/90 w-full h-full rounded-lg">
                                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4/6 feedback-grade-text text-6xl md:text-8xl leading-none text-center text-hu">A</p>
                                {/*<span className="text-4xl leading-none  text-hu">+</span>*/}
                            </div>
                        </div>
                    </div>
                </div>


                  <div className={`h-12/12 pt-8 md:pt-10`}>
                    <div className={`flex justify-center items-center w-full px-4 md:px-0`}>
                        <p className={`feedback-section-title border px-4 md:px-10 py-2 md:py-3 text-center font-bold text-brand bg-white/50 rounded-md text-sm md:text-base`}>
                            Mimic の フィードバック
                        </p>
                    </div>
                    <div className="relative mt-10 md:mt-20 flex w-full justify-center items-center px-4 md:px-0">
                        <div className="feedback-card-logo mb-4 md:mb-6 absolute -top-8 md:-top-10 z-10">
                            <img
                                src={logoHead}
                                alt="AI interview"
                                className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
                            />
                        </div>

                        {/* Main Card Container with overflow-hidden to clip the rotating gradient */}
                        <div className="feedback-card-container relative flex h-fit w-full max-w-[90vw] md:max-w-[600px] lg:w-[600px] flex-col items-center justify-center overflow-hidden rounded-[15px] md:rounded-[20px] bg-white/10 p-1 shadow-xl">

                            {/* 1. The Rotating Gradient (Animation) */}
                            {/* This simulates the ::before element in your CSS */}
                            <div className="absolute top-1/2 left-1/2 h-[500%] w-[120px] md:w-[150px] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-gradient-to-b from-[#00b7ff] to-[#ff30ff]" />

                            {/* 2. The Inner Mask (Background) */}
                            {/* This simulates the ::after element, creating the dark area inside the border */}
                            <div className="absolute inset-[3px] rounded-[12px] md:rounded-[15px] bg-white" />

                            {/* 3. The Content (Z-Index ensures it sits on top) */}
                            <div className="relative z-1 flex flex-col items-center pt-8 md:pt-12 pb-6 md:pb-8 text-black">

                                {/* Logo Section */}
                                {/* Note: Because of overflow-hidden, we moved the logo inside via padding instead of negative absolute positioning */}

                                {/* Text Content */}
                                <div className="px-4 md:px-10 text-center">
                                    <p className="feedback-card-text relative leading-relaxed md:leading-loose text-sm md:text-base text-black before:content-['『'] before:text-xl md:before:text-2xl before:text-hu after:content-['』'] after:text-xl md:after:text-2xl after:text-hu">
                                        今回の自己紹介は、内容が分かりやすく、全体の流れも自然でした。
                                        特に、自分の強みや興味を具体的に書いている点がとても良いと思います。
                                        一方で、少し情報が多いので、重要なポイントを絞るとさらに伝わりやすくなります。
                                        文末の表現を統一すると、より丁寧で読みやすい文章になります。
                                        また、最後に今後の目標や意気込みを一文加えると、印象がより良くなるでしょう。
                                        全体として、前向きで好印象な自己紹介になっています。
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                  <div className={`h-12/12 pt-8 md:pt-10 px-4 md:px-0`}>
                      <div className={`flex justify-center items-center w-full`}>
                          <p className={`feedback-section-title border border-brand px-4 md:px-10 py-2 md:py-3 text-center font-bold text-brand bg-white/90 rounded-md text-sm md:text-base`}>
                              レーダーチャット
                          </p>
                      </div>
                      <div className="feedback-radar-container w-full flex justify-center mt-4 md:mt-6">
                      <RadarCard/>
                      </div>
                  </div>

                  <div className={`h-12/12 pt-8 md:pt-10 px-4 md:px-0`}>
                      <div className={`flex justify-center items-center w-full`}>
                          <p className={`feedback-section-title border px-4 md:px-10 py-2 md:py-3 text-center font-bold text-brand bg-white/50 rounded-md text-sm md:text-base`}>
                              簡単な自己紹介をお願いします。
                          </p>
                      </div>
                      <div className="feedback-answer-container relative mt-8 md:mt-15 flex w-full justify-center items-center">
                          <div className="absolute top-2 md:top-3 left-4 md:left-25 z-10">
                            <span className={`text-xs md:text-sm text-black/50`}>あなたの答え。。。</span>
                          </div>
                          <div className="px-4 md:px-10 text-center bg-white rounded-md py-12 md:py-20 border border-brand rounded-lg w-full max-w-[95vw] md:w-10/12">
                              <p className="feedback-answer-text relative leading-relaxed md:leading-loose text-sm md:text-base text-black before:content-['『'] before:text-xl md:before:text-2xl before:text-hu after:content-['』'] after:text-xl md:after:text-2xl after:text-hu">
                                  今回の自己紹介は、内容が分かりやすく、全体の流れも自然でした。
                                  特に、自分の強みや興味を具体的に書いている点がとても良いと思います。
                                  一方で、少し情報が多いので、重要なポイントを絞るとさらに伝わりやすくなります。
                                  文末の表現を統一すると、より丁寧で読みやすい文章になります。
                                  また、最後に今後の目標や意気込みを一文加えると、印象がより良くなるでしょう。
                                  全体として、前向きで好印象な自己紹介になっています。
                              </p>
                          </div>

                          </div>
                      </div>
                  </div>

  </>;
};

export default FeedBackpage;
