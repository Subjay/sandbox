import { executeQuery } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import { BackModuleData, BackModulesList } from '../../../lib/definitions';

type SuccessData = {
  backModules: BackModulesList
}

type ErrorMsg = {
  errMsg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SuccessData | ErrorMsg>) {
  try{
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

    res.status(200).json( { backModules: backResults } );
  }
  catch ( error ){
    res.status(500).json({ errMsg: `Error in back-modules API => ${error.message}` });
  }
}