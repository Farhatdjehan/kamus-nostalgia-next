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
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
