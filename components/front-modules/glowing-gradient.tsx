import style from '../../styles/mods/glowing-gradient.module.css';
import { useState, useEffect, useRef } from 'react';

export default function GlowGrad(){
  const [ bigSliders , setBigSliders ] = useState<boolean>(false);
  const [ width , setWidth ] = useState<number>(200);
  const [ height, setHeight ] = useState<number>(300);
  const [ borderWidth, setBorderWidth ] = useState<number>(2);
  const [ radius, setRadius ] = useState<number>(10);
  const [ offset, setOffset ] = useState<number>(250);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect( () => {
    mainRef.current?.style.setProperty('--card-width',`${width}px`);
  },[width]);

  useEffect( () => {
    mainRef.current?.style.setProperty('--card-height',`${height}px`);
  },[height]);

  useEffect( () => {
    mainRef.current?.style.setProperty('--border-width',`${borderWidth}px`);
  },[borderWidth]);

  useEffect( () => {
    mainRef.current?.style.setProperty('--border-radius',`${radius}px`);
  },[radius]);

  useEffect( () => {
    mainRef.current?.style.setProperty('--gradient-offset',`${offset}px`);
  }, [offset]);

  return(
    <div className={ style.mainSection } ref={ mainRef }>

      <section className={ style.leftSection }>
        <section className={ style.settingsPanel }>
          <p className={ style.panelTitle }>Card customization</p>
          <label>Height : ({ height }px)</label>
          <input
            type='range'
            min='100'
            max={ bigSliders ? '800' : '500'}
            value={ height }
            onChange={ (e) => { setHeight( parseInt(e.target.value) ) } }
            className={ style.sliderWidth } />
          <label>Width : ({ width }px)</label>
          <input
            type='range'
            min='100'
            max={ bigSliders ? '1200' : '550'}
            value={ width }
            onChange={ (e) => { setWidth( parseInt( e.target.value ) ) }}
            className={ style.sliderHeight } />
            <label>Border radius : ({ radius }px)</label>
            <input
              type='range'
              min='0'
              max={ bigSliders ? '400' : '100'}
              value={ radius }
              onChange={ (e) => { setRadius( parseInt(e.target.value ) ) }}
              className={ style.sliderRadius } />
          <label>Border width : ({ borderWidth }px)</label>
          <input
            type='range'
            min='2'
            max={ bigSliders ? '30' : '20'}
            value={ borderWidth }
            onChange={ (e) => { setBorderWidth( parseInt( e.target.value ) ) }}
            className={ style.sliderBorder } />
          <label>Toggle bigger size</label>
          <input
            type='checkbox'
            checked={ bigSliders }
            onChange={ (e) => { setBigSliders( e.target.checked ) } } />
          {/* <label>Gradient offset : ({ offset }px)</label>
          <input
            type='range'
            min='0'
            max='600'
            value={ offset }
            onChange={ (e) => { setOffset( parseInt( e.target.value ) ) }}
            className={ style.sliderOffset } /> */}
        </section>
      </section>

      <section className={ style.rightSection }>

        <div className={ style.moduleContainer }>
          <div className={ style.cardContent }>Special container</div>

          <div className={ style.blurGradientContainer }>
            <div className={ style.blurGradient }></div>
          </div>

          <div className={ style.normalGradientContainer }>
            <div className={ style.normalGradient }></div>
          </div>
        </div>
        
      </section>

    </div>
  );
}