export default function getURL(path: string) {
  const baseURL = process.env.VERCEL_URL === undefined
    ? process.env.NEXT_PUBLIC_SITE_URL!
    : process.env.VERCEL_URL;

  const protocol = process.env.DEV_PROTOCOL ? "" : "https://";

  return (protocol + baseURL + path).toString();
}