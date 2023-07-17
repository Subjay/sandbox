import { executeQuery } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { FrontModuleData, FrontModulesList } from '../../../../lib/definitions';

type ErrorMsg = {
  errMsg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse< FrontModulesList | ErrorMsg >){
  const query = `SELECT fm.id,fm.name,fm.link,fm.description,fm.file_name FROM front_modules AS fm INNER JOIN skills_f_mod AS sfm ON fm.id=sfm.module_id INNER JOIN skills AS s ON sfm.skill_id=s.id WHERE LOWER(s.name) LIKE LOWER('%${req.query.name}%') GROUP BY fm.name`
  
  try{
    const mods = await executeQuery(query);
    
    var resultMods: FrontModulesList = [];
    mods.forEach( (mod: FrontModuleData) => {
      resultMods.push({
        id: mod.id,
        name: mod.name,
        link: mod.link,
        description: mod.description,
        file_name: mod.file_name,
      });
    });

    res.status(200).json( resultMods );
  }
  catch( error ){
    res.status(500).json({ errMsg: `Error in query (${query}) => ${error.message}` });
  }
}
