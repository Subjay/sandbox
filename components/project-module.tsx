import style from '../styles/main-mods/project-module.module.css'
import Link from 'next/link';
import { useEffect, useRef, useContext } from 'react';
import { UpdateModContext } from '../pages';

interface BackProjectProps{
  id: number,
  name: string,
  link: string,
  description: string,
  thumbnail?: Blob,
  skills?: JSON,
}

export default function BackProject( infos: BackProjectProps ){
  const { id, name , link , description } = infos;
  const UpdateModSelected = useContext( UpdateModContext );
  const modRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moduleObserver = new IntersectionObserver( (entries : IntersectionObserverEntry[] ) => {
      if( entries[0].isIntersecting ){
        UpdateModSelected( id, "back" );
      }
    }, {
      threshold: 0.5,
    });

    if( modRef.current ){
      moduleObserver.observe( modRef.current );
    }
  },[]);

  return(
    <article className={ style.wrapper } id={ `article_bm_${id}` }>
      <section className={ style.name } ref={ modRef }>{ name }</section>
      <iframe
        src={ link }
        className={ style.frame }
        draggable={ false } />
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
