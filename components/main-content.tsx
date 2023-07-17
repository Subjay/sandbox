import style from '../styles/main-mods/content.module.css'
import FrontModule from './front-module';
import BackProject from './project-module';
import { FrontModuleData, BackModuleData, ModulesLists } from '../lib/definitions';

export default function MainContent( props : { modsLists : ModulesLists } ){
  const { frontModules , backModules } = props.modsLists;

  if( frontModules.length === 0 && backModules.length === 0){
    return(
    <section className={ style.mainWrapper }>
      <p>No projects or modules found.</p>
    </section>);
  }

  return(
    <section className={ style.mainWrapper }>
      {/* <div className={ style.verticalSeparator }></div> */}
      <section className={ style.projectsContent}>
        <h3 className={ style.subTitle }>Front-end Modules</h3>
        {
          frontModules.map( ( mod : FrontModuleData ) => (
            <FrontModule
              key={ `fm_${mod.id}` }
              id={ mod.id }
              name={ mod.name }
              link={ mod.link }
              description={ mod.description }
              file_name={ mod.file_name } />)
            )
        }
        
        { backModules && (<h3 className={ style.subTitle }>Back-end Projects</h3>) }
        {
          backModules.map( (proj: BackModuleData ) => (
            <BackProject
              key={ `module-${proj.id}` }
              id={ proj.id }
              name={ proj.name }
              link= { proj.link }
              description= { proj.description }
              thumbnail={ proj.thumbnail } />)
          )
        }
      </section>
      {/* <div className={ style.verticalSeparator }></div> */}
    </section>);
}