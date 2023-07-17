import { executeQuery } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { BackModuleData, BackModulesList } from '../../../../lib/definitions';

type ErrorMsg = {
  errMsg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse< BackModulesList | ErrorMsg >){
  const query = `SELECT bm.id, bm.name, bm.link, bm.description, bm.thumbnail FROM back_modules AS bm INNER JOIN skills_b_mod AS sbm ON bm.id=sbm.module_id INNER JOIN skills AS s ON sbm.skill_id=s.id WHERE LOWER(s.name) LIKE LOWER('%${req.query.name}%') GROUP BY bm.name`
  
  try{
    const mods = await executeQuery(query);
    
    var resultMods: BackModulesList = [];
    mods.forEach( (mod: BackModuleData) => {
      resultMods.push({
        id: mod.id,
        name: mod.name,
        link: mod.link,
        description: mod.description,
        thumbnail: mod.thumbnail,
      });
    });

    res.status(200).json( resultMods );
  }
  catch( error ){
    res.status(500).json({ errMsg: `Error in query (${query}) => ${error.message}` });
  }
}
