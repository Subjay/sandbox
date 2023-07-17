import getURL from "./utils";
import { BackModuleData, FrontModuleData, FrontModulesList, BackModulesList } from './definitions';

interface QueryParams {
  moduleType: "front-end" | "back-end" | "all",
  id?: number,
}

export async function getModules(query : QueryParams){

  const moduleType = query.moduleType;

  var api = getURL("/api/");

  switch( query.moduleType ){
    case "front-end":
      api += "front-modules";
      break;
    case "back-end":
      api += "back-modules";
      break;
    default:
      api += "all-modules";
  }

  api += query.id ? `/${query.id}` : "";

  const res = await fetch( api );
  const data = await res.json();

  return { modules: data };
}

export async function getAllFrontModulesIDs(){
  const { modules } = await getModules({ moduleType : "front-end" });

  return modules.map( (mod: FrontModuleData) => {
    return {
      params: {
        id: `${mod.id}`,
      }
    };
  });
}

export async function getModuleData(id){
  const { modules } = await getModules({ moduleType: 'front-end', id: id });
  return{
    ...modules,
  }
}

export function getSelectedModuleIndex(mods: FrontModulesList | BackModulesList, id: number): number{
  var indexSelected: number = -1;

  mods.forEach( (mod: FrontModuleData | BackModuleData) => {
    if( mod.id === id ){
      indexSelected = id;
    }
  })
  
  return indexSelected;
}