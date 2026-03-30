"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "@/styles/page.module.css";
import ui_styles from "@/styles/ui.module.css";

import FadeFromLeft from "@/component/FadeFromLeft";
import { withBasePath } from "@/lib/base-path";

interface HallOfFameMember {
  handle: string;
  name: string;
  summary: string;
  description: string;
  website: string;
  siteLabel: string;
  image: string;
}

interface HallOfFameData {
  members: HallOfFameMember[];
}

export default function HallOfFamePage() {
  const [hallOfFameData, setHallOfFameData] = useState<HallOfFameData>({ members: [] });
  const [activeMemberHandle, setActiveMemberHandle] = useState<string | null>(null);
  const [transitioningMemberHandle, setTransitioningMemberHandle] = useState<string | null>(null);
  const [activeMemberOffsetLeft, setActiveMemberOffsetLeft] = useState(0);
  const [activeMemberExpandedWidth, setActiveMemberExpandedWidth] = useState(0);
  const [memberPreviewWidths, setMemberPreviewWidths] = useState<Record<string, number>>({});
  const collapseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    fetch(withBasePath("/data/hall-of-fame.json")).then(async (result) => {
      setHallOfFameData(await result.json());
    });
  }, []);

  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) {
        window.clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (
      typeof window === "undefined" ||
      hallOfFameData.members.length === 0 ||
      activeMemberHandle ||
      transitioningMemberHandle
    ) {
      return;
    }

    const measurePreviewWidths = () => {
      const items = document.querySelectorAll<HTMLElement>("[data-hof-handle]");
      const nextWidths: Record<string, number> = {};

      items.forEach((item) => {
        const handle = item.dataset.hofHandle;
        if (!handle) {
          return;
        }

        nextWidths[handle] = item.clientWidth;
      });

      setMemberPreviewWidths(nextWidths);
    };

    measurePreviewWidths();
    window.addEventListener("resize", measurePreviewWidths);

    return () => window.removeEventListener("resize", measurePreviewWidths);
  }, [hallOfFameData.members, activeMemberHandle, transitioningMemberHandle]);

  useEffect(() => {
    if (!activeMemberHandle || typeof window === "undefined") {
      return;
    }

    const updateExpandedMetrics = () => {
      const grid = document.getElementById("hall-of-fame-grid");
      const item = document.querySelector<HTMLElement>(`[data-hof-handle="${activeMemberHandle}"]`);

      if (!grid || !item) {
        return;
      }

      if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 721px)").matches) {
        setActiveMemberHandle(null);
        return;
      }

      setActiveMemberOffsetLeft(item.offsetLeft);
      setActiveMemberExpandedWidth(grid.clientWidth);
    };

    updateExpandedMetrics();
    window.addEventListener("resize", updateExpandedMetrics);

    return () => window.removeEventListener("resize", updateExpandedMetrics);
  }, [activeMemberHandle, hallOfFameData]);

  const handleMemberHover = (handle: string, element: HTMLElement) => {
    if (typeof window === "undefined") {
      return;
    }

    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 721px)").matches) {
      return;
    }

    const grid = document.getElementById("hall-of-fame-grid");
    if (!grid) {
      return;
    }

    if (collapseTimeoutRef.current) {
      window.clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }

    setActiveMemberOffsetLeft(element.offsetLeft);
    setActiveMemberExpandedWidth(grid.clientWidth);
    setMemberPreviewWidths((current) => ({
      ...current,
      ...(current[handle] ? {} : { [handle]: element.clientWidth }),
    }));
    setTransitioningMemberHandle(handle);
    setActiveMemberHandle(handle);
  };

  const handleMemberLeave = (handle: string) => {
    setActiveMemberHandle((current) => (current === handle ? null : current));

    setTransitioningMemberHandle(handle);

    if (collapseTimeoutRef.current) {
      window.clearTimeout(collapseTimeoutRef.current);
    }

    collapseTimeoutRef.current = window.setTimeout(() => {
      setTransitioningMemberHandle((current) => (current === handle ? null : current));
      collapseTimeoutRef.current = null;
    }, 420);
  };

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
                    <div
                      id="hall-of-fame-grid"
                      className={ui_styles.hof_grid}
                    >
                      {hallOfFameData.members.map((member) => (
                        <article
                          key={member.handle}
                          className={`${ui_styles.hof_item} ${activeMemberHandle === member.handle ? ui_styles.hof_item_active : ""} ${transitioningMemberHandle === member.handle && activeMemberHandle !== member.handle ? ui_styles.hof_item_closing : ""}`}
                          data-hof-handle={member.handle}
                          onMouseEnter={(event) => handleMemberHover(member.handle, event.currentTarget)}
                          onMouseLeave={() => handleMemberLeave(member.handle)}
                          style={
                            memberPreviewWidths[member.handle]
                              ? {
                                  ["--hof-preview-width" as string]: `${memberPreviewWidths[member.handle]}px`,
                                  ...(transitioningMemberHandle === member.handle
                                    ? activeMemberHandle === member.handle
                                      ? {
                                          width: `${activeMemberExpandedWidth}px`,
                                          marginLeft: `-${activeMemberOffsetLeft}px`,
                                        }
                                      : {
                                          width: `${memberPreviewWidths[member.handle]}px`,
                                          marginLeft: "0px",
                                        }
                                    : {}),
                                }
                              : undefined
                          }
                        >
                          <div className={ui_styles.hof_preview_column}>
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

                              <a
                                href={member.website}
                                target="_blank"
                                rel="noreferrer"
                                className={ui_styles.hof_profile_link}
                              >
                                {member.siteLabel}
                              </a>
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
