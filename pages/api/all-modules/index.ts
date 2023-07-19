import { executeQuery } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import { FrontModuleData, BackModuleData, FrontModulesList, BackModulesList } from '../../../lib/definitions';

type SuccessData = {
  frontModules : FrontModulesList,
  backModules: BackModulesList
}

type ErrorMsg = {
  errMsg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse< SuccessData | ErrorMsg >) {
  try{
    const frontModules = await executeQuery("SELECT * FROM front_modules ORDER BY id DESC");

    var frontResults: FrontModulesList = [];
    frontModules.forEach( (mod : FrontModuleData )=> {
      frontResults.push({
        id: mod.id,
        name: mod.name,
        link: mod.link,
        description: mod.description,
        file_name: mod.file_name,
      });
    });

    const backModules = await executeQuery("SELECT * FROM back_modules ORDER BY id DESC");

    var backResults: BackModulesList = [];
    backModules.forEach( (mod : BackModuleData ) => {
      backResults.push({
        id: mod.id,
        name: mod.name,
        link: mod.link,
        description: mod.description,
        thumbnail: mod.thumbnail,
      });
    });

    res.status(200).json( { frontModules: frontResults, backModules: backResults } );
  }
  catch ( error ){
    res.status(500).json({ errMsg: `Error in front-modules API => ${error.message}` });
  }
};