import MainContent from "../components/main-content";
import ProjectsNavigation from "../components/projects-navigation";
import ProjectInfos from "../components/project-infos";
import BaseLayout from '../components/layout';
import Header from '../components/header';
import Footer from '../components/footer';
import style from '../styles/main-mods/main.module.css';
import { ModulesLists } from '../lib/definitions';
import { useEffect, useState, createContext } from 'react';
import getURL from '../lib/utils';

export const APIUrlUpdateContext = createContext< (url: string) => void >( function (url: string) : void {} );
export const UpdateModContext = createContext< (modID: number, type: "front" | "back") => void >( function (modID: number, type: "front" | "back") : void {});

export default function Sandbox() {
  const emptyModsList : ModulesLists = { frontModules: [], backModules: [] };
  const [ mods, setMods ] = useState( emptyModsList );
  const [ apiUrl, setApiUrl] = useState( '' );
  
  const [ selectedMod , setSelectedMod ] = useState<{id: number, type: "front" | "back"}>({ id: -2, type: "front" });
  const [ techList, setTechList ] = useState<string[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  const UpdateAPIsUrl = (url: string) => {
    setApiUrl( url );
  }

  const UpdateSelectedMod = (modID: number, type: "front" | "back") => {
    setSelectedMod( {id : modID, type: type } );
  }

  const fetchTechList = async ({ id, type } : { id: number, type: string }) => {
    const url = `/api/tech-list/${type}/${id}`;
    var skills: string[] = [];
    
    const list = await fetch( getURL(url) )
      .then( res => {
        if(res.ok){
          return res.json();
        }

        throw `Error fetch(${url}) : ${res.statusText}`;
      })
      .then( data => {
        skills = data;
      })
      .catch( error => {
        console.log(error);
      });
    
    setTechList( skills );
  }

  const fetchModulesData = async (name: string) => {
    const url = name !== "" ? `/api/all-modules/skills/${name}` : `/api/all-modules`;
    var resData: ModulesLists = emptyModsList ;
  
    const mods = await fetch( getURL( url ) ).then( res => {
      if (res.ok){
        return res.json();
      }
    }).then( (data) => {
      resData = data;
    }).catch(error => {
      console.log(error);
    });
  
    setMods( resData );
    setLoading(false);
  }

  useEffect( () => {
    fetchModulesData( apiUrl );
    if( !loading ) setLoading(true);
  }, [apiUrl]);

  useEffect( () => {
    fetchTechList(selectedMod);
  },[selectedMod]);

  if( loading ){
    return (
      <BaseLayout
        home
        description="Sandbox website for projects and/or modules examples from Sébastien Gillig"
        title = "Sandbox">
          <div className={ style.loadingContainer }>
            <img src="/images/icons/Icon-Loading.gif" alt='loading gif' className={ style.loadingGif } />
          </div>
      </BaseLayout>
    )
  }

  return (
  <BaseLayout
    home
    description="Sandbox website for projects and/or modules examples from Sébastien Gillig"
    title = "Sandbox">
      
    <APIUrlUpdateContext.Provider value={ UpdateAPIsUrl }>
      <UpdateModContext.Provider value={ UpdateSelectedMod }>
        <Header />
        <section className={ style.content }>
          <ProjectsNavigation
            modsLists= { mods }
            selectedModule={ selectedMod } />
          
          <MainContent
            modsLists= { mods } />
          
          <ProjectInfos
            projectTechList={ techList } />
        </section>
      </UpdateModContext.Provider>
    </APIUrlUpdateContext.Provider>
    
    <Footer />
  </BaseLayout>
  );
}
