"use client";

import ui_styles from "@/styles/ui.module.css";
import { useState } from "react";
import Image from "next/image";

export default function DefaultAward(
    { contestName, awardName, winnerName, date, image }:
        { contestName: string, awardName: string, winnerName: string, date: string, image?: string }
) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={ui_styles.award}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image container - visible on hover */}
            <div className={ui_styles.image_container} style={{ opacity: isHovered ? 1 : 0 }}>
                <Image 
                    src={ image ?? "/defaultAward.jpg" } 
                    alt="award image" 
                    layout="fill" 
                    objectFit="cover"
                    className={ui_styles.award_image}
                />
            </div>

            {/* Initial text info - visible when not hovered */}
            <div className={ui_styles.contest_info} style={{ opacity: isHovered ? 0 : 1 }}>
                <div className={ui_styles.contest_name}>
                    {contestName}
                    <div className={ui_styles.contest_bottom}>
                        <div className={ui_styles.contest_people}>{winnerName}</div>
                        <div className={ui_styles.contest_date}>{date}</div>
                    </div>
                </div>
                <div className={ui_styles.contest_award}>{awardName}</div>
            </div>

            {/* Overlay text info - visible on hover */}
            <div className={ui_styles.contest_info_overlay} style={{ opacity: isHovered ? 1 : 0 }}>
                <div className={ui_styles.contest_award_overlay}>{awardName}</div>
                <div className={ui_styles.contest_name_overlay}>{contestName}</div>
                <div className={ui_styles.contest_people_overlay}>{winnerName}</div>
            </div>
        </div>
    )
}