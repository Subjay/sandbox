import { executeQuery } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import { BackModuleData, BackModulesList } from '../../../../lib/definitions';

type ErrorMsg = {
  errMsg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<BackModulesList | ErrorMsg>) {
  try{
    const backModules = await executeQuery(`SELECT * FROM back_modules WHERE LOWER(name) LIKE LOWER("%${req.query.name}%")`);

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

    res.status(200).json( backResults );
  }
  catch ( error ){
    res.status(500).json({ errMsg: `Error in back-modules/name API => ${error.message}` });
  }
}