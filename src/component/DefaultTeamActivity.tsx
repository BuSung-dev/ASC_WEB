"use client";

import ui_styles from "@/styles/ui.module.css";
import { useEffect, useRef, useState } from "react";

export default function DefaultTeamActivity({ name, description, defaultOpen = false }: { name: string, description: string, defaultOpen?: boolean }) {

  const answerRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(defaultOpen)
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!answerRef.current) return;
    setContentHeight(answerRef.current.scrollHeight);
  }, [description, isActive]);

  useEffect(() => {
    const handleResize = () => {
      if (!answerRef.current) return;
      setContentHeight(answerRef.current.scrollHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={ui_styles.team_activity} onClick={() => { setIsActive(!isActive) }} style={{ border : isActive ? "2px solid var(--main-color)" : ""}}>

      <div className={ui_styles.team_activity_header}>
        <span className={ui_styles.text_description_2} style={{ color: "white", width : "100%" }}>{name}</span>
      </div>

      <div
        className={`${ui_styles.team_activity_answer} ${isActive ? ui_styles.team_activity_answer_open : ui_styles.team_activity_answer_closed}`}
        style={{ maxHeight: isActive ? `${contentHeight}px` : "0px" }}
      >
        <div ref={answerRef} className={ui_styles.team_activity_answer_inner}>
          <span className={ui_styles.text_description_2} style={{ color: "rgba(255,255,255,0.6)", width : "100%", whiteSpace : "pre-wrap" }}>{description}</span>
        </div>
      </div>

    </div>
  )
}
