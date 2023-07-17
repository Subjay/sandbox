import { executeQuery } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { SkillData } from "../../../lib/definitions";

type ErrorMsg = {
  errMsg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse< ErrorMsg | SkillData[] >){
  const query = `SELECT * FROM skills`;
  try{
    const data = await executeQuery(query);
    var skills: SkillData[] = [];

    data.forEach( (elem: SkillData) => {
      skills.push(elem);
    });

    return res.status(200).json( skills );
  }
  catch (error){
    return res.status(500).json( { errMsg : `Error in query (${query}) => ${error.message}`} );
  }
}