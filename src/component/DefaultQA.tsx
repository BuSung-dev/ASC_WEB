"use client";

import ui_styles from "@/styles/ui.module.css";
import { ReactNode, useRef, useState } from "react";

export default function DefaultQA({ question, answer }: { question: string, answer: string }) {

  const answerRef = useRef(null);
  const [isActive, setIsActive] = useState(false)

  return (
    <div className={ui_styles.qna} onClick={() => { setIsActive(!isActive) }} style={{ backgroundColor : isActive ? "var(--team-activity-bg)" : "", border : isActive ? "2px solid var(--main-color)" : "2px solid var(--qna-border)"}}>

      <div style={{ gap: "15px", display: "flex" }}>
        <span className={ui_styles.text_description} style={{ fontWeight: 500, color: isActive ? "var(--contest-name-color)" : "var(--contest-people-date-color)" }}>Q</span>
        <span className={ui_styles.text_description_2} style={{ color: isActive ? "var(--contest-name-color)" : "var(--contest-people-date-color)" }}>{question}</span>
      </div>

      <div className={ui_styles.qna_a} style={{ display: "block", height : isActive ? "100%" : "0px" }}>
        <hr style={{
          opacity : isActive ? "1" : "0",
          marginTop: isActive ? "25px" : "0",
          marginBottom: "25px",
          border: "none",
          backgroundColor: "var(--award-border)",
          height: "1px"
        }}></hr>
        <div style={{ gap: "15px", display: "flex", opacity : isActive ? "1" : "0" }}>
          <span className={ui_styles.text_description} style={{ fontWeight: 500,  }}>A</span>
          <span className={ui_styles.text_description_2} style={{  }}>{answer}</span>
        </div>

      </div>

    </div>
  )
}