import Head from "next/head";

interface HelmetProps {
  pageTitle: string;
}

export default function Helmet(props: HelmetProps) {
  const { pageTitle } = props;

  const image = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHNJREFUKFOdkLEKwCAMRM/JwUFwdPb/v8RPEDcdBQcHJyUt0hQ6hGY6Li8XEhVjXM45aK3xVXNOtNagcs6LRAgB1toX23tHSgkUpEopyxhzGRw+EHljjBv03oM3KJYP1lofkJoHJs3T/4Gi1aJjxO+RPnwDur2EF1gNZukAAAAASUVORK5CYII=`;

  return (
    <>
      <Head>
        <title>Kamus Nostalgia - Translator Bahasa G | {pageTitle}</title>
        <meta
          name="description"
          content="Nostalgia bersama bahasa G yang sempet booming yuk!"
        />
        <meta name="image" content="https://i.ibb.co/M7Ncnpr/logo-kamus.png" />
        <meta property="og:url" content="https://kamus-nostalgia.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`Kamus Nostalgia - Translator Bahasa G | ${pageTitle}`}
        />
        <meta
          property="og:description"
          content="Nostalgia bersama bahasa G yang sempet booming yuk!"
        />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Kamus Nostalgia - Translator Bahasa G | ${pageTitle}`}
        />
        <meta
          name="twitter:description"
          content="Nostalgia bersama bahasa G yang sempet booming yuk!"
        />
        <meta
          name="twitter:image"
          content="https://i.ibb.co/M7Ncnpr/logo-kamus.png"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
