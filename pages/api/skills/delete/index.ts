import { connectToDB, closeConnection, deleteQuery} from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../../lib/session-config";

interface PostArgs{
  id: number,
}

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse){
  if( req.method !== 'POST' ){
    return res.status(403).json( { success: false , msg: 'Only POST request authorized !' } );
  }

  if( req.session.user?.type !== 'admin'){
    return res.status(405).json( { success: false , msg: "Unauthorized access !" } );
  }
  
  try{
    const post: PostArgs = req.body;
    const sqlDeleteFrontLinks = `DELETE FROM skills_f_mod WHERE skill_id = ${post.id}`
    const sqlDeleteBackLinks = `DELETE FROM skills_f_mod WHERE skill_id = ${post.id}`
    const sqlDeleteSkill = `DELETE FROM skills WHERE id = ${post.id}`;
    
    const conn = await connectToDB();

    await deleteQuery( conn, sqlDeleteFrontLinks );
    await deleteQuery( conn, sqlDeleteBackLinks );
    await deleteQuery( conn, sqlDeleteSkill );
    
    await closeConnection(conn);

    return res.status(200).json( { success: true } );
  }
  catch( error ){
    return res.status(500).json( { success: false , msg : `Error in /api/skills/delete API => ${error.message}` } );
  }
}