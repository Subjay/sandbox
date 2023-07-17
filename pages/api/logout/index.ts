import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/session-config";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  
  return res.status(200).json( null );
}