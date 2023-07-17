import { useState, useEffect, useRef } from "react";
import { SkillData, FrontModuleData } from "../../lib/definitions";
import getURL from "../../lib/utils";
import style from '../../styles/admin/update/front-end.module.css';

interface Props{
  id: number,
  name: string,
  description: string,
  fileName: string,
  onSubmit: ( mod: FrontModuleData ) => {}
}

export default function UpdateFrontMod( props: Props ){
  const { id, name, description, fileName , onSubmit} = props;

  const [ newName , setNewName ] = useState<string>(name);
  const [ newDesc, setNewDesc ] = useState<string>(description);
  const [ newFileName, setNewFileName ] = useState<string>(fileName);
  const [ newSkills, setNewSkills ] = useState<SkillData[]>([]);
  const [ allSkills, setAllSkills ] = useState<SkillData[]>([]);
  const [ submit , setSubmit ] =useState<boolean>(true);
  const selectSkillRef = useRef<HTMLSelectElement>(null);

  const fetchAllSkills = async () => {
    await fetch( getURL(`/api/skills`) )
      .then( res => {
        if( res.ok ){
          return res.json();
        }

        throw `Error fetch /api/skills => status (${res.status})`;
      })
      .then( data => {
        setAllSkills( data );
      })
      .catch( err => {
        console.log(err);
      })
  }

  const fetchModSkills = async () => {
    await fetch( getURL(`/api/skills/front/${id}`) )
      .then( res => {
        if( res.ok ){
          return res.json();
        }

        throw `Error fetch /api/skills/front/${id} => status (${res.status})`;
      })
      .then( data => {
        setNewSkills( data );
      })
      .catch( err => {
        console.log(err);
      })
  }

  const handleAddSkillFromList = () => {
    var newList: SkillData[] = newSkills.slice();
    newList.push( {
      id: (selectSkillRef.current ? parseInt( selectSkillRef.current.value, 10) : -1 ),
      name: selectSkillRef.current ? selectSkillRef.current.options[selectSkillRef.current.selectedIndex].text : ""
    });

    setNewSkills( newList );
  }

  const handleRemoveSkill = (id: number) => {
    var newList = newSkills.slice();
    newList.splice(id,1);

    setNewSkills( newList );
  }

  const handleUpdate = () =>{
    if(submit){
      onSubmit({
        id: id,
        name: newName,
        description: newDesc,
        file_name: newFileName,
        link: `/modules/${newFileName}`,
        skills: newSkills
      });
    }
  }

  useEffect(() => {
    fetchModSkills();
    fetchAllSkills();
  },[])

  useEffect( () => {
    setSubmit(newName !== "" && newFileName !== "" && description !== "" && newSkills.length !== 0);
  });

  return (
  <form action={ getURL("/api/front-modules/new") } method="post">
    <h2 className={ style.subTitle }>Main infos :</h2>
    <label htmlFor="name">Name :</label>
    <input id="name" name="name" type="text" value={ newName } onChange={ (event) => setNewName( event.target.value )} />

    <label htmlFor="file">File name :</label>
    <input id="file" name="file" type="text" value={ newFileName } onChange={ (event) => setNewFileName( event.target.value )} />
    
    <label htmlFor="description">Description :</label>
    <textarea id="description" name="description" value={ newDesc } onChange={ (event) => setNewDesc( event.target.value )} />

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
            newSkills.length === 0 ? (
              <p>No skill(s) added yet.</p>
            ) : (
              <ol className={ style.olSkills }>
                {
                  newSkills.map( ( skill:SkillData , index: number) => {
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
    
    <button type="button" style={ { visibility: (submit ? "visible" : "hidden") } } onClick={ () => handleUpdate() }>Update Module</button>
  </form>);
}