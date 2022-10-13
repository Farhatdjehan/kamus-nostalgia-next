/* eslint-disable */
// @ts-nocheck

import React, { useEffect, useState } from "react";
import { convertWord } from "../src/helpers/common";
import { CopyToClipboard } from "react-copy-to-clipboard";
import sound from "./../public/sound.png";
import "animate.css";
import copy from "./../public/copy.png";
import Image from "next/image";
import swap from "./../public/swap.png";
import swapWhite from "./../public/swap_white.png";
import DashboardLayout from "../src/components/DashboardLayout";
import { useRouter } from "next/router";
import Link from "next/link";

const MainScreen = () => {
  const convertWordList = ["G", "S", "P", "U"];
  const router = useRouter();
  const [text, setText]: any = useState();
  const [platform, setPlatform]: any = useState();
  const [originalText, setOriginalText]: any = useState();
  const [copied, setCopied]: any = useState(false);
  const [reverseShow, setReverseShow]: any = useState(false);
  const [reverseShowUpdate, setReverseShowUpdate]: any = useState(false);
  const [disable, setDisable]: any = useState(false);
  const [animationCopy, setAnimationCopy]: any = useState(false);
  const [animationSound, setAnimationSound]: any = useState(false);
  const [reverse, setReverse]: any = useState();
  const [reverseUpdated, setReverseUpdated]: any = useState();
  const [indexSelected, setIndexSelected]: any = useState(0);
  const [keyValue, setKeyValue]: any = useState(0);
  const [voice, setVoice]: any = useState();
  const [languangeType, setLanguangeType]: any = useState();

  console.log(router);

  useEffect(() => {
    setLanguangeType(convertWordList[indexSelected]?.toLowerCase());
  }, [indexSelected]);

  useEffect(() => {
    if (text) {
      convertWord(originalText, setText, languangeType);
    }
  }, [indexSelected, originalText, languangeType, disable]);

  useEffect(() => {
    if (copied) {
      setTimeout(function () {
        setCopied(false);
        setAnimationCopy(false);
        setAnimationSound(false);
      }, 2000);
    }
  }, [copied]);

  useEffect(() => {
    let kamnos = document.querySelectorAll("#kamnos");
    setTimeout(() => {
      if (kamnos.length > 0) {
        setKeyValue(keyValue + 1);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (text !== undefined) {
      if (reverseShow) {
        let reset: any = document.getElementById("input");
        reset.value = text;
        setReverse(originalText);
      } else {
        let reset: any = document.getElementById("input");
        reset.value = originalText;
      }
    }
  }, [reverseShow, text, originalText]);

  const speechHandler = (msgT: any) => {
    if (reverse === undefined && text === undefined) {
      setCopied(true);
      setAnimationSound(true);
    } else {
      let msg = new SpeechSynthesisUtterance();
      msg.lang = "id-ID";
      msg.text = msgT;
      if ("speechSynthesis" in window) {
        window.speechSynthesis.speak(msg);
      }
      setAnimationSound(true);
    }
  };

  function getOperatingSystem(window: any) {
    let operatingSystem = "Not known";
    if (window.navigator.appVersion.indexOf("Win") !== -1) {
      operatingSystem = "Windows OS";
    }
    if (window.navigator.appVersion.indexOf("Mac") !== -1) {
      operatingSystem = "MacOS";
    }
    if (window.navigator.appVersion.indexOf("Android") !== -1) {
      operatingSystem = "Android";
    }
    if (window.navigator.appVersion.indexOf("X11") !== -1) {
      operatingSystem = "UNIX OS";
    }
    if (window.navigator.appVersion.indexOf("Linux") !== -1) {
      operatingSystem = "Linux OS";
    }

    return operatingSystem;
  }

  useEffect(() => {
    console.log(
      window.navigator.appVersion.indexOf("Android") !== -1,
      window.navigator.appVersion.indexOf("Linux") !== -1
    );
  }, []);

  const OS = (window) => {
    return getOperatingSystem(window); // <-- missing return
  };
  useEffect(() => {
    if (reverseShow) {
      window?.ReactNativeWebView?.postMessage(reverse);
    } else {
      window?.ReactNativeWebView?.postMessage(text);
    }
  }, [reverseShow, reverse, text]);

  useEffect(() => {
    setPlatform(OS(window));
  }, []);

  useEffect(() => {}, [platform]);

  const handleChange = (e) => {
    let tmp = e.target.value;

    if (reverseShow) {
      if (languangeType !== "u") {
        if (tmp !== "") {
          let tmpReverse = tmp;
          let resultConvert;

          let convertNonVocalAlpha = tmpReverse.split(/[aeiou]/gi);
          let convertVocalAlpha = tmpReverse.match(/[aeiou]/gi);

          if (convertVocalAlpha === undefined || convertVocalAlpha === null) {
            resultConvert += tmpReverse;
          } else {
            for (let i = 0; i <= convertNonVocalAlpha.length; i += 2) {
              for (let j = 0; j <= 0; j++) {
                resultConvert += convertNonVocalAlpha[i] + convertVocalAlpha[i];
              }
            }
            let final = resultConvert?.split("NaN");
            let resultFinal = final[0].split("undefined");
            setReverse(resultFinal[1]);
          }
        } else {
          setReverse();
        }
      } else {
        let syllabelWord;
        let lengthWord;
        let resultConvertU;

        syllabelWord = [];

        lengthWord = tmp.split(" ");

        const syllableRegex =
          /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

        function syllabify(words) {
          return words?.match(syllableRegex);
        }

        for (let i = 0; i <= lengthWord.length; i++) {
          if (lengthWord) {
            syllabelWord.push(syllabify(lengthWord[i]));
          }
        }

        for (let i = 0; i <= syllabelWord?.length; i++) {
          if (syllabelWord[i]?.length) {
            let remainingTextNya;
            let positionConvert;
            let lastWord;
            let changeWord;
            let convertWord;

            positionConvert = syllabelWord[i]?.length - 2;

            remainingTextNya = syllabelWord[i].map((item, index) => {
              return index > 1 && index + 1 !== syllabelWord[i]?.length
                ? item
                : "";
            });

            lastWord = syllabelWord[i][1]?.match(/[aeiou]/gi);

            changeWord =
              syllabelWord[i][syllabelWord[i]?.length - 1]?.match(/[aeiou]/gi);

            convertWord = syllabelWord[i][1]?.replace(lastWord, changeWord);

            resultConvertU += remainingTextNya.join("") + convertWord + " ";

            setReverse(resultConvertU?.split("undefined"));
          }
        }
      }
    } else {
      setOriginalText(tmp);
      if (tmp !== "") {
        convertWord(tmp, setText, languangeType);
      } else {
        setText();
      }
    }
  };

  const reverseWord = () => {
    setReverseShow(!reverseShow);
    // setText();
  };

  const handleSound = () => {
    setSound(true);
  };

  const handleSelect = (e) => {
    setIndexSelected(e.target.id);
  };

  const handleReset = () => {
    let reset = document.getElementById("input");
    reset.value = "";
    setText();
  };

  const handleCopy = () => {
    setCopied(true);
    setAnimationCopy(true);
  };

  return (
    <DashboardLayout pageTitle="Kamus Nostalgia">
      <div key={keyValue} id="kamnos" className="main-screen__dictionary">
        <div className="main-screen__container">
          <div className="main-screen__input">
            <input
              disabled={disable ? disable : false}
              type="text"
              id="input"
              placeholder="Masukkan Kata"
              name="input"
              onChange={handleChange}
              autoFocus
            />
            {text && (
              <div className="main-screen__times" onClick={handleReset}>
                ×
              </div>
            )}
            {reverse && (
              <div className="main-screen__times" onClick={handleReset}>
                ×
              </div>
            )}
          </div>
          <div className="main-screen__selector">
            <div className="main-screen__selector-label">
              Translate Ke Bahasa Apa?
            </div>
            <div className="main-screen__selector-container">
              {convertWordList.map((item, index) => {
                return (
                  <div
                    id={index}
                    key={index}
                    onClick={handleSelect}
                    className={`main-screen__selector-input ${
                      indexSelected == index &&
                      "main-screen__active animate__animated animate__pulse animate__faster"
                    }`}
                  >
                    {item}
                    {indexSelected == index && (
                      <span className="active-label">Bahasa {item}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="main-screen__result">
          <div className="main-screen__result-wrapper">
            <div className="main-screen__result-label">Hasil :</div>

            <div
              className={`main-screen__result-reverse ${
                reverseShow &&
                "active-reverse animate__animated animate__pulse animate__faster"
              }`}
              onClick={reverseWord}
            >
              Reverse{"  "}
              {reverseShow ? (
                <Image src={swapWhite} width={18} height={8} />
              ) : (
                <Image src={swap} width={18} height={8} />
              )}
            </div>
          </div>
          <div className="main-screen__result-convert">
            {reverseShow ? reverse : text}
          </div>
          <div className="main-screen__copy">
            {router?.asPath.split("?")[1] !== "mobile" && (
              <div id="button-sound">
                <button
                  className={`${
                    animationSound &&
                    "animate__animated animate__pulse animate__faster"
                  }`}
                  onClick={() => speechHandler(reverseShow ? reverse : text)}
                >
                  <span style={{ marginRight: "4px" }}>
                    <img width={15} height={15} src={sound.src} />
                  </span>
                  Suara
                </button>
              </div>
            )}
            <CopyToClipboard
              text={reverseShow ? reverse : text}
              onCopy={handleCopy}
            >
              <button
                className={`main-screen__button ${
                  animationCopy &&
                  "animate__animated animate__pulse animate__faster"
                }`}
              >
                <span style={{ marginRight: "4px" }}>
                  <img width={15} height={15} src={copy.src} />
                </span>
                Salin
              </button>
            </CopyToClipboard>
          </div>
          {copied && (
            <div className="main-screen__toast animate__animated animate__bounceInUp animate__faster">
              <div className="toast-text">
                {reverse === undefined || text === undefined
                  ? "Masukkan Kata Dulu!"
                  : "Berhasil menyalin!"}
              </div>
            </div>
          )}
          {disable && (
            <div className="main-screen__toast">
              <div className="toast-text">
                Fitur Membuat Kalimat Belum Tersedia!
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MainScreen;
