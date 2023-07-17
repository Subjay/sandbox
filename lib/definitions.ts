export interface SkillData{
  id: number,
  name: string,
}

export interface FrontModuleData{
  id: number,
  name: string,
  link: string,
  description: string,
  file_name: string,
  skills?: SkillData[],
}

export interface BackModuleData{
  id: number,
  name: string,
  link: string,
  description: string,
  thumbnail?: Blob,
  skills?: SkillData[],
}

export type FrontModulesList = Array<FrontModuleData>;

export type BackModulesList = Array<BackModuleData>;

export type ModulesLists = {
  frontModules: FrontModulesList,
  backModules: BackModulesList
}
