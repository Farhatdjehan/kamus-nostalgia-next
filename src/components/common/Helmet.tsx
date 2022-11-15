import Head from "next/head";

interface HelmetProps {
  pageTitle: string;
}

export default function Helmet(props: HelmetProps) {
  const { pageTitle } = props;

  return (
    <>
      <Head>
        <title>Surat Rahasia - Biarkan si Dia Tau Isi Hati Kamu!  | {pageTitle}</title>
        <meta
          name="description"
          content="Malu buat ngomong langsung tentang sesuatu ke si dia? buat surat rahasia aja!"
        />
        <meta name="image" content="https://i.ibb.co/M7Ncnpr/logo-kamus.png" />
        <meta property="og:url" content="https://kamus-nostalgia.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`Surat Rahasia - Biarkan si Dia Tau Isi Hati Kamu! | ${pageTitle}`}
        />
        <meta
          property="og:description"
          content="Malu buat ngomong langsung tentang sesuatu ke si dia? buat surat rahasia aja!"
        />
        <meta property="og:image" content="https://i.ibb.co/fXwrq61/logo-surat.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Surat Rahasia - Biarkan si Dia Tau Isi Hati Kamu! | ${pageTitle}`}
        />
        <meta
          name="twitter:description"
          content="Malu buat ngomong langsung tentang sesuatu ke si dia? buat surat rahasia aja!"
        />
        <meta
          name="twitter:image"
          content="https://i.ibb.co/fXwrq61/logo-surat.png"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
