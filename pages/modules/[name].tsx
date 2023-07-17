import { useRouter } from 'next/router'
import { useState } from 'react';
import BaseLayout from '../../components/layout';
 
export default function Page() {
  const router = useRouter();
  const [ modImport , setModImport] = useState<any>( null );

  const importModule = async ( filename : string | string[] | undefined) => {
    if( filename ){
      const t = await import(`../../components/front-modules/${filename}`);/* webpackChunkName: "[request]" */ 
      setModImport( t );
    }
  }
  
  importModule( router.query.name );

  return (
    <BaseLayout
      title={ modImport ? modImport.moduleName : "" }
      description={ modImport ? `${modImport.moduleName} created by Sébastien Gillig` : "" }>
      { modImport ? modImport.default() : "" }
    </BaseLayout>
  );
}