// @ts-nocheck

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
// import { isMobile } from "react-device-detect";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import DashboardLayout from "../src/components/DashboardLayout";
import styles from "./../styles/pages/Template.module.scss";
import { template } from "./../src/helpers/imageTemplate";
import { exportAsImage, getCookie, saveImage } from "../src/helpers/common";
import { useRouter } from "next/router";
import { app, database } from "./../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Modal from "react-modal";
import whatsapp from "./../public/whatsapp.png";
import facebook from "./../public/facebook.png";
import twitter from "./../public/twitter.png";
import moment from "moment";
import Error from "../src/components/common/Error";
export default function Template() {
  const router = useRouter();
  const toastId = React.useRef(null);
  const toastId2 = React.useRef(null);
  const toastId3 = React.useRef(null);
  const toastId4 = React.useRef(null);
  const exportRef: any = useRef<HTMLDivElement>();
  const [idData, setIdData]: any = useState();
  const [platform, setPlatform]: any = useState();
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
  const [randomWord, setRandomWord]: any = useState(false);
  const [randomResult, setRandomResult]: any = useState([]);
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
    if (data?.sender_name?.length >= 50 && !toast.isActive(toastId.current)) {
      toastId.current = toast("Nama Pengirim Melebihi Batas");
    }
    if (data?.receive_name?.length >= 50 && !toast.isActive(toastId2.current)) {
      toastId2.current = toast("Nama Penerima Melebihi Batas");
    }
    if (data?.question?.length >= 100 && !toast.isActive(toastId3.current)) {
      toastId3.current = toast("Pertanyaan Melebihi Batas");
    }
    if (data?.answer?.length >= 100 && !toast.isActive(toastId4.current)) {
      toastId4.current = toast("Jawaban Melebihi Batas");
    }
  }, [data]);

  useEffect(() => {
    const getDeviceType = () => {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
      }
      if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua
        )
      ) {
        return "mobile";
      }
      return "desktop";
    };
    setPlatform(getDeviceType);
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

  const handleSave = () => {
    if (
      dataCookie !== undefined &&
      randomizeNumber !== undefined &&
      data !== undefined
    ) {
      addDoc(dbInstance, {
        isReceiptVisible: !showForm,
        isSenderVisible: !senderShowForm,
        created_at: moment().unix(),
        fake_text: dataCookie?.result,
        message_id: randomizeNumber,
        original_text: dataCookie?.original,
        randomize_text: randomWord ? randomResult : "",
        receive_from: showForm ? "********" : data?.receive_name,
        original_receive_from: data?.receive_name,
        secure_answer: data?.answer?.toLowerCase(),
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
    if (randomizeNumber !== undefined) {
      // setClone(false);
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
      window?.ReactNativeWebView?.postMessage("tes");
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

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  useEffect(() => {
    if (randomWord) {
      const newData = randomResult;

      let tmp = dataCookie?.result.split(" ");
      let result = shuffle(tmp);
    }
  }, [randomWord, dataCookie]);

  const handleRandom = () => {
    let data: any = document.querySelector("#random_word");
    data?.checked;
    setRandomWord(data?.checked);
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
    handleSave();
    setSaveTemplate(!saveTemplate);
  };

  useEffect(() => {
    if (randomizeNumber) {
      // console.log(randomizeNumber.toString());
    }
  }, [randomizeNumber]);

  return (
    <DashboardLayout pageTitle="Pilih Template">
      <div className={styles.wrapperTemplate}>
        <div>
          <div>
            <div className={styles.label}>Pengirim</div>
            <input
              onChange={handleChange}
              className={styles.inputSender}
              id="sender_name"
              name="sender_name"
              placeholder="Nama mu siapa?"
              maxLength="50"
            />

            <div className={`${styles.showCheck} ${styles.marginBottom}`}>
              <input
                onChange={handleCheckSender}
                type="checkbox"
                id="sender"
                name="sender"
              />
              <label htmlFor="sender">Sembunyikan Pengirim</label>
            </div>
            <div className={styles.label}>Penerima</div>
            <input
              onChange={handleChange}
              className={styles.inputSender}
              id="receive_name"
              name="receive_name"
              placeholder="Penerima suratnya siapa?"
              maxLength="50"
            />
            <div className={`${styles.showCheck} ${styles.marginBottom}`}>
              <input
                onChange={handleCheck}
                type="checkbox"
                id="receive"
                name="receive"
              />
              <label htmlFor="receive">Sembunyikan Penerima</label>
            </div>
          </div>
          <div className={styles.label}>Pertanyaan Untuk Penerima</div>
          <input
            onChange={handleChange}
            className={`${styles.inputSender} ${styles.marginBottom}`}
            id="question"
            name="question"
            maxLength="100"
            placeholder="Masukkin pertanyaan untuk dia"
          />
          <div className={styles.label}>Jawaban</div>
          <input
            onChange={handleChange}
            className={`${styles.inputSender} ${styles.marginBottom}`}
            id="answer"
            name="answer"
            maxLength="100"
            placeholder="Masukkin jawabannya juga ya"
          />
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
                  <div className={styles.subtitle}>Letter {index + 1}</div>
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
                <div className={styles.letterId}>
                  ID :{" "}
                  {randomizeNumber !== undefined &&
                    randomizeNumber
                      ?.toString()
                      ?.replace(/(\d{3})(\d{3})/, "$1-$2")}
                </div>
                <div className={styles.letterText}>
                  Dari : {senderShowForm ? "******" : data?.sender_name}
                </div>
                <div className={styles.letterForText}>
                  Untuk : {showForm ? "******" : data?.receive_name}
                </div>
                <div className={styles.templateText}>
                  {randomWord ? randomResult.join(" ") : dataCookie.result}
                </div>
                <div className={styles.templateUrl}>
                  Download Kamus Nostalgia di playstore dan masukkan ID :{" "}
                  {randomizeNumber !== undefined &&
                    randomizeNumber
                      ?.toString()
                      ?.replace(/(\d{3})(\d{3})/, "$1-$2")}{" "}
                  dan temukan artinya!
                </div>
              </div>
              <div className={styles.wrapperMain}>
                <div className={styles.wrapperButton}>
                  <button
                    disabled={data !== undefined ? false : true}
                    onClick={handleDownload}
                    className={styles.buttonSave}
                  >
                    Download!
                  </button>
                  {platform === "desktop" && (
                    <button
                      disabled={data !== undefined ? false : true}
                      onClick={handleShare}
                      className={`${styles.buttonSave} ${styles.outlineButton}`}
                    >
                      Share!
                    </button>
                  )}
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
            disabled={
              templateData[idData] === undefined ||
              data?.sender_name?.length > 50 ||
              data?.receive_name?.length > 50 ||
              data?.question?.length > 100 ||
              data?.answer?.length > 100
                ? true
                : false
            }
            onClick={handlePreview}
          >
            Lihat Surat
          </button>
        </div>
      </div>
      <div>
        <ToastContainer
          position="bottom-center"
          newestOnTop
          pauseOnFocusLoss={false}
        />
      </div>
    </DashboardLayout>
  );
}
