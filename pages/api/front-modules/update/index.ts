import { withSessionRoute } from "../../../../lib/session-config";
import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../../lib/db";
import { FrontModuleData, SkillData } from "../../../../lib/definitions";


export default withSessionRoute(handler);

async function addSkillsLinks( skillList: SkillData[], modID: number ){
  try{
    skillList.forEach( async ( skill:SkillData ) => {
      const sqlUpdateSkill = `INSERT INTO skills_f_mod ( id, module_id, skill_id ) VALUES (NULL, '${modID}' , '${skill.id}' )`;
      await executeQuery( sqlUpdateSkill );
    });
  }
  catch( error ){
    throw `Error updating skills_f_mod ${error.message}`;
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse){
  if( req.method !== 'POST' ){
    return res.status(403).json( { success: false , msg: 'Only POST request authorized !' } );
  }

  if( req.session.user?.type !== 'admin'){
    return res.status(405).json( { success: false , msg: "Unauthorized access !" } );
  }
  
  const mod: FrontModuleData = req.body;
  const sqlUpdateFrontMod = `UPDATE front_modules SET name="${mod.name}", link="${mod.link}", description="${mod.description}", file_name="${mod.file_name}" WHERE id=${mod.id}`;
  const sqlDeleteSkillsLinks = `DELETE FROM skills_f_mod WHERE module_id=${mod.id}`;

  try{
    await executeQuery( sqlUpdateFrontMod );
    await executeQuery( sqlDeleteSkillsLinks );

    if( mod.skills ){
      await addSkillsLinks( mod.skills, mod.id );
    }

    return res.status(200).json( true );
  }
  catch( error ){
    return res.status(500).json( false );
  }
}