export default function getURL(path: string) {
  const baseURL = process.env.VERCEL_URL === undefined
    ? process.env.NEXT_PUBLIC_SITE_URL!
    : process.env.VERCEL_URL;
  return new URL(path, baseURL).toString();
}

export function isConnected(): boolean{
  return true;
}