import style from '../../styles/mods/animted-glow.module.css';

export const moduleName = "Animated Glow";

export default function Module(){
  return (
  <div className={ style.main }>

    <button type="button" className={ style.myButton }>
      &#128293; Click Me &#128293;
      <svg className={ style.glowContainer }>
        <rect className={ style.glowBlur }></rect>
        <rect className={ style.glowLine }></rect>
      </svg>
    </button>

  </div>);
}