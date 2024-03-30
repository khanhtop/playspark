import { useRouter } from "next/router";
import Head from "next/head";

export default function PWA({ children }) {
  // Get the current route using the useRouter hook
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <Head>{/* Dynamically set the start_url in the manifest */}</Head>
      {children}
    </>
  );
}
