import { executeQuery } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import { FrontModuleData, FrontModulesList } from '../../../../lib/definitions';

type ErrorMsg = {
  errMsg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<FrontModulesList | ErrorMsg>) {
  try{
    const frontModules = await executeQuery(`SELECT * FROM front_modules WHERE LOWER(name) LIKE LOWER("%${req.query.name}%") ORDER BY id DESC`);

    var frontResults: FrontModulesList = [];
    frontModules.forEach( (mod : FrontModuleData ) => {
      frontResults.push({
        id: mod.id,
        name: mod.name,
        link: mod.link,
        description: mod.description,
        file_name: mod.file_name,
      });
    });

    res.status(200).json( frontResults );
  }
  catch ( error ){
    res.status(500).json({ errMsg: `Error in front-modules/name API => ${error.message}` });
  }
};