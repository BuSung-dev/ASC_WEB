"use client";

import { ReactNode, useEffect, useState } from "react";
import ui_styles from "@/styles/ui.module.css";
import { createPortal } from "react-dom";

export default function DefaultCurriculum({
    curriculumName,
    children,
    ShowCase,
    isActive,
    onClick,
}: {
    curriculumName: string;
    children: ReactNode;
    ShowCase: HTMLDivElement | null;
    isActive: boolean;
    onClick: () => void;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <div className={`${ui_styles.curriculum} ${ isActive ? ui_styles.active : "" }`} onClick={onClick}>
                {curriculumName}
            </div>

            {mounted && isActive && ShowCase &&
                createPortal(children, ShowCase)
            }
        </>
    );
}
