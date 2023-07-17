import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/session-config";
import { isSameString, hashString} from "../../../lib/pass-utils";
import { executeQuery } from "../../../lib/db";

interface LoginInterface{
  login: string,
  pwd: string,
}

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if( req.method !== 'POST' ){
    return res.status(403).json( { success: false , msg: 'Only POST request authorized !' } );
  }
  
  try{
    const user: LoginInterface = req.body;
  
    const userDBInfos = await executeQuery( `SELECT * FROM users WHERE login='${user.login}'` );
  
    const isSame = await isSameString( user.pwd , userDBInfos[0].pwd );
  
    if( isSame ){
      req.session.user = {
        id: userDBInfos[0].id,
        type: userDBInfos[0].type,
      };

      const hashToken = await hashString( process.env.SECRET_TOKEN || '' );

      req.session.csrf = {
        token: hashToken
      };
    
      await req.session.save();
      res.status(200).json( { success: true } )
    }
    else{
      res.status(200).json( { success: false } )
    }
  }
  catch(error){
    return res.status(500).json( { success: false, msg : `Error /api/login API : ${error.message}` } );
  }
}