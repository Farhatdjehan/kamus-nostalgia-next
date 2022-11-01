import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "../src/components/DashboardLayout";
import styles from "./../styles/pages/Template.module.scss";
import { template } from "./../src/helpers/imageTemplate";
import { exportAsImage, getCookie } from "../src/helpers/common";
import { useRouter } from "next/router";
import axios from "axios";
import Modal from "react-modal";

export default function Template() {
  const router = useRouter();
  const exportRef: any = useRef<HTMLDivElement>();
  const [idData, setIdData]: any = useState();
  const [saveTemplate, setSaveTemplate]: any = useState();
  const [dataCookie, setDataCookie]: any = useState();
  const [link, setLink]: any = useState();
  const [json, setJson]: any = useState();
  const [data, setData]: any = useState();
  const [showForm, setShowForm]: any = useState(false);
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
    let tmp: any = {
      id: 1,
      pengirim: {
        id: 1,
        nama: "",
      },
      penerima: {
        id: 1,
        nama: "",
        isVisible: false,
      },
      content: "",
      template_id: "",
    };

    tmp.pengirim.nama = data?.sender;
    tmp.penerima.nama = data?.receive_name;
    tmp.penerima.isVisible = showForm;
    tmp.content = dataCookie;
    tmp.template_id = 1;

    if (saveTemplate) {
      setJson(tmp);
    }
  }, [saveTemplate, dataCookie]);

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
      arr.push(template[i]);
      setTemplateData(arr);
    }
  }, []);

  const handleSelected = (e: any, index: any) => {
    e.preventDefault();
    setIdData(index);
  };

  // const save = (file: string, fileName: string) => {
  //   const linkSource = `${file}`;
  //   const downloadLink = document.createElement("a");
  //   document.body.appendChild(downloadLink);
  //   downloadLink.href = linkSource;
  //   downloadLink.download = fileName;
  //   downloadLink.click();
  // };

  // const dataURLtoFile = (dataurl: any, filename: any) => {
  //   let atobData: any = atob;
  //   var arr = dataurl.split(","),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = window.atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   return new File([u8arr], filename, {
  //     type: mime,
  //   });
  // };

  const handleChange = (e: any) => {
    e.preventDefault();
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const handleCheck = (e: any) => {
    let data: any = document.querySelector("#receive");
    data?.checked;
    setShowForm(data?.checked);
  };

  const fetchData = async (value: string) => {
    try {
      const response = await axios(
        `https://api.shrtco.de/v2/shorten?url=${value}`
      );
      setLink(response.data.result.full_short_link);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData("https://kamus-nostalgia.vercel.app/preview?id=1&template-id=1");
  }, []);

  return (
    <DashboardLayout pageTitle="Pilih Template">
      <input id="browse" type="file" multiple />
      <div className={styles.wrapperTemplate}>
        <div>
          <div className={styles.label}>Pengirim Surat</div>
          <input
            onChange={handleChange}
            className={styles.inputSender}
            id="sender"
            name="sender"
            placeholder="Masukkin nama kamu disini"
          />
          <div className={styles.label}>Penerima Surat</div>
          <input
            onChange={handleChange}
            className={styles.inputSender}
            id="receive_name"
            name="receive_name"
            placeholder="Masukkin nama penerima disini"
          />
          <div className={styles.showCheck}>
            <input
              onChange={handleCheck}
              type="checkbox"
              id="receive"
              name="receive"
            />
            <label htmlFor="receive">Sembunyikan Penerima?</label>
          </div>
        </div>

        <div className={styles.mainTitle}>Pilih Template</div>

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
            <>
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
                {/* <div className={styles.letterId}>ID : 1</div> */}
                <div className={styles.letterText}>Dari : {data?.sender}</div>
                <div className={styles.letterForText}>
                  Untuk : {showForm ? "******" : data?.receive_name}
                </div>
                <div className={styles.templateText}>{dataCookie}</div>
              </div>
              {/* <button
                className={styles.buttonSave}
                disabled={templateData[idData] !== undefined ? false : true}
                onClick={() =>
                  exportAsImage(
                    exportRef?.current,
                    json,
                    `Surat Untuk Kamu - ${data?.sender}`
                  )
                }
              > */}
              <a
                className={styles.buttonSave}
                href={`https://web.whatsapp.com/send?text=Hai,%20Aku%20ada%20sesuatu%20untuk%20kamu!.%20Cek%20link%20ini%20:%20${link}`}
                // onClick={() =>
                //   exportAsImage(
                //     exportRef?.current,
                //     `Surat Untuk Kamu - ${data?.sender}`
                //   )
                // }
              >
                Share
              </a>
              {/* </button> */}
            </>
          )}
        </Modal>

        <div className={styles.wrapperSee}>
          <button
            disabled={templateData[idData] !== undefined ? false : true}
            onClick={() => setSaveTemplate(!saveTemplate)}
          >
            Lihat Surat
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
