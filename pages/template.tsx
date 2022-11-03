// @ts-nocheck

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "../src/components/DashboardLayout";
import styles from "./../styles/pages/Template.module.scss";
import { template } from "./../src/helpers/imageTemplate";
import { exportAsImage, getCookie, saveImage } from "../src/helpers/common";
import { useRouter } from "next/router";
import { app, database } from "./../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import axios from "axios";
import Modal from "react-modal";
import whatsapp from "./../public/whatsapp.png";
import facebook from "./../public/facebook.png";
import twitter from "./../public/twitter.png";
import moment from "moment";
export default function Template() {
  const router = useRouter();
  const exportRef: any = useRef<HTMLDivElement>();
  const [idData, setIdData]: any = useState();
  const [randomDataCookie, setRandomDataCookie]: any = useState();
  const [saveTemplate, setSaveTemplate]: any = useState();
  const [randomizeNumber, setRandomizeNumber]: any = useState();
  const [share, setShare]: any = useState(false);
  const [socialMedia, setSocialMedia]: any = useState();
  const [dataCookie, setDataCookie]: any = useState();
  const [desktop, setDesktop]: any = useState();
  const [dataImage, setDataImage]: any = useState();
  const [link, setLink]: any = useState();
  const [json, setJson]: any = useState();
  const [data, setData]: any = useState();
  const [showForm, setShowForm]: any = useState(false);
  const [clone, setClone]: any = useState(false);
  const [senderShowForm, setSenderShowForm]: any = useState(false);
  const [idMessages, setIdMessages]: any = useState();
  const [templateData, setTemplateData]: any = useState([]);
  const [dataList, setDataList]: any = useState();

  useEffect(() => {
    getNotes();
  }, []);

  const dbInstance = collection(database, "messages_list");

  const getNotes = () => {
    getDocs(dbInstance).then((data) => {
      setDataList(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
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

  useEffect(() => {
    if (link) {
      router.push(link);
    }
  }, [link]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < template?.length; i++) {
      arr.push(template[i]);
      setTemplateData(arr);
    }
  }, []);

  useEffect(() => {
    if (data?.sender === undefined && data?.receiver === undefined) {
      setSaveTemplate(false);
    }
  }, [data]);

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

  const handleCheckSender = (e: any) => {
    let data: any = document.querySelector("#sender");
    data?.checked;
    setSenderShowForm(data?.checked);
  };

  const handleCheck = (e: any) => {
    // e.preventDefault();
    let data: any = document.querySelector("#receive");
    data?.checked;
    setShowForm(data?.checked);
  };

  const fetchData = async (value: string, id: number) => {
    try {
      const response = await axios(
        `https://api.shrtco.de/v2/shorten?url=${value}`
      );
      if (response !== undefined) {
        let data;
        if (id === 1) {
          data = `https://wa.me/?text=Hai,%20Aku%20ada%20sesuatu%20untuk%20kamu!.%20Cek%20link%20ini%20:%20${response.data.result.full_short_link}`;
        } else if (id === 2) {
          data = `http://twitter.com/share?text=Hai,%20Aku%20ada%20sesuatu%20untuk%20kamu!.%20Cek%20link%20ini%20:%20${response.data.result.full_short_link}`;
        } else {
          data = `https://www.facebook.com/sharer/sharer.php?u=${response.data.result.full_short_link}&amp;src=sdkpreparse`;
        }
        setLink(data);
      }
    } catch (e) {
      console.log(e, "<==");
    }
  };

  const handleSave = () => {
    // setSocialMedia(id);
    if (dataCookie !== undefined) {
      addDoc(dbInstance, {
        isReceiptVisible: !showForm,
        isSenderVisible: !senderShowForm,
        created_at: moment().unix(),
        fake_text: dataCookie?.result,
        message_id: randomizeNumber,
        original_text: dataCookie?.original,
        randomize_text: "",
        receive_from: showForm ? "********" : data?.receive_name,
        original_receive_from: data?.receive_name,
        secure_answer: data?.answer.toLowerCase(),
        secure_question: data?.question,
        send_to: senderShowForm ? "********" : data?.sender_name,
        original_send_to: data?.sender_name,
        template_id: idData,
      }).then((value: any) => {
        // fetchData(
        //   `https://kamus-nostalgia.vercel.app/preview?id=${value._key.path.segments[1]}`,
        //   id
        // );
        // setIdMessages(value._key.path.segments[1]);
        // router.reload();
      });
    }
  };

  useEffect(() => {
    if (share && dataImage !== undefined) {
      shareNav();
    }
  }, [share, dataImage]);

  useEffect(() => {
    if (randomizeNumber !== undefined && clone === false) {
      setClone(false);
      handleSave();
    }
  }, [randomizeNumber]);

  useEffect(() => {
    if ((desktop || share) && dataImage !== undefined) {
      window?.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: "download",
          url: dataImage,
        })
      );
    } else {
      window?.ReactNativeWebView?.postMessage();
    }
  }, [desktop, dataImage, share]);

  useEffect(() => {
    if (
      saveTemplate &&
      dataList &&
      dataList
        .map((item: any) => item.message_id)
        .indexOf(parseInt(randomizeNumber)) !== -1
    ) {
      randomize();
    }
  }, [dataList, saveTemplate]);

  useEffect(() => {
    if (saveTemplate) {
      randomize();
    }
  }, [saveTemplate]);

  const shareNav = async () => {
    const blob = await (await fetch(dataImage)).blob();
    const file = new File([blob], "surat_kamu.png", { type: blob.type });
    // if (navigator.canShare({ dataImage })) {
    try {
      await navigator.share({
        title: "Hello",
        text: "Aku punya sesuatu untuk mu!",
        files: [file],
      });
      setShare(false);
    } catch (error) {
      setShare(false);
      // output.textContent = `Error: ${error.message}`;
    }
  };

  const handleShare = (e: any) => {
    e.preventDefault();
    exportAsImage(exportRef?.current, setDataImage);
    setShare(true);
  };

  const handleDownload = () => {
    saveImage(exportRef?.current, "Surat");
    exportAsImage(exportRef?.current, setDataImage);
    setDesktop(true);
  };

  const randomize = () => {
    let tmpNumb;
    tmpNumb = Math.floor(Math.random() * 1000000);
    setRandomizeNumber(tmpNumb);
  };

  const handlePreview = () => {
    // handleSave();
    setSaveTemplate(!saveTemplate);
  };

  return (
    <DashboardLayout pageTitle="Pilih Template">
      <div className={styles.wrapperTemplate}>
        <div>
          <div>
            <div className={styles.label}>Pengirim Surat</div>
            <input
              onChange={handleChange}
              className={styles.inputSender}
              id="sender_name"
              name="sender_name"
              placeholder="Nama mu siapa?"
            />
            <div className={`${styles.showCheck} ${styles.marginBottom}`}>
              <input
                onChange={handleCheckSender}
                type="checkbox"
                id="sender"
                name="sender"
              />
              <label htmlFor="sender">Sembunyikan Pengirim?</label>
            </div>
            <div className={styles.label}>Penerima Surat</div>
            <input
              onChange={handleChange}
              className={styles.inputSender}
              id="receive_name"
              name="receive_name"
              placeholder="Penerima suratnya siapa?"
            />
            <div className={`${styles.showCheck} ${styles.marginBottom}`}>
              <input
                onChange={handleCheck}
                type="checkbox"
                id="receive"
                name="receive"
              />
              <label htmlFor="receive">Sembunyikan Penerima?</label>
            </div>
          </div>
          <div className={styles.label}>Pertanyaan Untuk Penerima Surat</div>
          <input
            onChange={handleChange}
            className={`${styles.inputSender} ${styles.marginBottom}`}
            id="question"
            name="question"
            placeholder="Masukkin pertanyaan untuk dia"
          />
          <div className={styles.label}>Jawaban Pertanyaan</div>
          <input
            onChange={handleChange}
            className={`${styles.inputSender} ${styles.marginBottom}`}
            id="answer"
            name="answer"
            placeholder="Masukkin jawabannya juga ya"
          />
          <div className={styles.wrap}>
            <div className={styles.label}>Mau Acak Suratnya?</div>
            <label className={`${styles.label} ${styles.random_label}`}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
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
                <div className={styles.letterId}>ID : {randomizeNumber}</div>
                <div className={styles.letterText}>
                  Dari : {senderShowForm ? "******" : data?.sender}
                </div>
                <div className={styles.letterForText}>
                  Untuk : {showForm ? "******" : data?.receive_name}
                </div>
                <div className={styles.templateText}>{dataCookie.result}</div>
                <div className={styles.templateUrl}>
                  Mau tau artinya? download Kamus Nostalgia di playstore dan
                  masukkin ID : {randomizeNumber}
                </div>
              </div>
              <div className={styles.wrapperMain}>
                <div className={styles.wrapperButton}>
                  <button
                    onClick={handleDownload}
                    className={styles.buttonSave}
                  >
                    Download!
                  </button>
                  <button onClick={handleShare} className={styles.buttonSave}>
                    Share!
                  </button>
                  {/* <div
                    className={styles.buttonSave}
                    onClick={(e) => handleSave(e, 1)}
                  >
                    <Image
                      width={15}
                      height={15}
                      src={whatsapp.src}
                      alt="copy"
                    />
                  </div> */}
                  {/* <div
                    className={styles.buttonSave}
                    onClick={(e) => handleSave(e, 2)}
                  >
                    <Image
                      width={15}
                      height={15}
                      src={twitter.src}
                      alt="copy"
                    />
                  </div>
                  <div
                    className={styles.buttonSave}
                    onClick={(e) => handleSave(e, 3)}
                  >
                    <Image
                      width={15}
                      height={15}
                      src={facebook.src}
                      alt="copy"
                    />
                  </div> */}
                </div>
              </div>
            </>
          )}
        </Modal>

        <div className={styles.wrapperSee}>
          <button
            disabled={templateData[idData] !== undefined ? false : true}
            onClick={handlePreview}
          >
            Lihat Surat
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
