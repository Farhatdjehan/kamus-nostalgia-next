import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "../src/components/DashboardLayout";
import styles from "./../styles/pages/Template.module.scss";
import { template } from "./../src/helpers/imageTemplate";
import { exportAsImage, getCookie } from "../src/helpers/common";
import { useRouter } from "next/router";
import Modal from "react-modal";

export default function Template() {
  const router = useRouter();
  const exportRef: any = useRef<HTMLDivElement>();
  const [idData, setIdData]: any = useState();
  const [saveTemplate, setSaveTemplate]: any = useState();
  const [dataCookie, setDataCookie]: any = useState();
  const [templateData, setTemplateData]: any = useState([]);

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
      width: "350px",
    },
  };

  useEffect(() => {
    if (getCookie("dataTemplate") !== "") {
      let tmp = getCookie("dataTemplate");
      if (tmp !== undefined) {
        setDataCookie(JSON.parse(tmp));
      }
    }
  }, []);

  useLayoutEffect(() => {
    console.log(exportRef?.current); // { current: <h1_object> }
  });

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < template?.length; i++) {
      //   console.log("<");
      arr.push(template[i]);
      setTemplateData(arr);
    }
  }, []);

  const handleSelected = (e: any, index: any) => {
    e.preventDefault();
    setIdData(index);
  };

  const save = (file: string, fileName: string) => {
    const linkSource = `${file}`;
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const dataURLtoFile = (dataurl: any, filename: any) => {
    let atobData: any = atob;
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = window.atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {
      type: mime,
    });
  };

  return (
    <DashboardLayout pageTitle="Pilih Template">
      <div className={styles.wrapperTemplate}>
        <div>
          <div className={styles.mainTitle}>Pilih Template</div>
          <div className={styles.mainSubtitle}>
            Pilih salah satu template yang ada!
          </div>
        </div>
        <div className={styles.wrapperCard}>
          {template.map((item, index) => {
            return (
              <div onClick={(e) => handleSelected(e, index)} key={index}>
                <div className={styles.selectorCard}>
                  {idData === index && (
                    <div className={styles.selected}>Pilih</div>
                  )}
                  <div className={styles.thumbnail}>
                    <Image
                      src={item}
                      objectFit="cover"
                      width={300}
                      height={420}
                      layout="responsive"
                    />
                  </div>
                  <div className={styles.title}>Template {index + 1}</div>
                  <div className={styles.subtitle}>Love Letter</div>
                </div>
              </div>
            );
          })}
        </div>

        <Modal
          isOpen={saveTemplate}
          onRequestClose={() => setSaveTemplate(false)}
          style={customStyles}
        >
          {templateData[idData] && (
            <div ref={exportRef} className={styles.wrapperImage}>
              <div className={styles.templateImage}>
                <Image
                  src={templateData[idData]}
                  objectFit="cover"
                  width={300}
                  height={420}
                  layout="responsive"
                />
              </div>
              <div className={styles.templateText}>{dataCookie}</div>
              <button
                className={styles.buttonSave}
                disabled={templateData[idData] !== undefined ? false : true}
                onClick={() =>
                  exportAsImage(exportRef?.current, `Love Letter 1`)
                }
              >
                Simpan
              </button>
            </div>
          )}
        </Modal>

        <div>
          <button onClick={() => setSaveTemplate(!saveTemplate)}>
            Lihat Surat
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}