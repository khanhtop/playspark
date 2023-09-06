import Head from "next/head";

export default function Pong({ data }) {
  return (
    <>
      <Head>
        <ins
          class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-1479162116573574"
          data-ad-slot="2133028769"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </Head>
      <div
        style={{ backgroundColor: data?.primaryColor, color: data?.textColor }}
        className={`h-full w-full`}
      >
        <div className="absolute top-0 left-0 w-full h-24 bg-white/20 flex items-center justify-center">
          <p>Branding Banner Goes Here</p>
        </div>
        {/* Game Goes Here */}
      </div>
    </>
  );
}
