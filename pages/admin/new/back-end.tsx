import AdminLayout from "../../../components/admin-layout";
import style from '../../../styles/admin/new/front-end.module.css';
import { useEffect, useState , useRef } from 'react';
import getURL from "../../../lib/utils";
import { SkillData } from "../../../lib/definitions";
import Link from "next/link";
import { withSessionSsr } from "../../../lib/session-config";

export default function AddFront(){
  const [ name , setName ] = useState<string>("");
  const [ link , setLink ] = useState<string>("");
  const [ description , setDescription ] = useState<string>("");
  const [ thumbnail, setThumbnail ] = useState<string>("");
  const [ submit , setSubmit ] =useState<boolean>(false);
  const [ skillsList, setSkillsList ] = useState<SkillData[]>([]);
  const [ allSkills, setAllSkills ] = useState<SkillData[]>([]);
  const selectSkillRef = useRef<HTMLSelectElement>(null);

  const fetchSkillsList = async () => {
    var list = [];
    const status = await fetch( getURL('/api/skills') )
      .then( res => {
        if( res.ok ){
          return res.json();
        }

        throw res.statusText;
      })
      .then( data => {
        list = data;
      })
      .catch( error => {
        console.log(`Error fetch skills list : ${error}`);
      });

    setAllSkills( list );
  }

  const insertModule = async () => {
    const status = fetch( getURL(`/api/back-modules/new`), {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-type' : 'application/json'
      },
      body: JSON.stringify( {
        id: null,
        name: name,
        link: link,
        description: description,
        thumbnail: null,
        skills: skillsList
      } )
    } )
      .then( res => {
        if(res.ok){
          return res.json();
        }

        switch( res.status ){
          case 501:
            throw `Error with "/api/back-modules/new" API : couldn't insert new module`
            break;
          case 502:
            throw `Error with "/api/back-modules/new" API : couldn't retrieve mod id`
            break;
          case 503:
            throw `Error with "/api/back-modules/new" API : couldn't update skills_b_mod`
            break;
          default:
            throw `Error with "/api/back-modules/new" API : ${res.status}`
        }
      })
      .then( data => {
        if( data.success ){
          //display success msg and then refresh page
          window.location.href = "/admin/dashboard";
        }
        else{
          throw `Error adding module ${name} : ${data.msg}`
        }
      })
      .catch( error => {
        console.log(error);
      })
  }

  const handleSubmit = () => {
    if(submit){
      insertModule();
      return;
    }
  }

  const handleAddSkillFromList = () => {
    var newList: SkillData[] = skillsList.slice();
    newList.push( { id: (selectSkillRef.current ? parseInt( selectSkillRef.current.value, 10) : -1 ), name: selectSkillRef.current ? selectSkillRef.current.options[selectSkillRef.current.selectedIndex].text : "" } ) ;

    setSkillsList( newList );
  }

  const handleRemoveSkill = (id: number) => {
    var newList = skillsList.slice();
    newList.splice(id,1);

    setSkillsList( newList );
  }

  useEffect( () => {
    setSubmit(name !== "" && link !== "" && description !== "" && skillsList.length !== 0);
  });

  useEffect( () => {
    fetchSkillsList();
  },[]);

  return(
  <AdminLayout title="Add back-end module">
    <section className={ style.mainSection }>
      <Link href="/admin/dashboard" className={ style.goBack }>Go Back</Link>
      <form action={ getURL("/api/back-modules/new") } method="post">
        <h2 className={ style.subTitle }>Main infos :</h2>
        <label htmlFor="name">Name :</label>
        <input id="name" name="name" type="text" value={ name } onChange={ (event) => setName( event.target.value )} />

        <label htmlFor="file">Project url :</label>
        <input id="file" name="file" type="text" value={ link } onChange={ (event) => setLink( event.target.value )} />
        
        <label htmlFor="description">Description :</label>
        <textarea id="description" name="description" value={ description } onChange={ (event) => setDescription( event.target.value )} />

        <section className={ style.skillsList }>
          <h2 className={ style.subTitle }>Skills/Tech :</h2>
          <section className={ style.allSkillsSection }>
            <label htmlFor="skills">Add skill :</label>
            <select id='skills' ref={ selectSkillRef }>
              {
                allSkills.map( (skillName: SkillData, index: number) => {
                  return (<option key={ `opt_${index}`} value={ skillName.id }>{ skillName.name }</option>)
                })
              }
            </select>
            <button type="button" onClick={ () => handleAddSkillFromList() }>Add</button>
          </section>
          <section className={ style.skillToAddSection }>
            <h3>This module skills :</h3>
              {
                skillsList.length === 0 ? (
                  <p>No skill(s) added yet.</p>
                ) : (
                  <ol className={ style.olSkills }>
                    {
                      skillsList.map( ( skill:SkillData , index: number) => {
                        return (
                        <li key={`li_${index}`} className={ style.liSkill }>
                          <span>{ skill.name }</span>
                          <button type="button" onClick={ () => handleRemoveSkill( index )}>remove</button>
                        </li>);
                      })
                    }
                  </ol>
                )
              }
          </section>
        </section>
        
        <button type="button" style={ { visibility: (submit ? "visible" : "hidden") } } onClick={ () => handleSubmit() }>Add Module</button>
      </form>
    </section>
  </AdminLayout>);
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
