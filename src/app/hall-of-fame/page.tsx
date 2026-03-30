"use client";

import styles from "@/styles/page.module.css";
import ui_styles from "@/styles/ui.module.css";

import FadeFromLeft from "@/component/FadeFromLeft";

export default function HallOfFamePage() {
  const memberMock = [
    { year: "HOF", title: "Best Rookie", summary: "신입 최고 성과자", tags: ["2025", "Offensive"] },
    { year: "HOF", title: "Top Contributor", summary: "오픈소스/세미나 기여", tags: ["2024", "Community"] },
    { year: "HOF", title: "CTF MVP", summary: "대회 누적 포인트 1위", tags: ["2023", "CTF"] },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          className={styles.wrap}
          style={{
            display: "block",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <FadeFromLeft className={""} style={{ width: "100%" }}>
            <div className={styles.content_default} style={{ textAlign: "left", width: "100%", maxWidth: "1320px", marginTop: "50px", marginLeft: "auto", marginRight: "auto" }}>
              <p className={ui_styles.text_title} style={{ fontWeight: 500 }}>Hall Of Fame</p>
              <p className={ui_styles.text_description_2}>ASC 명예 멤버 기록입니다.</p>

              <hr style={{ marginTop: "30px", border: "none", borderTop: "2px solid var(--headline-color)" }}></hr>

              <div className={ui_styles.hof_layout}>
                <section className={ui_styles.hof_section}>
                  <div className={ui_styles.hof_section_head}>
                    <p className={ui_styles.hof_section_title}>명예 멤버</p>
                    <p className={ui_styles.hof_section_desc}>연도별 대표 기여 기록</p>
                  </div>
                  <div className={ui_styles.hof_grid}>
                    {memberMock.map((item, i) => (
                      <article key={`member-${i}`} className={ui_styles.hof_item}>
                        <p className={ui_styles.hof_item_kicker}>{item.year}</p>
                        <p className={ui_styles.hof_item_title}>{item.title}</p>
                        <p className={ui_styles.hof_item_meta}>{item.summary}</p>
                        <div className={ui_styles.hof_badge_row}>
                          {item.tags.map((tag, idx) => (
                            <span key={`member-tag-${i}-${idx}`} className={ui_styles.hof_badge}>{tag}</span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </FadeFromLeft>
        </div>
      </main>
    </div>
  );
}
