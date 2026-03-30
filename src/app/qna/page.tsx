"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/page.module.css";
import ui_styles from "@/styles/ui.module.css";
import FadeFromLeft from "@/component/FadeFromLeft";
import DefaultQA from "@/component/DefaultQA";
import { withBasePath } from "@/lib/base-path";

export default function QnaPage() {
  const [questionList, setQuestionList] = useState({} as any);

  useEffect(() => {
    fetch(withBasePath("/data/questions.json")).then(async (result) => {
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
                <p className={ui_styles.text_title} style={{ fontWeight: 600 }}>자주 묻는 질문</p>
                <p className={ui_styles.text_description_2}>혹시 궁금한 점이 있으신가요?</p>

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
