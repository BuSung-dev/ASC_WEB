"use client";

import styles from "@/styles/page.module.css";
import ui_styles from "@/styles/ui.module.css";
import FadeFromLeft from "@/component/FadeFromLeft";
import DefaultBtn from "@/component/DefaultBtn";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();

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
          <FadeFromLeft className={""} style={{}}>
            <div className={`${styles.content_default}`} style={{ textAlign: "left", width: "100%", maxWidth: "1320px", marginTop: "50px" }}>
              <p className={ui_styles.text_title} style={{ fontWeight: 600 }}>지원하기</p>
              <p className={ui_styles.text_description_2}>ASC 지원은 아래 버튼을 통해 진행할 수 있습니다.</p>

              <hr style={{ marginTop: "30px", border: "none", borderTop: "2px solid var(--headline-color)" }}></hr>

              <div
                className={`${styles.wrap}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "50px",
                  minHeight: "70vh",
                }}
              >
                <DefaultBtn onClick={() => { router.push("/apply"); }} style={{ padding: "13px 24px" }}>
                  지원 페이지로 이동 <FaArrowRight />
                </DefaultBtn>
              </div>
            </div>
          </FadeFromLeft>
        </div>
      </main>
    </div>
  );
}
