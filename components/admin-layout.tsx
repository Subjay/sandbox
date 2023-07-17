import Head from "next/head";
import Link from "next/link";
import style from '../styles/layout/admin-layout.module.css';
import getURL from "../lib/utils";

export default function AdminLayout({ children , title , logged } : { children : React.ReactNode , title: string , logged?: boolean}){
  const handleLogout = async () => {
    await fetch( getURL('/api/logout') )
      .then( res=>{
        if(res.ok){
          window.location.href = '/';
        }
      }).catch( error => {
        alert(error);
      });
  }

  return(
  <>
    <Head>
      <title>{ `${title} | Illusion Studio` }</title>
      <meta name="author" content="Sébastien Gillig" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main className={ style.main }>
      <header className={ style.header }>
        <div className={ style.logo }>
          <Link href="/" className={ style.logoLink }>
            <span className={ style.capitals }>I</span>LLUSI<span className={ style.lettersHighlight }>O</span>N <span className={ style.capitals }>S</span>TUDI<span className={ style.lettersHighlight }>O</span>
          </Link>
        </div>
        <div className={ style.emptyCell }></div>
        <h1 className={ style.title }>
          <span>{ title }</span>
          {
            logged && <button type="button" onClick={ () => handleLogout() }>Log out</button>
          }
        </h1>
      </header>
        { children }
    </main>
  </>)
}
