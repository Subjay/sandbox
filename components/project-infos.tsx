import style from '../styles/main-mods/project-infos.module.css';

interface ProjectInfosProps{
  projectTechList: Array<string>
}

export default function ProjectInfos( props: ProjectInfosProps ){
  return(
  <section className={ style.projectInfos }>
    <h2 className={ style.projectInfosTitle }>TECHNOLOGY USED</h2>
    <ul className={ style.projectTechnologyUl }>
      { props.projectTechList.map( (tech: string, index: number) => (
        <li key={ `tech-${index}` } className={ style.techName }>{ tech }</li>
        )
      )}
    </ul>
  </section>)
}