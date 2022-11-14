import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Banner from "../../Banner";
export default function FooterMobile() {
  const handleRedirect = (id: any) => {
    let share;
    if (id === 1) {
      share =
        "https://play.google.com/store/apps/details?id=com.influencer.konekita";
    } else {
      share =
        "https://play.google.com/store/apps/details?id=com.koneksi.konekios";
    }
    window.open(share, "_blank")?.focus();
  };
  return (
    <>
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={2000}
      >
        <Banner
          text="Ingin Bekarya atau Menikmati Karya?"
          product="Konekita"
          color="#6151A2"
          handleRedirect={() => handleRedirect(1)}
        />
        <Banner
          text="Buat Website Gratis Kurang Dari 1 Menit?"
          product="Konekios"
          color="#8D95FE"
          handleRedirect={() => handleRedirect(2)}
        />
      </Carousel>
    </>
  );
}
