import { SkillData } from "../../lib/definitions";
import { useState, useEffect } from 'react';

interface Props{
  id: number,
  name: string,
  onSubmit: (skill: SkillData) => {}
}

export default function UpdateSkillName( props: Props ){
  const { id, name, onSubmit } = props;
  const [ newName, setNewName ] = useState<string>(name);
  const [ submit, setSubmit ] = useState<boolean>(name !== "");

  const handleSubmit = () =>{
    if( submit ){
      onSubmit({
        id: id,
        name: newName
      });
    }
  }

  useEffect(() => {
    setSubmit( newName !== "" );
  });

  return (
  <form>
    <label htmlFor="name">Name</label>
    <input id="name" type="text" value={ newName } onChange={ (e) => setNewName(e.target.value) } />
    <button onClick={ () => handleSubmit() } type="button">Update Skill</button>
  </form>);
}