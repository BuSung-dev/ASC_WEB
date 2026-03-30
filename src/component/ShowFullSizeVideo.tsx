import ui_styles from "@/styles/ui.module.css";
import { withBasePath } from "@/lib/base-path";

export default function ShowFullSizeVideo({ videoSrc } : { videoSrc : string }) {
    return (
    <div className={ui_styles.video_wrap}>
        <video src={withBasePath(videoSrc)} autoPlay={true} loop={true} playsInline={true} muted={true}></video>
    </div>
    )
}
