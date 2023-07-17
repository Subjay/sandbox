import { withSessionRoute } from "../../../../lib/session-config";
import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../../lib/db";
import { SkillData } from "../../../../lib/definitions";


export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse){
  if( req.method !== 'POST' ){
    return res.status(403).json( { success: false , msg: 'Only POST request authorized !' } );
  }

  if( req.session.user?.type !== 'admin'){
    return res.status(405).json( { success: false , msg: "Unauthorized access !" } );
  }
  
  const skill: SkillData = req.body;
  const sqlUpdateSkill = `UPDATE skills SET name="${skill.name}" WHERE id= ${skill.id}`;

  try{
    await executeQuery(sqlUpdateSkill);
    
    return res.status(200).json( true );
  }
  catch( error ){
    return res.status(500).json( false );
  }
}