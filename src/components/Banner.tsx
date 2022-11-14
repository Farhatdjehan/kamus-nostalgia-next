import s from "./DashboardLayout/FooterMobile/FooterMobile.module.scss";
import footer from "./../../public/assets/png/footer.png";
import Image from "next/image";

interface TextProps {
  text: string;
  product: string;
  color: string;
  handleRedirect: any;
}
export default function Banner(props: TextProps) {
  const { text, product, color, handleRedirect } = props;

  return (
    <div onClick={handleRedirect} className={s.footerContainer}>
      <div className={s.left}>
        <div style={{ backgroundColor: `${color}` }} className={s.logo}>
          <div className={s.word}>K</div>
        </div>
        <div className={s.text}>{text}</div>
      </div>
      <div style={{ backgroundColor: `${color}` }} className={s.right}>
        <div className={s.title}>Download {product} Sekarang!</div>
        <div className={s.img}>
          <Image src={footer} width={80} height={25} />
        </div>
      </div>
    </div>
  );
}
