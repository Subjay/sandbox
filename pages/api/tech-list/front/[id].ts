import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../../lib/db";

type ErrorMsg = {
  errMsg: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<string[] | ErrorMsg>) {
  const query = `SELECT s.name FROM skills AS s INNER JOIN skills_f_mod AS sfm ON s.id=sfm.skill_id WHERE sfm.module_id=${req.query.id}`;

  try{
    const rows = await executeQuery(query);

    var names:string[] = [];
    rows.forEach( ({ name }: { name : string }) => {
      names.push( name);
    });

    res.status(200).json( names );
  }
  catch (error){
    res.status(500).json( { errMsg: `Error in query : ${query} => ${error.message}` } );
  }
}