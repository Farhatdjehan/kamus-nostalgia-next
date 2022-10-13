import { ProSidebar, SidebarContent, Menu, MenuItem } from "react-pro-sidebar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./Sidebar.module.scss";
import { useEffect, useState } from "react";
import copy from "./../../../../public/copy.png";
import whatsapp from "./../../../../public/whatsapp.png";
import facebook from "./../../../../public/facebook.png";
import twitter from "./../../../../public/twitter.png";
import Link from "next/link";
import Modal from "react-modal";
import Image from "next/image";

interface SidebarProps {
  toggle: boolean;
  handleToggle: any;
}

export default function Sidebar(props: SidebarProps) {
  const { toggle, handleToggle } = props;
  const [copied, setCopied]: any = useState(false);
  const [share, setShare]: any = useState(false);

  const url = "https://kamus-nostalgia.vercel.app";

  useEffect(() => {
    if (copied) {
      setTimeout(function () {
        setCopied(false);
      }, 2000);
    }
    console.log(copied);
  }, [copied]);

  const shareLink = (e: any) => {
    e.preventDefault();
    setShare(true);
    handleToggle(false);
  };

  const handleCopy = () => {
    setCopied(true);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "16px",
      zIndex: 2,
    },
  };

  const handleShare = (socmed: string) => {
    let share;
    if (socmed === "Facebook") {
      share = `https://www.facebook.com/sharer/sharer.php?u=${url}&amp;src=sdkpreparse`;
    } else if (socmed === "Twitter") {
      share = `http://twitter.com/share?text=Nostalgia+yuk%2C+&url=${url}&hashtags=nostalgia,kamus,bahasagaul90an,kamnos`;
    } else {
      share = `https://wa.me/?text=Nostalgia+yuk%2C+${url}`;
    }
    window.open(share, "_blank")?.focus();
  };

  return (
    <aside className={styles.sidebar}>
      <ProSidebar breakPoint="xxl" toggled={toggle} onToggle={handleToggle}>
        <SidebarContent>
          <Menu className={`menu`}>
            <MenuItem>
              Beri Masukkan
              <Link href="https://form.asana.com/?k=bAQOG6X_k7d0HA6cZjOfLA&d=1200494741159113">
                <a></a>
              </Link>
            </MenuItem>
            <MenuItem onClick={shareLink}>
              Bagikan Aplikasi
              <Link href="#">
                <a></a>
              </Link>
            </MenuItem>
            <MenuItem>
              Nilai Aplikasi
              <Link href="https://play.google.com/store/apps/details?id=com.koneksi.kamnos">
                <a></a>
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
      {share && (
        <>
          <Modal
            isOpen={share}
            onRequestClose={() => setShare(false)}
            contentLabel="Example Modal"
            style={customStyles}
          >
            <div className="sharelink">Bagikan Aplikasi</div>
            <div>
              <CopyToClipboard text={url} onCopy={handleCopy}>
                <button
                  className={`main-screen__button ${
                    copied && "animate__animated animate__pulse animate__faster"
                  }`}
                >
                  <span style={{ marginRight: "8px" }}>
                    <Image width={15} height={15} src={copy.src} alt="copy" />
                  </span>
                  Bagikan Kamus Nostalgia
                </button>
              </CopyToClipboard>
            </div>
            <div className="or-text">ATAU</div>
            <div className="wrapper-btn">
              <button
                className="btn twitter"
                onClick={() => handleShare("Twitter")}
              >
                <span style={{ marginRight: "8px" }}>
                  <Image width={15} height={15} src={twitter.src} alt="copy" />
                </span>
                Twitter
              </button>
              <button
                className="btn facebook"
                onClick={() => handleShare("Facebook")}
              >
                <span style={{ marginRight: "8px" }}>
                  <Image width={15} height={15} src={facebook.src} alt="copy" />
                </span>
                Facebook
              </button>
              <button
                className="btn whatsapp"
                onClick={() => handleShare("Whatsapp")}
              >
                <span style={{ marginRight: "8px" }}>
                  <Image width={15} height={15} src={whatsapp.src} alt="copy" />
                </span>
                Whatsapp
              </button>
            </div>
          </Modal>
          {copied && (
            <div className="main-screen__toast animate__animated animate__bounceInUp animate__faster">
              <div className="toast-text">Berhasil menyalin!</div>
            </div>
          )}
        </>
      )}
    </aside>
  );
}
