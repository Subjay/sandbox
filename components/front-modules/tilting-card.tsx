import style from "../../styles/mods/tilting-card.module.css";
import { useRef, useEffect } from "react";

export default function TiltCard(): JSX.Element{
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateCard = ( event: MouseEvent, elem: HTMLDivElement | null ) => {
    //get mouse position
    const x = event.clientX;
    const y = event.clientY;

    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;

    // get offset to the middle
    const offsetX = ( (x - middleX) / middleX ) * 30;
    const offsetY = ( (y - middleY) / middleY ) * 45;

    elem?.style.setProperty('--x-rotation',`${offsetY * -1 }deg`);
    elem?.style.setProperty('--y-rotation',`${offsetX}deg`);
  };

  useEffect( () => {
    document.addEventListener( 'mousemove', (e) => rotateCard( e, containerRef.current ) );
  },[]);

  return(
    <section className={ style.mainContent }>
      <div className={ style.container } ref={ containerRef }>
        <div className={ style.gradient }>
        </div>
        <div className={ style.tiltCard } ref={ cardRef }>
          &#10024; Here goes the content &#10024;
        </div>
      </div>
    </section>
  );
}