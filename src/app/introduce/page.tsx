"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/page.module.css";
import ui_styles from "@/styles/ui.module.css";
import FadeFromLeft from "@/component/FadeFromLeft";
import DefaultQA from "@/component/DefaultQA";

export default function IntroducePage() {
  const [questionList, setQuestionList] = useState({} as any);

  useEffect(() => {
    fetch("/data/questions.json").then(async (result) => {
      setQuestionList(await result.json());
    });
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          className={`${styles.wrap}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          {questionList.questions ? (
            <FadeFromLeft className={""} style={{}}>
              <div className={`${styles.content_default}`} style={{ textAlign: "left", width: "100%", maxWidth: "1320px", marginTop: "50px" }}>
                <p className={ui_styles.text_title} style={{ fontWeight: 600 }}>ASC는 어떤 소모임인가요?</p>
                <p className={ui_styles.text_description_2}>활동 방식과 지원 관련 정보를 확인해보세요.</p>

                <hr style={{ marginTop: "30px", border: "none", borderTop: "2px solid var(--headline-color)" }}></hr>

                <div className={ui_styles.qna_wrap} style={{ marginTop: "40px" }}>
                  {questionList.questions.map((question: any, i: number) => (
                    <DefaultQA key={i} question={question.question} answer={question.answer}></DefaultQA>
                  ))}
                </div>
              </div>
            </FadeFromLeft>
          ) : (
            ""
          )}
        </div>
      </main>
    </div>
  );
}
