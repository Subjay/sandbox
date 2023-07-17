import AdminLayout from "../../components/admin-layout";
import style from '../../styles/admin/dashboard.module.css';
import { FrontModuleData, BackModuleData, FrontModulesList, BackModulesList , SkillData } from "../../lib/definitions";
import getURL from "../../lib/utils";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { withSessionSsr } from "../../lib/session-config";
import UpdateBackMod from "../../components/admin/update-back";
import UpdateFrontMod from "../../components/admin/update-front";
import UpdateSkillName from "../../components/admin/update-skill";


function getSmallDescription(texte:string): string{
  return  texte.slice(0,65) + (texte.length > 65 ? " [...]" : "");
}

export default function DashBoard(){
  const [ frontMods, setFrontMods ] = useState<FrontModulesList>( [] );
  const [ backMods, setBackMods ] = useState<BackModulesList>( [] );
  const [ skills, setSkills ] = useState<SkillData[]>([]);
  const [ inputFrontValue, setInputFrontValue ] = useState<string>("");
  const [ inputBackValue, setInputBackValue ] = useState<string>("");
  const [ inputSkillValue, setInputSkillValue ] = useState<string>("");
  const [ infoMsg, setInfoMsg ] = useState<string>();
  const [ updateFront, setUpdateFront ] = useState<FrontModuleData>();
  const [ updateBack, setUpdateBack ] = useState<BackModuleData>();
  const [ updateSkill, setUpdateSkill ] = useState<SkillData>();

  const fetchFrontModsByName = async (name:string) => {
    var mods = [];
    const data = await fetch( getURL( `/api/front-modules/name/${name}` ) )
      .then( (res) => {
        if(res.ok){
          return res.json();
        }
        
        throw `Error in fetchFrontModsByName : ${res.statusText}`;
      })
      .then( (data) => {
        mods = data;
      })
      .catch( error => {
        console.log(error);
      });
    
    setFrontMods( mods );
  }

  const fetchBackModsByName = async (name:string) => {
    var mods = [];
    const data = await fetch( getURL( `/api/back-modules/name/${name}` ) )
      .then( (res) => {
        if(res.ok){
          return res.json();
        }
        
        throw `Error in fetchBackModsByName : ${res.statusText}`;
      })
      .then( (data) => {
        mods = data;
      })
      .catch( error => {
        console.log(error);
      });
    
    setBackMods( mods );
  }

  const fetchSkillsByName = async (name: string) => {
    var list: SkillData[] = [];

    await fetch( getURL(`/api/skills/${name}`) )
      .then( res => {
        if(res.ok){
          return res.json();
        }

        throw res.statusText;
      })
      .then( data => {
        list = data;
      })
      .catch( error => {
        console.log(`Error in /api/skills/${name} API : ${error}`);
      })

      setSkills( list );
  }

  const deleteFrontMod = async ( id:number, name: string ) => {
    const confirmation = confirm(`Are you sure to delete module ${name}?`);

    if( !confirmation ){
      return;
    }

    const success = await fetch(`/api/front-modules/delete`, {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-type' : 'application/json'
      },
      body: JSON.stringify( {
        id: id,
      } )
    });

    if( success ){
      fetchFrontModsByName( inputFrontValue );
      return;
    }

    //TODO display an error msg
  }

  const deleteBackMod = async ( id:number, name:string ) => {
    const confirmation = confirm(`Are you sure to delete module ${name}?`);

    if( !confirmation ){
      return;
    }

    const success = await fetch(`/api/back-modules/delete`, {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-type' : 'application/json'
      },
      body: JSON.stringify( {
        id: id,
      } )
    });

    if( success ){
      fetchBackModsByName( inputBackValue );
      return;
    }

    //TODO display an error msg
  }

  const deleteSkill = async ( id:number, name:string ) => {
    const confirmation = confirm(`Are you sure to delete skill : ${name} ?`);

    if( !confirmation ){
      return;
    }

    const success = await fetch(`/api/skills/delete`, {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-type' : 'application/json'
      },
      body: JSON.stringify( {
        id: id,
      } )
    });

    if( success ){
      fetchSkillsByName( inputSkillValue );
      return;
    }

    //TODO display an error msg
  }

  const handleUpdateFront = async (mod: FrontModuleData) =>{
    const success = await fetch( getURL('/api/front-modules/update'),{
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: mod.id,
        name: mod.name,
        link: mod.link,
        description: mod.description,
        file_name: mod.file_name,
        skills: mod.skills
      }),
    }).then( res => {
      if( res.ok ){
        return res.json();
      }

      throw `Error fetch /api/front-modules/update status : (${res.status})`;
    }).then( success => {
      if( success ){
        setInfoMsg(`Front Module "${mod.name}" updated !`);
      }
    }).catch( err => {
      console.log(err);
    });
  }

  const handleUpdateBack = async (mod: BackModuleData) =>{
    const success = await fetch( getURL('/api/back-modules/update'),{
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: mod.id,
        name: mod.name,
        link: mod.link,
        description: mod.description,
        skills: mod.skills
      }),
    }).then( res => {
      if( res.ok ){
        return res.json();
      }

      throw `Error fetch /api/back-modules/update : status (${res.status})`;
    }).then( success => {
      if( success ){
        setInfoMsg(`Back Module "${mod.name}" updated !`);
      }
    }).catch( err => {
      console.log(err);
    });
  }

  const handleUpdateSkill = async (skill: SkillData) =>{
    const success = await fetch( getURL("/api/skills/update"), {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        id: skill.id,
        name: skill.name
      })
    }).then( res => {
      if( res.ok ){
        return res.json();
      }

      throw `Error fetch /api/skill/udpate : status (${res.status})`;
    }).then( success => {
      if( success ){
        setInfoMsg(`Skill "${skill.name}" updated !`);
      }
    }).catch( err => {
      console.log(err);
    });
  }

  useEffect( () => {
    fetchFrontModsByName( inputFrontValue );
  }, [inputFrontValue]);

  useEffect( () => {
    fetchBackModsByName( inputBackValue );
  }, [inputBackValue]);

  useEffect( () => {
    fetchSkillsByName( inputSkillValue );
  }, [inputSkillValue]);

  useEffect( () =>{
    if( updateFront ){
      setUpdateFront(undefined);
    }

    if( updateBack ){
      setUpdateBack(undefined);
    }

    if( updateSkill ){
      setUpdateSkill(undefined);
    }
  },[infoMsg]);

  return(
    <AdminLayout
      title='Dashboard'
      logged={true}>
      {
        updateFront && (
          <section className={ style.modal }>
            <UpdateFrontMod
              id={ updateFront.id }
              name= { updateFront.name }
              description={ updateFront.description }
              fileName={ updateFront.file_name }
              onSubmit= { handleUpdateFront } />
            <button type="button" onClick={ () => setUpdateFront(undefined) }>Cancel</button>
          </section>
        )
      }
      {
        updateBack && (
          <section className={ style.modal }>
            <UpdateBackMod
              id={ updateBack.id }
              name= { updateBack.name }
              description={ updateBack.description }
              link= { updateBack.link }
              thumbnail={ updateBack.thumbnail }
              onSubmit= { handleUpdateBack } />
            <button type="button" onClick={ () => setUpdateBack(undefined) }>Cancel</button>
          </section>
        )
      }
      {
        updateSkill && (
          <section className={ style.modal }>
            <UpdateSkillName
              id={ updateSkill.id }
              name={ updateSkill.name }
              onSubmit={ handleUpdateSkill } />
            <button type="button" onClick={ () => setUpdateSkill(undefined) }>Cancel</button>
          </section>
        )
      }
      {
        infoMsg && (
          <section className={ style.modal }>
            <p className={ style.modalMsg }>{ infoMsg }</p>
            <button type="button" onClick={ () => setInfoMsg(undefined) }>OK</button>
          </section>
        )
      }
      <section className={ style.mainSection }>
        <section className={ style.addSection }>
          <span className={ style.addSpan }>Add new :</span>
          <Link href="/admin/new/front-end" className={ style.addBtn }>Front-module</Link>
          <Link href="/admin/new/back-end" className={ style.addBtn }>Back-module</Link>
          {/* <Link href="/admin/new/account" className={ style.addBtn }>Account</Link> */}
          <Link href="/admin/new/skill" className={ style.addBtn }>Skill</Link>
        </section>

        <section className={ style.frontListing }>
          <h2 className={ style.listTitle }>
            <span className={ style.listSpan }>Front Modules</span>
            <div className={ style.listSearchBar }>
              <svg viewBox="-2 -2 24 24" className={ style.MGIcon }>
                <circle cx="8.89" cy="8.89" r="8.26"/>
                <line x1="19.36" y1="19.36" x2="14.73" y2="14.73"/>
              </svg>
              <input
                type="text"
                className={ style.input }
                value={ inputFrontValue }
                placeholder="Mod name"
                onChange={ (event) => { setInputFrontValue(event.target.value) } } />
            </div>
          </h2>
          <ol className={ style.list }>
            {
              frontMods.map( (mod: FrontModuleData, index: number) => {
                return (
                  <li key={`li_front_${index}`} className={ style.moduleLine + ( (index % 2) === 0 ? ` ${style.evenModule}` : ` ${style.oddModule}`) }>
                    <span key={`name_front_${index}`} className={ style.moduleName }>{ mod.name }</span>
                    <span key={`desc_front_${index}`} className={ style.moduleDesc }>{ getSmallDescription(mod.description) }</span>
                    <button
                      key={`upd_btn_front_${index}`}
                      id={ `update_front_${mod.id}` }
                      className={ style.updateBtn }
                      onClick={ () => setUpdateFront({
                        id: mod.id,
                        name: mod.name,
                        link: mod.link,
                        description: mod.description,
                        file_name: mod.file_name,
                      })}>
                      Update
                      {/* <svg>Add icon</svg> */}
                    </button>
                    <button key={`del_btn_front_${index}`} id={ `delete_front_${mod.id}` } className={ style.deleteBtn } onClick={ () => deleteFrontMod( mod.id , mod.name ) }>
                      Delete
                      {/* <svg>Delete icon</svg> */}
                    </button>
                  </li>
                )
              })
            }
          </ol>
        </section>

        <section className={ style.backListing }>
          <h2 className={ style.listTitle }>
            <span className={ style.listSpan }>Back Modules</span>
            <div className={ style.listSearchBar }>
              <svg viewBox="-2 -2 24 24" className={ style.MGIcon }>
                <circle cx="8.89" cy="8.89" r="8.26"/>
                <line x1="19.36" y1="19.36" x2="14.73" y2="14.73"/>
              </svg>
              <input
                type="text"
                className={ style.input }
                value={ inputBackValue }
                placeholder="Mod name"
                onChange={ (event) => { setInputBackValue(event.target.value) } } />
            </div>
          </h2>
          <ol className={ style.list }>
            {
              backMods.map( (mod: BackModuleData, index: number) => {
                return (
                  <li key={`li_back_${index}`} className={ style.moduleLine + ( (index % 2) === 0 ? ` ${style.evenModule}` : ` ${style.oddModule}`) }>
                    <span key={`name_back_${index}`} className={ style.moduleName }>{ mod.name }</span>
                    <span key={`desc_back_${index}`} className={ style.moduleDesc }>{ getSmallDescription(mod.description) }</span>
                    <button
                      key={`upd_btn_back_${index}`}
                      id={ `update_back_${mod.id}` }
                      className={ style.updateBtn }
                      onClick={ () => setUpdateBack({
                        id: mod.id,
                        name: mod.name,
                        link: mod.link,
                        description: mod.description
                      })}>
                      Update
                      {/* <svg>Add icon</svg> */}
                    </button>
                    <button key={`del_btn_back_${index}`} id={ `delete_back_${mod.id}` } className={ style.deleteBtn } onClick={ () => deleteBackMod( mod.id , mod.name ) }>
                      Delete
                      {/* <svg>Delete icon</svg> */}
                    </button>
                  </li>
                )
              })
            }
          </ol>
        </section>

        <section className={ style.skillsListing }>
          <h2 className={ style.listTitle }>
            <span className={ style.listSpan }>Skills</span>
            <div className={ style.listSearchBar }>
              <svg viewBox="-2 -2 24 24" className={ style.MGIcon }>
                <circle cx="8.89" cy="8.89" r="8.26"/>
                <line x1="19.36" y1="19.36" x2="14.73" y2="14.73"/>
              </svg>
              <input
                type="text"
                className={ style.input }
                value={ inputSkillValue }
                placeholder="Skill name"
                onChange={ (event) => { setInputSkillValue(event.target.value) } } />
            </div>
          </h2>
          <ol className={ style.list }>
            {
              skills.map( (skill: SkillData , index: number) => {
                return (
                  <li key={`li_skill_${index}`} className={ style.skillLine + ( (index % 2) === 0 ? ` ${style.evenModule}` : ` ${style.oddModule}`) }>
                    <span key={`name_skill_${index}`} className={ style.skillName }>{ skill.name }</span>
                    <button
                      key={`upd_btn_skill_${index}`}
                      id={ `update_back_${skill.id}` }
                      className={ style.updateBtn }
                      onClick={ () => setUpdateSkill({
                        id: skill.id,
                        name: skill.name,
                      })}>
                      Update
                      {/* <svg>Add icon</svg> */}
                    </button>
                    <button key={`del_btn_skill_${index}`} id={ `delete_back_${skill.id}` } className={ style.deleteBtn } onClick={ () => deleteSkill( skill.id , skill.name ) }>
                      Delete
                      {/* <svg>Delete icon</svg> */}
                    </button>
                  </li>
                )
              })
            }
          </ol>
        </section>
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps( context ) {
    const user = context.req.session.user;

    if( user?.type !== 'admin' ){
      return {
        redirect: {
          permanent: false,
          destination: "/admin",
        },
      };
    }

    return {
      props: {
      },
    };
  },
);
