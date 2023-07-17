import { executeQuery } from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { SkillData } from "../../../../lib/definitions";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const sql= `SELECT s.id, s.name FROM skills AS s INNER JOIN skills_f_mod AS sfm ON s.id=sfm.skill_id WHERE sfm.module_id=${req.query.id}`;

  var skills: SkillData[] = [];

  try{
    const result = await executeQuery(sql);

    result.forEach( (elem: SkillData) => {
      skills.push(elem);
    });

    return res.status(200).json(skills);
  }
  catch( error ){
    res.status(500).json({
      success: false ,
      errMsg : `Error /api/skills/front/id => ${error.message}`
    });
  }
}