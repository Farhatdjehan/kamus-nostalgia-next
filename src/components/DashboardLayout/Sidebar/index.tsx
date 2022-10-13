import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./Sidebar.module.scss";
import { ReactNode, useEffect, useState } from "react";
import copy from "./../../../../public/copy.png";
import Link from "next/link";
import Modal from "react-modal";
import logoCompany from "./../../../../public/assets/png/logoCompany.png";
import Image from "next/image";

interface SidebarProps {
  toggle: boolean;
  handleToggle: any;
}

export default function Sidebar(props: SidebarProps) {
  const { toggle, handleToggle } = props;
  const [copied, setCopied]: any = useState(false);
  const [share, setShare]: any = useState(false);

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

  return (
    <aside className={styles.sidebar}>
      <ProSidebar breakPoint="xxl" toggled={toggle} onToggle={handleToggle}>
        <SidebarContent>
          <Menu className={`menu`}>
            <MenuItem>
              Beri Masukkan
              <Link href="#">
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
              <Link href="#">
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
              <CopyToClipboard
                text="https://kamus-nostalgia.vercel.app"
                onCopy={handleCopy}
              >
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
