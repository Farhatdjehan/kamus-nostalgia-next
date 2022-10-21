import styles from "./Header.module.scss";
import Link from "next/link";
import BellSvg from "./../../../../public/assets/svg/bell.svg";
import SearchSvg from "./../../../../public/assets/svg/search.svg";
import ChevronDown from "./../../../../public/assets/svg/chevron-down.svg";
import logoCompanyWhite from "./../../../../public/assets/png/logoCompanyWhite.png";
import logoPelindoWhite from "./../../../../public/assets/png/logoPelindoWhite.svg";
import HamburgerSvg from "./../../../../public/assets/svg/hamburger.svg";
import Image from "next/image";
import { useRouter } from "next/router";

interface HeaderProps {
  handleToggle: any;
  landing?: boolean;
}

export default function Header(props: HeaderProps) {
  const { handleToggle, landing } = props;
  const router = useRouter();
  const src = `https://satukelas-fe-asset.ap-south-1.linodeobjects.com/profile1.png`;
  let pathname = router.asPath.split("/");

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.mobile}>
          <div className={styles.logoWrapper}>
            {pathname[1] === "template" && (
              <div style={{ fontWeight: 600 }} onClick={handleBack}>
                {"<"}
              </div>
            )}
            {/* <div className="main-screen__title">Kamnos</div> */}
            {/* <Image src={logoCompanyWhite} alt={``} height={24} /> */}
          </div>
          <div onClick={() => handleToggle(true)} className={styles.hamburger}>
            <Image src={HamburgerSvg} alt={``} />
          </div>
        </div>
      </header>
    </>
  );
}
