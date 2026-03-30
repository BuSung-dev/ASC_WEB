"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import { FaInstagram, FaQuestionCircle } from "react-icons/fa";

export default function Footer() {
  const [year] = useState(new Date().getFullYear());

  return (
    <footer
      style={{
        minHeight: "200px",
        backgroundColor: "#151515",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: "40px",
          maxWidth: "1300px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            opacity: "0.6",
          }}
        >
          <Image src={"/ASC.png"} width={100} height={100} alt="logo" style={{ height: "45px", width: "auto" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <span style={{ fontSize: "24px" }}>ASC</span>
            <span style={{ fontSize: "13px", fontWeight: "300" }}>Academic Security Club</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "13px",
            flexWrap: "wrap",
            textAlign: "left",
            opacity: "0.6",
            alignItems: "center",
          }}
        >
          <Link href="https://www.instagram.com/ssu_asc?igsh=MWNscm95MXgxbW05" style={{ color: "#ccc", textDecoration: "none", fontSize: "28px" }}>
            <FaInstagram />
          </Link>
          <Link href="/qna" style={{ color: "#ccc", textDecoration: "none", fontSize: "26px" }}>
            <FaQuestionCircle />
          </Link>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #444",
          paddingTop: "20px",
          textAlign: "center",
          color: "#888",
          width: "100%",
        }}
      >
        &copy; {year} ASC. All rights reserved.
      </div>
    </footer>
  );
}
