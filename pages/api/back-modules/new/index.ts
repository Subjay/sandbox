import { executeQuery } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { SkillData } from "../../../../lib/definitions";
import { withSessionRoute } from "../../../../lib/session-config";

interface ModuleInfos{
  id: number,
  name: string,
  link: string,
  description: string,
  thumbnail: null,
  skills: SkillData[],
}

export default withSessionRoute(handler);

async function updateSkillsBMOD( list:SkillData[] , modID: number){
  try{
    for( let i = 0; i < list.length ; i++){
      await executeQuery(`INSERT INTO skills_b_mod (id, module_id, skill_id) VALUES (NULL,'${modID}','${list[i].id}')`);
    }

    return true;
  }
  catch(error){
    return false;
  }
}

export async function handler(req:NextApiRequest, res:NextApiResponse<{ success: boolean, msg?: string }>) {
  if( req.method !== 'POST' ){
    return res.status(403).json( { success: false , msg: 'Only POST request authorized !' } );
  }

  if( req.session.user?.type !== 'admin'){
    return res.status(405).json( { success: false , msg: "Unauthorized access !" } );
  }
  
  const mod : ModuleInfos = req.body;

  try{
    const query = `INSERT INTO back_modules ( id, name, link, description, thumbnail) VALUES (NULL, "${mod.name}", "${mod.link}", "${mod.description}", NULL)`;

    await executeQuery(query);
  }
  catch(error){
    return res.status(501).json({ success: false, msg: `Error in back-modules/new API => ${error.message}`});
  }

  var modID = -1;

  try{
    const id = await executeQuery( `SELECT id FROM back_modules ORDER BY id DESC LIMIT 1` );
    modID = id[0].id;
  }
  catch( error ){
    return res.status(502).json({ success: false, msg: `Error in back-modules/new API : couldn't fetch mod id => ${error.message}`});
  }

  var success = await updateSkillsBMOD(mod.skills , modID);

  if( success ){
    return res.status(200).json({ success:  true });
  }
  else{
    return res.status(503).json({ success: false });
  }
}

