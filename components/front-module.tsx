import style from '../styles/main-mods/project-module.module.css';
import Link from 'next/link';
import { useEffect, useRef, useContext, useState } from 'react';
import { UpdateModContext } from '../pages';

type FrontModuleProps = {
  id: number,
  name: string,
  link: string,
  description: string,
  file_name: string,
  skills?: JSON,
}

export default function FrontModule( infos : FrontModuleProps ){
  const { id, name , link , description , file_name } = infos;
  const UpdateModSelected = useContext( UpdateModContext );
  const modRef = useRef<HTMLDivElement>(null);
  const [ modImport , setModImport] = useState<any>( null );

  const importModule = async () => {
    const t = await import(`./front-modules/${file_name}`);/* webpackChunkName: "[request]" */ 
    setModImport( t );
  }
  
  useEffect(() => {
    importModule();
    
    const moduleObserver = new IntersectionObserver( (entries : IntersectionObserverEntry[] ) => {
      if( entries[0].isIntersecting ){
        UpdateModSelected( id, "front" );
      }
    }, {
      threshold: 0.5,
      rootMargin: "-30px 0px"
    });

    if( modRef.current ){
      moduleObserver.observe( modRef.current );
    }
  },[]);

  return(
    <article className={ style.wrapper } id={ `article_fm_${id}` }>
      <section className={ style.name } ref={modRef}>{ name }</section>
      <section className={ style.frame }>{ (modImport ? modImport.default() : "") }</section>
      <Link
        href={ link }
        className={ style.fullscreenLink }
        target='_blank'>
        <span className={ style.linkSpan }>Open in a new tab</span>
      </Link>
      <section className={ style.descriptionSection }>
        <p className={ style.descriptionTitle }>Description :</p>
        <p className={ style.description }>
          { description }
        </p>
      </section>
    </article>
  );
}