import React, { useEffect, useState , useContext, useRef } from "react";
import { APIUrlUpdateContext } from "../pages";

import style from '../styles/main-mods/search-bar.module.css';
import getURL from "../lib/utils";
import { SkillData } from "../lib/definitions";

export default function SearchBar( { id , placeholder } : { id : string , placeholder : string } ){
  const [ inputValue , setInputValue ] = useState('');
  const apiUrlUpdate = useContext(APIUrlUpdateContext);

  const [ suggestions, setSuggestions ] = useState<SkillData[]>([]);
  const [ suggVisible, setSuggVisible ] = useState(false);
  const selectSkillRef = useRef('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if( inputValue === ""){
      return;
    }

    if (event.key === 'Enter') {
      apiUrlUpdate( inputValue );
      setSuggestions( [] );
    }
  }

  const fetchSuggestions = async (name :string) => {
    var result: Array<SkillData> = [];

    await fetch( getURL(`/api/skills/${name}`) )
      .then( (res) => {
        if( res.ok ){
          return res.json();
        }

        throw `Error in fetch /api/skills${name} : ${res.statusText}`;
      })
      .then( (data) => {
        result = data;
      })
      .catch( (error) => {
        console.log( error );
      })
      
      setSuggestions( result );
  }

  function handleSelection(value: string): void{
    selectSkillRef.current = value;
    setSuggVisible(false);
    setInputValue( selectSkillRef.current );
    apiUrlUpdate( selectSkillRef.current );
  }

  function handleBlur(){
    if( selectSkillRef.current !== "" && suggVisible ){
      setSuggVisible(false);
    }
  }

  useEffect( () => {
    if( inputValue === "" ){
      setSuggestions( [] );
      apiUrlUpdate(inputValue);
      return;
    }

    if( selectSkillRef.current === "" ){
      fetchSuggestions(inputValue);
    }
  }, [inputValue]);

  useEffect( () => {
    if( suggestions.length !== 0 ){
      setSuggVisible(true);
    }
    else{
      setSuggVisible(false);
    }
  }, [suggestions]);

  return(
      <section key={ id } className={style.searchBarSection}>
        <div className={ style.searchBar }>
          <svg viewBox="-2 -2 24 24" className={style.MGIcon}>
            <circle cx="8.89" cy="8.89" r="8.26"/>
            <line x1="19.36" y1="19.36" x2="14.73" y2="14.73"/>
          </svg>
          <input
            type="text"
            placeholder={ placeholder }
            className={style.input}
            onKeyDown={ handleKeyDown }
            value={ inputValue }
            onChange={ (event) => { selectSkillRef.current = ""; setInputValue(event.target.value); } }
            onBlur={ handleBlur } />
        </div>
        {
          suggVisible ? (
            <section className={ style.suggestions }>
              <p onClick={ () => setSuggVisible(false) } className={ style.close }>Close suggestions</p>
              {
                suggestions.map( (value: SkillData, index :number) => {
                  return(<p key={`p_${index}`} onClick={ () => handleSelection(value.name) } className={ style.suggElem }>{value.name}</p>)
                })
              }
            </section>
            ) : ( "" )
        }
        
      </section>
  )
}