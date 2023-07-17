export default function getURL(path: string) {
  const baseURL = process.env.VERCEL_URL === undefined
    ? process.env.NEXT_PUBLIC_SITE_URL!
    : process.env.VERCEL_URL;
    console.log("path",path);
    console.log("baseURL",baseURL);
    console.log("res",new URL(path, baseURL).toString());
  return new URL(path, baseURL).toString();
}

export function isConnected(): boolean{
  return true;
}