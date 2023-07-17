import { executeQuery } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../../lib/session-config";

interface PostArgs{
  name: string,
}

export default withSessionRoute(handler);

async function handler(req:NextApiRequest, res: NextApiResponse){
  if( req.method !== 'POST' ){
    return res.status(403).json( { success: false , msg: 'Only POST request authorized !' } );
  }

  if( req.session.user?.type !== 'admin'){
    return res.status(405).json( { success: false , msg: "Unauthorized access !" } );
  }
  
  try{
    const post : PostArgs = req.body;

    const query = `INSERT INTO skills (id, name) VALUES (NULL,'${post.name}')`;
    await executeQuery(query);

    return res.status(200).json({ success : true });
  }
  catch(error){
    return res.status(500).json({ success : false });
  }
}