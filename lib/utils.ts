export default function getURL(path: string) {
  const baseURL = process.env.VERCEL_URL === undefined
    ? process.env.NEXT_PUBLIC_SITE_URL!
    : process.env.VERCEL_URL;

  const protocol = process.env.VERCEL_URL === undefined
  ? ""
  : "https://";
  
  console.log("utils.ts result", protocol + baseURL + path );
  return (protocol + baseURL + path).toString();
}