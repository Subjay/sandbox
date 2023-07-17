import { executeQuery } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { FrontModulesList, BackModulesList, FrontModuleData, BackModuleData } from "../../../../lib/definitions";

type SuccessData = {
  frontModules?: FrontModulesList,
  backModules?: BackModulesList,
}

type ErrorMsg = {
  errMsg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse< SuccessData | ErrorMsg >){
  const query1 = `SELECT fm.id, fm.name, fm.link, fm.description, fm.file_name FROM front_modules AS fm INNER JOIN skills_f_mod AS sfm ON fm.id=sfm.module_id INNER JOIN skills AS s ON sfm.skill_id=s.id WHERE LOWER(s.name) LIKE LOWER('%${req.query.name}%') GROUP BY fm.name`
  var frontMods: FrontModulesList = [];
  
  try{
    const mods = await executeQuery(query1);
    
    mods.forEach( (mod: FrontModuleData) => {
      frontMods.push({
        id: mod.id,
        name: mod.name,
        link: mod.link,
        description: mod.description,
        file_name: mod.file_name,
      });
    });
  }
  catch( error ){
    res.status(500).json({ errMsg: `Error in query (${query1}) => ${error.message}` });
  }

  const query2 = `SELECT bm.id, bm.name, bm.link, bm.description, bm.thumbnail FROM back_modules AS bm INNER JOIN skills_b_mod AS sbm ON bm.id=sbm.module_id INNER JOIN skills AS s ON sbm.skill_id=s.id WHERE LOWER(s.name) LIKE LOWER('%${req.query.name}%') GROUP BY bm.name`
  var backMods: BackModulesList = [];

  try{
    const mods = await executeQuery(query2);

    mods.forEach( (mod: BackModuleData) => {
      backMods.push({
        id: mod.id,
        name: mod.name,
        link: mod.link,
        description: mod.description,
        thumbnail: mod.thumbnail,
      });
    });
  }
  catch( error ){
    res.status(500).json({ errMsg: `Error in query (${query2}) => ${error.message}` });
  }

  res.status(200).json({ frontModules: frontMods, backModules: backMods });
}
