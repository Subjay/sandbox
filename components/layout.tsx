import Head from "next/head";
import style from '../styles/layout/layout.module.css';

const title_default = "Illusion Studio";
const description_default = "Sébastien Gillig's projects and modules sandbox website";

export default function BaseLayout( { children, home , title, description } : { children : React.ReactNode , home?: boolean , title?: string, description?: string} ) {
  return (
  <>
    <Head>
      <title>{ title ? `${title} | ${title_default}` : title_default }</title>
      <meta name="author" content="Sébastien Gillig" />
      <meta name="description" content={ description ? `${description}` : description_default } />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    { home ? (
    <main className={ style.sandboxPage }>
        {children}
    </main>
    ) : (
    <main className={ style.module }>
      {children}
    </main>
    )}
  </>
  );
}