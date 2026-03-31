"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "@/styles/page.module.css";
import ui_styles from "@/styles/ui.module.css";

import FadeFromLeft from "@/component/FadeFromLeft";
import { withBasePath } from "@/lib/base-path";

interface HallOfFameLink {
  url: string;
  label: string;
}

interface HallOfFameMember {
  handle: string;
  name: string;
  summary: string;
  description: string;
  website: string;
  siteLabel: string;
  links?: HallOfFameLink[];
  image: string;
}

interface HallOfFameData {
  members: HallOfFameMember[];
}

export default function HallOfFamePage() {
  const [hallOfFameData, setHallOfFameData] = useState<HallOfFameData>({ members: [] });

  useEffect(() => {
    fetch(withBasePath("/data/hall-of-fame.json")).then(async (result) => {
      setHallOfFameData(await result.json());
    });
  }, []);

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
              <p className={ui_styles.text_description_2}>ASC를 거쳐 각 분야에서 활동 중인 명예 멤버 기록입니다.</p>

              <hr style={{ marginTop: "30px", border: "none", borderTop: "2px solid var(--headline-color)" }}></hr>

              <div className={ui_styles.hof_layout}>
                <section className={ui_styles.hof_section}>
                  <div className={ui_styles.hof_section_head}>
                    <p className={ui_styles.hof_section_title}>명예 멤버</p>
                  </div>
                  {hallOfFameData.members.length > 0 ? (
                    <div className={ui_styles.hof_grid}>
                      {hallOfFameData.members.map((member) => (
                        <article
                          key={member.handle}
                          className={ui_styles.hof_item}
                        >
                          <div className={ui_styles.hof_profile_media}>
                            <Image
                              src={withBasePath(member.image)}
                              alt={`${member.name} 프로필 이미지`}
                              fill
                              sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 25vw"
                              className={ui_styles.hof_profile_image}
                            />
                          </div>

                          <div className={ui_styles.hof_profile_body}>
                            <p className={ui_styles.hof_item_kicker}>{member.handle}</p>
                            <p className={ui_styles.hof_item_title}>{member.name}</p>
                            <p className={ui_styles.hof_item_meta}>{member.summary}</p>

                            <div className={ui_styles.hof_profile_links}>
                              {member.links ? (
                                member.links.map((link) => (
                                  <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={ui_styles.hof_profile_link}
                                  >
                                    {link.label}
                                  </a>
                                ))
                              ) : (
                                <a
                                  href={member.website}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={ui_styles.hof_profile_link}
                                >
                                  {member.siteLabel}
                                </a>
                              )}
                            </div>
                          </div>

                          <div className={ui_styles.hof_expanded_panel}>
                            <div
                              className={ui_styles.hof_expanded_description}
                              dangerouslySetInnerHTML={{ __html: member.description }}
                            />
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <p className={ui_styles.project_timeline_empty}>등록된 명예 멤버가 없습니다.</p>
                  )}
                </section>
              </div>
            </div>
          </FadeFromLeft>
        </div>
      </main>
    </div>
  );
}
