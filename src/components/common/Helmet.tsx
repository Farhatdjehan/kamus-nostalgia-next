import Head from "next/head";

interface HelmetProps {
  pageTitle: string;
}

export default function Helmet(props: HelmetProps) {
  const { pageTitle } = props;
  return (
    <>
      <Head>
        <title>Kamus Nostalgia - Translator Bahasa G | {pageTitle}</title>
        <meta name="description" content="Kamnos by Koneksi Group" />
        <meta name="image" content="https://i.ibb.co/M7Ncnpr/logo-kamus.png" />
        <meta property="og:url" content="https://kamus-nostalgia.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kamus Nostalgia - Translator Bahasa G | Kamus Nostalgia"/>
        <meta property="og:description" content="Kamnos by Koneksi Group" />
        <meta property="og:image" content="https://i.ibb.co/M7Ncnpr/logo-kamus.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kamus Nostalgia - Translator Bahasa G | Kamus Nostalgia"/>
        <meta name="twitter:description" content="Kamnos by Koneksi Group" />
        <meta name="twitter:image" content="https://i.ibb.co/M7Ncnpr/logo-kamus.png"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
