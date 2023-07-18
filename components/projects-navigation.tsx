import style from '../styles/main-mods/projects-navigation.module.css';
import { getSelectedModuleIndex } from '../lib/modules';
import { BackModuleData, FrontModuleData, ModulesLists } from '../lib/definitions';
import { UpdateModContext } from '../pages';
import { useContext } from 'react';

interface ProjectsNavProps{
  modsLists: ModulesLists,
  selectedModule: { id: number, type: "back" | "front" },
}

export default function ProjectsNavigation( props: ProjectsNavProps){
  const UpdateModSelected = useContext( UpdateModContext );
  const { selectedModule } = props;
  const { backModules = [], frontModules = []} = props.modsLists || { frontModules: [], backModules: [] } ;

  var indexSelected:number = -1;

  if( selectedModule.type === "front"){
    indexSelected = getSelectedModuleIndex( frontModules, selectedModule.id );
  }
  else{
    indexSelected = getSelectedModuleIndex( backModules, selectedModule.id );
  }

  const createFrontEndLinks = (selected:number) => {
    if( frontModules.length === 0){
      return ;
    }

    return(
      <li className={ style.projectTypes }>
        <h3 className={ style.spanTypes }>Front-end</h3>
        <ol className={ style.subList }>
          { frontModules.map( (module: FrontModuleData ) => (
            <li key={`front-li-${module.id}`} className={ style.projectNames }>
              <a href={`#article_fm_${module.id}`} className={ style.anchor + ( selected >=0 && selected === module.id ? ` ${style.selected}` : '')}>
                { module.name }
              </a>
            </li>)
          )}
        </ol>
      </li>);
  }

  const createBackEndLinks = (selected:number) => {
    if( backModules.length === 0 ){
      return ;
    }

    return( <li className={ style.projectTypes }>
      <h3 className={ style.spanTypes }>Back-end</h3>
        <ol className={ style.subList }>
          { backModules.map( ( module: BackModuleData ) => (
            <li key={`back-li-${module.id}`} className={ style.projectNames }>
              <a href={`#article_bm_${module.id}`} className={ style.anchor + ( selected >=0 && selected === module.id ? ` ${style.selected}` : '')}>
                { module.name }
              </a>
            </li>)
          )}
        </ol>
      </li>);
  }

  return(
  <section className={ style.navList }>
    <h2 className={ style.navTitle }>ON THIS PAGE</h2>

    <ul className={ style.mainList }>
      { createFrontEndLinks( ( selectedModule.type === "front" ? selectedModule.id : -1 ) ) }
      { createBackEndLinks( ( selectedModule.type === "back" ? selectedModule.id : -1 ) ) }
    </ul>
  </section>);
}