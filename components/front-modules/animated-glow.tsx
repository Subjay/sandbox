import style from '../../styles/mods/animated-glow.module.css';

export const moduleName = "Animated Glow";

export default function Module(){
  return (
    <div className={ style.main }>
      <div className={ style.innerDiv }>
        
        <button type="button" className={ `${style.myButton} ${style.glowEffect}` }>
          &#128293; Hover Me &#128293;
          <svg className={ style.glowContainer }>
            <rect rx='22.5px' pathLength="100" strokeLinecap='round' className={ style.glowBlur }></rect>
            <rect rx='22.5px' pathLength="100" strokeLinecap='round' className={ style.glowLine }></rect>
          </svg>
        </button>
  
        <button
          type="button"
          className={ `${style.myButton} ${style.glowEffect} ${style.green}` }>
          &#128293; Hover Me &#128293;
          <svg className={ style.glowContainer }>
            <rect rx='22.5px' pathLength="100" strokeLinecap='round' className={ style.glowBlur }></rect>
            <rect rx='22.5px' pathLength="100" strokeLinecap='round' className={ style.glowLine }></rect>
          </svg>
        </button>
  
        <button type="button" className={ `${style.myButton} ${style.glowEffect} ${style.violet}` }>
          &#128293; Hover Me &#128293;
          <svg className={ style.glowContainer }>
            <rect rx='22.5px' pathLength="100" strokeLinecap='round' className={ style.glowBlur }></rect>
            <rect rx='22.5px' pathLength="100" strokeLinecap='round' className={ style.glowLine }></rect>
          </svg>
        </button>
        
      </div>
    </div>);
}