"use client";

import ui_styles from "@/styles/ui.module.css";
import { ReactNode } from "react";

export default function DefaultBtn({ children, onClick, style }: { children : ReactNode,  onClick: any, style? : any }) {
    return (
        <button
            style={{ ...style }}
            className={ui_styles.default_btn}
            onClick={onClick}>
            {children}
        </button>
    )
}