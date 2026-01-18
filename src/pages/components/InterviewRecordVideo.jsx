import React, { useRef, useState, useCallback, useEffect } from "react";
import RecordingTimer from "./RecordingTimer.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {renderToReadableStream} from "react-dom/server";
import {useNavigate} from "react-router-dom";
import FeedBackpage from "../FeedBackpage.jsx";

/**
 * ユーザーのビデオと音声を録画し、サーバーにアップロードするコンポーネント
 * @param {object} props - 親コンポーネントから渡されるプロパティ
 * @param {string} props.username - ユーザー名（ファイル名に使用）
 * @param {function} props.onStopInterview - 録画停止時に呼び出されるコールバック関数
 */
const InterviewRecordVideo = ({ onStopInterview, questionId, category, questionText }) => {
  // --- Ref管理 ---
  const streamRef = useRef(null); // カメラとマイクの生ストリーム
  const liveVideoRef = useRef(null); // プレビュー用の<video>要素
  const mediaRecorderRef = useRef(null); // MediaRecorderインスタンス
  const recordedChunksRef = useRef([]); // 録画されたビデオデータ（Blob）の断片
  const mimeTypeRef = useRef(""); // 録画に使用されたMIMEタイプ

  // --- State管理 ---
  const [isRecording, setIsRecording] = useState(false); // 録画中かどうかの状態
  const [error, setError] = useState(null); // エラーメッセージ
  const [elapsedTime, setElapsedTime] = useState(0); // 録画経過時間（秒）


    const { user, setIsLoading } = useAuth();
    const navigate = useNavigate();


  /**
   * 面接（録画）を開始する非同期関数
   */
  const startInterview = async () => {
    try {
      setError(null);
      recordedChunksRef.current = [];

      // 1. カメラとマイクへのアクセスを要求し、メディアストリームを取得
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // 2. 取得したストリームを<video>要素にセットしてプレビューを表示
      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = streamRef.current;
      }

      // 3. MediaRecorderインスタンスの準備
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === "inactive") {
        const mimeType = MediaRecorder.isTypeSupported("video/webm; codecs=vp9,opus")
          ? "video/webm; codecs=vp9,opus"
          : "video/webm";
        mimeTypeRef.current = mimeType;
        const options = { mimeType, videoBitsPerSecond: 250000 };
        mediaRecorderRef.current = new MediaRecorder(streamRef.current, options);
      }

      // 4. イベントハンドラの設定
      // データが利用可能になったとき（録画データが断片的に生成されたとき）
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      // 録画開始時
      mediaRecorderRef.current.onstart = () => {
        setIsRecording(true);
        setElapsedTime(0); // タイマーをリセット
      };

      // 録画停止時
      mediaRecorderRef.current.onstop = () => {
        setIsRecording(false);
        setElapsedTime(0); // タイマーをリセット
        // 録画データの断片を結合して単一のBlobオブジェクトを生成
        const videoBlob = new Blob(recordedChunksRef.current, { type: mimeTypeRef.current });
        const filename = `${user.username || "Guest"}_${Date.now()}.webm`;
        console.log("Generated Filename:", filename);
        // 生成したBlobをサーバーにアップロード
        uploadVideoForAI(videoBlob, filename);
        // ストリームを停止してリソースを解放
        if (liveVideoRef.current) liveVideoRef.current.srcObject = null;
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };

      // 5. 録画を開始 (1000msごとにondataavailableをトリガー)
      mediaRecorderRef.current.start(1000);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setError("カメラ/マイクへのアクセスに失敗しました。権限を確認してください。");
    }
  };

  /**
   * 面接（録画）を停止する関数
   */
  const stopInterview = () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop(); // onstopイベントがトリガーされる
      }
      // 親コンポーネントに録画停止を通知
      if (onStopInterview) {
        onStopInterview();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * 録画中にタイマーを更新するuseEffect
   */
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  /**
   * APIレスポンスをチェックするヘルパー関数
   * @param {Response} response - fetchのレスポンスオブジェクト
   */
  const checkResponse = (response) => {
    if (response.status === 401) throw new Error("認証に失敗しました。再度ログインしてください。");
    if (!response.ok) throw new Error(`サーバーエラー: ${response.statusText}`);
    return response;
  };

  /**
   * バックエンドに処理完了を通知する非同期関数
   * @param {string} url - 通知先のURL
   * @param {string} filename - 処理対象のファイル名
   */
  const notifyBackend = async (url, filename, question_id, ) => {
      setIsLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, question_id }),
      credentials: "include",
    });
    checkResponse(response);
    const data = await response.json();
    const video_id = data.video_id;
      console.log(video_id)
    console.log("✅ Notify Backend Successful");
    const analysis = async (video_id) => {
        const response = await fetch("http://localhost:5000/api/facial/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ video_id }),
            credentials: "include",
        })
        checkResponse(response);
        const data = await response.json();
        console.log(data);
        return data;
    }
      const facialResult = await analysis(video_id);
      const checkStatus = async (operationName, gaze_score, emotion_score, summary, video_id) => {
          const interval = setInterval(async () => {
              try {
                  const response = await fetch(
                      `http://localhost:5000/api/sttSpeed/transcribe/status/${operationName}`
                  );
                  if (!response.ok) {
                      console.error("Status fetch failed:", response.status);
                      clearInterval(interval);
                      return;
                  }
                  const data = await response.json();
                  console.log("Status:", data);

                  if (data.done) {
                      console.log("Transcript:", data.transcript);
                      console.log("Chars/sec:", data.chars_per_sec);
                      console.log("Speed score:", data.speed_score);
                      console.log("Volume score:", data.volume_score);
                      console.log(data)// 完了したら停止
                      //video obj
                      const duration_sec = data.duration_sec;
                      // const gaze_score = gaze_score;
                      // const emotion_score = emotion_score;
                      // const summary = summary;

                      //speech obj
                      const speed_score = data.speed_score;
                      const chars_per_sec = data.chars_per_sec;
                      const volume_score = data.volume_score;
                      //transcript
                      const transcript = data.transcript;

                      //Make raw_data
                      const raw_data = {
                          "video" : {
                              duration_sec: duration_sec,
                              gaze_score: gaze_score,
                              emotion_score: emotion_score,
                              summary: summary,
                          },
                          "speech" : {
                              chars_per_sec: chars_per_sec,
                              speed_score: speed_score,
                              volume_score: volume_score,
                          },
                          "question" : questionText,
                          "category" : category,
                          "transcript" : transcript,
                          "video_id" : video_id,
                      }
                      console.log(raw_data);
                      clearInterval(interval);
                      const gemini = async (raw_data) => {
                          try {
                              const response = await fetch("http://localhost:5000/api/analyze/feedback", {
                                  method: "POST",
                                  headers: {
                                      "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify(raw_data),
                                  credentials: "include",
                              });

                              if (!response.ok) {
                                  throw new Error("Failed to get feedback");
                              }

                              const data = await response.json();
                              console.log("gemini : ",data)
                              navigate('/feedback', { state: { allowed: true, result: data, } });
                              // return <FeedBackpage to="/feedback" state={ { allowed: true, result: data, } } />
                          } catch (error) {
                              console.error(error);
                              alert("Error: " + error.message);
                          } finally {
                              console.log("final")
                              setIsLoading(false);

                          }
                      };
                      gemini(raw_data);
                  } else {
                      console.log("Transcription still in progress...");
                  }

              } catch (error) {
                  console.error(error);
                  clearInterval(interval);
              }
          }, 3000);
      };
      const tran = async (filename, facialResult, video_id) => {
          const response = await fetch("http://localhost:5000/api/sttSpeed/transcribe", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  filename
              }),
              credentials: "include",
          });
          checkResponse(response);
          const data = await response.json();

          console.log(data);
          checkStatus(data.operation_name, facialResult.gaze_score, facialResult.emotion_score, facialResult.summary, video_id)




      }
      tran(filename, facialResult,video_id);


  };

  /**
   * 録画されたビデオをAI分析のためにアップロードする非同期関数
   * @param {Blob} videoBlob - 録画されたビデオのBlobデータ
   * @param {string} filename - アップロードするファイル名
   */
  const uploadVideoForAI = async (videoBlob, filename) => {
    try {
      // 1. バックエンドに署名付きURLを要求
      let response = await fetch("http://localhost:5000/api/video/ai-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, contentType: mimeTypeRef.current || "video/webm" }),
        credentials: "include",
      });
      response = checkResponse(response);
      const data = await response.json();
        if (!data || !data.signed_url) {
            throw new Error("signed_url is missing in server response");
        }
      const signedUrl = data.signed_url;

      // 2. 取得した署名付きURLを使用してGoogle Cloud Storageにビデオを直接アップロード
      const gcsResponse = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": mimeTypeRef.current || "video/webm" },
        body: videoBlob,
      });
      if (!gcsResponse.ok) throw new Error("GCSへのアップロードに失敗しました");

      // 3. アップロード完了をバックエンドに通知
      await notifyBackend("http://localhost:5000/api/video/video_save", filename, questionId);
    } catch (error) {
      console.error("Upload Error:", error);
      setError(error.message);
    }
  };

  // エラーが発生した場合の表示
  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>エラー: {error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 px-4 py-1 bg-gray-200 rounded">
          リロード
        </button>
      </div>
    );
  }

  // --- レンダリング ---
  return (
      <>
          <div className="flex flex-col justify-center items-center pb-3 md:pb-5">
              <div className="mt-3 mx-auto shawdow shadow-2xl backdrop-blur">
                  {/* ライブプレビュー用のvideo要素 */}
                  <video
                      ref={liveVideoRef}
                      className={`w-full max-w-[95vw] md:w-120 md:max-w-none md:h-70 border border-2 rounded-md object-cover p-2 md:p-3 shadow-sm backdrop-blur -scale-x-100 ${isRecording ? "border-emerald-200" : "border-white/50"}`}
                      autoPlay
                      playsInline
                      muted
                  />
              </div>
              {/* 録画タイマー表示 */}
              <RecordingTimer elapsedTime={elapsedTime} isRecording={isRecording}/>
              <div className="mt-3  mx-auto p-2">
                  {/* 録画状態に応じて「開始」または「終了」ボタンを表示 */}
                  {isRecording ? (
                      <button
                          onClick={stopInterview}
                          className=" px-5 md:px-6 py-2 bg-red-100 text-hu border border-2 border-white/50 rounded-full font-semibold text-sm md:text-base shadow-sm hover:scale-105 mx-3 md:mx-5 cursor-pointer"
                      >
                          終了
                      </button>
                  ) : (
                      <button
                          onClick={startInterview}
                          className="mt-3 md:mt-5 px-5 md:px-6 py-2 text-primary border border-2 border-white/50 rounded-full font-semibold text-sm md:text-base shadow-sm hover:scale-103 hover:shadow-2xl active:scale-98 mx-3 md:mx-5 transition duration-500 ease-in-out cursor-pointer"
                      >
                          開始
                      </button>
                  )}
              </div>
          </div>


      </>
  );
};

export default InterviewRecordVideo;
