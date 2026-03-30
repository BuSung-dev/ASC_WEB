"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/page.module.css";
import ui_styles from "@/styles/ui.module.css";

import FadeFromLeft from "@/component/FadeFromLeft";

import { FaArrowRight } from "react-icons/fa";

import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const [applyInfo, setApplyInfo] = useState<{
    isOpen: boolean;
    startTime: string;
    endTime: string;
    applyLink: string;
    ctfLink: string;
    resultLink: string;
  } | null>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [status, setStatus] = useState<"loading" | "before" | "during" | "after">("loading");

  const [applyLink, setApplyLink] = useState("");
  const [ctfLink, setCtfLink] = useState("");
  const [resultLink, setResultLink] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetch("/data/apply.json").then(async (res) => {
      const data = await res.json();
      setApplyInfo(data);
    });
  }, []);

  useEffect(() => {
    if (!applyInfo) return;

    setApplyLink(applyInfo.applyLink);
    setCtfLink(applyInfo.ctfLink);
    setResultLink(applyInfo.resultLink);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(applyInfo.startTime).getTime();
      const end = new Date(applyInfo.endTime).getTime();

      if (now < start) {
        setStatus("before");
        updateCountdown(start - now);
      } else if (now >= start && now <= end && applyInfo.isOpen) {
        setStatus("during");
        updateCountdown(end - now);
      } else {
        setStatus("after");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [applyInfo]);

  const updateCountdown = (diff: number) => {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    setTimeLeft({ days, hours, minutes, seconds });
  };

  const renderCountdownLabel = () => {
    if (status === "before") return <span>다음 지원 시작까지</span>;
    if (status === "during") return <span>지원 마감까지</span>;
    if (status === "after") return <span>지원이 마감되었습니다.</span>;
    return "";
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.content_default} style={{ minHeight: "100vh", display: "flex", justifyContent: "center", marginTop: "00px", alignItems: "center" }}>
          {status !== "loading" && applyInfo && (
            <FadeFromLeft className={styles.apply_background} style={{
              width: "100%", maxWidth: "1320px", display: "flex", flexDirection: "column", alignItems: "center",
            }}>
              <div className={styles.clock_wrap}>
                <p className={ui_styles.text_description_2} style={{ marginTop: "0px", fontWeight: 500 }}>
                  {renderCountdownLabel()}
                </p>
                <div className={styles.clock}>
                  {["days", "hours", "minutes", "seconds"].map((unit) => (
                    <div key={unit} className={styles.unit}>
                      <div className={styles.number}>
                        {(timeLeft as any)[unit].toString().padStart(2, "0")}
                      </div>
                      <div className={styles.label}>{unit.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className={ui_styles.headline} style={{ width: "95%", maxWidth: "250px", marginTop: "30px" }}></hr>

              {status === "during" && (
                <div className={styles.apply_wrap}>
                  {applyLink && (
                    <button className={styles.apply_btn} onClick={() => { router.push(applyLink); }}>
                      지원서 작성하기 <FaArrowRight />
                    </button>
                  )}

                  {ctfLink && (
                    <button className={styles.apply_btn} onClick={() => { router.push(ctfLink); }}>
                      리크루팅 CTF <FaArrowRight />
                    </button>
                  )}
                </div>
              )}

              {(status === "before" || status === "after") && resultLink && (
                <div className={styles.apply_wrap}>
                  <button className={styles.apply_btn} onClick={() => { router.push(resultLink); }}>
                    {status === "before" ? "이전 ASC 선발결과" : "ASC 선발결과 보기"} <FaArrowRight />
                  </button>
                </div>
              )}
            </FadeFromLeft>
          )}
        </div>
      </main>
    </div>
  );
}
