import SearchBar from "./search-bar";
import Link from "next/link";
import style from '../styles/main-mods/header.module.css';

export default function Header(){
  return(
    <section className={ style.header }>
      <div className={ style.logo }>
        <a href="https://www.sgillig.com" className={ style.logoLink }>
          <span className={ style.capitals }>I</span>LLUSI<span className={ style.lettersHighlight }>O</span>N <span className={ style.capitals }>S</span>TUDI<span className={ style.lettersHighlight }>O</span>
        </a>
      </div>
      <SearchBar
        id="mainSearchBar"
        placeholder="Looking for a particular skill or tech example ?" />
      
        <h1 className={ style.sandboxTitle }>
          <Link href="/admin" className={ style.loginLink }>Projects Sandbox</Link>
        </h1>
      
    </section>
  );
}