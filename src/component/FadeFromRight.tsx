import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FaArrowRight } from "react-icons/fa";
import { LiaAngleDoubleDownSolid } from "react-icons/lia";

import { useRef, useEffect, ReactNode, StyleHTMLAttributes, CSSProperties } from "react";


gsap.registerPlugin(ScrollTrigger);




export default function FadeFromRight({ children, style, className } : { children : ReactNode, style : CSSProperties, className : string }) {
    const boxRef = useRef(null);
  
    useEffect(() => {
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top 80%", // 요소의 top이 뷰포트의 80%에 닿을 때 시작
            toggleActions: "play none none none",
          },
        }
      );
    }, []);
  
    return (
      <div ref={boxRef} style={style} className={className}>
        {children}
      </div>
  
    )
  }