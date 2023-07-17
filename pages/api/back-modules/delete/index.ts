import { executeQuery } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../../lib/session-config";

interface PostArgs{
  id: number,
  csrf: string,
}

export default withSessionRoute(handler);

export async function handler(req: NextApiRequest, res: NextApiResponse<{ success : boolean, msg?: string }>){
  if( req.method !== 'POST' ){
    return res.status(403).json( { success: false , msg: 'Only POST request authorized !' } );
  }

  if( req.session.user?.type !== 'admin'){
    return res.status(405).json( { success: false , msg: "Unauthorized access !" } );
  }
  
  const post: PostArgs = req.body;

  const query1 = `DELETE FROM back_modules WHERE id = ${post.id}`;
  const query2 = `DELETE FROM skills_b_mod WHERE module_id = ${post.id}`;

  try{
    await executeQuery(query1);
  }
  catch( error ){
    return res.status(500).json( { success : false , msg : `Error in back-modules/delete API => ${error.message}` } );
  }

  try{
    await executeQuery(query2);
    
    return res.status(200).json( { success : true } );
  }
  catch ( error ){
    return res.status(500).json( { success : false , msg : `Error in back-modules/delete API => ${error.message}` } );
  }
}
