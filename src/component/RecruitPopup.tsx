"use client";

import styles from "@/styles/RecruitPopup.module.css";
import { FaArrowRight } from "react-icons/fa";
import DefaultBtn from "./DefaultBtn";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { TbInfoHexagonFilled } from "react-icons/tb";

interface RecruitPopupProps {
  visible: boolean;
  onClose: () => void;
  applyData: any;
}

export default function RecruitPopup({ visible, onClose, applyData }: RecruitPopupProps) {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.popup_backdrop} onClick={onClose}>
      <div className={styles.popup_window} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.popup_close_btn}>
          <IoClose />
        </button>
        <div className={styles.popup_content}>
          <p className={styles.popup_title}>
            <TbInfoHexagonFilled /> ASC 리크루팅 안내
          </p>
          <p className={styles.popup_description}>
            {currentYear}년도 숭실대학교 ASC 소모임에서 새로운 지원자를 모집하고 있습니다.
          </p>

          <DefaultBtn onClick={() => { router.push("/apply"); }} style={{ marginTop: "30px", width: "100%" }}>
            지원 페이지로 이동 <FaArrowRight />
          </DefaultBtn>
        </div>
      </div>
    </div>
  );
}
