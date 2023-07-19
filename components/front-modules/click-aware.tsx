import style from '../../styles/mods/click-aware.module.css';

export default function Button(){
  return(
    <section className={ style.mainSection }>

      <button type='button' className={ style.myButton }>
          &#9889; Click Me &#9889;
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <button type='button' className={ `${style.myButton} ${style.myButton2}` }>
          &#9889; Click Me &#9889;
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      
    </section>
  );
}