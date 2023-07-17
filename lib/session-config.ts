import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number,
      type: 'admin' | 'unknown',
    },
    csrf?: {
      token? : string,
    }
  }
}

export const sessionOptions = {
  cookieName: "iron_session",
  password: process.env.SECRET_SESSION || 'EJjhRfv*-qML#@%PJ~RY@wVx~yPHFa0g',
  ttl: process.env.NODE_ENV === "production" ? 300 : 3000,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    maxAge: process.env.NODE_ENV === "production" ? 299 : 2999,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}