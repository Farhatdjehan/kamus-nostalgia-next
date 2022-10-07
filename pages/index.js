/* eslint-disable */
import React, { useEffect, useState } from "react";
import { convertWord } from "../src/helpers/common";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SayButton } from 'react-say';
import sound from './../public/sound.png';
import copy from './../public/copy.png';
import Speech from 'react-text-to-speech';
import Image from "next/image";
import swap from './../public/swap.png';
import swapWhite from './../public/swap_white.png';

const MainScreen = () => {
    const convertWordList = ["G", "S", "P", "U"];
    const [text, setText] = useState();
    const [originalText, setOriginalText] = useState();
    const [copied, setCopied] = useState(false);
    const [reverseShow, setReverseShow] = useState(false);
    const [reverseShowUpdate, setReverseShowUpdate] = useState(false);
    const [disable, setDisable] = useState(false);
    const [reverse, setReverse] = useState();
    const [reverseUpdated, setReverseUpdated] = useState();
    const [indexSelected, setIndexSelected] = useState(0);
    const [keyValue, setKeyValue] = useState(0);
    const [languangeType, setLanguangeType] = useState();

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
            setTimeout(function () { setCopied(false) }, 2000);
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
                let reset = document.getElementById('input');
                reset.value = text;
                setReverse(originalText);
            } else {
                let reset = document.getElementById('input');
                reset.value = originalText;
            }
        }
        console.log(text);
    }, [reverseShow, text, originalText])

    const handleChange = (e) => {

        let tmp = e.target.value;

        if (reverseShow) {
            if (languangeType !== "u") {
                if (tmp !== '') {

                    let tmpReverse = tmp;
                    let resultConvert;

                    let convertNonVocalAlpha = tmpReverse.split(/[aeiou]/gi);
                    let convertVocalAlpha = tmpReverse.match(/[aeiou]/gi);

                    if (convertVocalAlpha === undefined || convertVocalAlpha === null) {
                        resultConvert += tmpReverse;
                    } else {
                        for (let i = 0; i <= convertNonVocalAlpha.length; i += 2) {
                            for (let j = 0; j <= 0; j++) {
                                resultConvert +=
                                    convertNonVocalAlpha[i] +
                                    convertVocalAlpha[i]

                            }
                        }
                        let final = resultConvert?.split('NaN');
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

                const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

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
                            return index > 1 && index + 1 !== syllabelWord[i]?.length ? item : ''
                        });

                        lastWord = syllabelWord[i][1]?.match(/[aeiou]/gi);

                        changeWord = syllabelWord[i][syllabelWord[i]?.length - 1]?.match(/[aeiou]/gi);

                        convertWord = syllabelWord[i][1]?.replace(lastWord, changeWord);

                        resultConvertU += remainingTextNya.join('') + convertWord + ' ';

                        setReverse(resultConvertU?.split('undefined'));

                    }
                }
            }
        } else {
            setOriginalText(tmp);
            if (tmp !== '') {
                convertWord(tmp, setText, languangeType);
            } else {
                setText();
            }
        }
    }

    const reverseWord = () => {

        setReverseShow(!reverseShow);
        // setText();
    }

    const handleSound = () => {
        setSound(true);
    }

    const handleSelect = (e) => {
        setIndexSelected(e.target.id);
    }

    const handleReset = () => {
        let reset = document.getElementById('input');
        reset.value = "";
        setText();
    }

    const startBtn = <button className="main-screen__button">Suara</button>

    return (
        <div key={keyValue} id="kamnos" className="main-screen__dictionary">
            <div className="main-screen__container">
                <div className="main-screen__title">
                    Kamnos
                </div>
                <div className="main-screen__input">
                    <input disabled={disable ? disable : false} type="text" id="input" placeholder="Masukkan Kata" name="input" onChange={handleChange} autoFocus />
                    {text &&
                        <div className="main-screen__times" onClick={handleReset}>×</div>}
                    {reverse &&
                        <div className="main-screen__times" onClick={handleReset}>×</div>}
                </div>
                <div className="main-screen__selector">
                    <div className="main-screen__selector-label">
                        Tipe Bahasa
                    </div>
                    <div className="main-screen__selector-container">
                        {convertWordList.map((item, index) => {
                            return (
                                <>
                                    <div id={index} key={index} onClick={handleSelect} className={` main-screen__selector-input ${indexSelected == index && 'main-screen__active'}`}>
                                        {item}
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="main-screen__result">
                <div className="main-screen__result-wrapper">
                    <div className="main-screen__result-label">
                        Hasil :
                    </div>

                    <div className={`main-screen__result-reverse ${reverseShow && 'active-reverse'}`} onClick={reverseWord}>
                        Reverse{"  "}
                        {reverseShow ? <Image src={swapWhite} width={18} height={8} /> : <Image src={swap} width={18} height={8} />}
                    </div>

                </div>
                <div className="main-screen__result-convert">
                    {reverseShow ? reverse : text}
                </div>
                <div className="main-screen__copy">

                    {/* <div id="button-sound">
                        <SayButton
                                id="test"
                                onClick={event => console.log(event)}
                                speak={text[1]}
                            >
                                <span style={{ marginRight: '4px' }}><img width={15} height={15} src={sound.src} /></span>
                                Suara
                            </SayButton> 
                        <Speech text={text && text[1]} startBtn={startBtn} />
                    </div> */}
                    <CopyToClipboard text={reverseShow ? reverse : text}
                        onCopy={() => setCopied(true)}>
                        <button className="main-screen__button">
                            <span style={{ marginRight: '4px' }}><img width={15} height={15} src={copy.src} /></span>Salin</button>
                    </CopyToClipboard>
                </div>
                {copied &&
                    <div className="main-screen__toast">
                        <div className="toast-text">
                            Berhasil menyalin!
                        </div>
                    </div>
                }
                {disable &&
                    <div className="main-screen__toast">
                        <div className="toast-text">
                            Fitur Membuat Kalimat Belum Tersedia!
                        </div>
                    </div>
                }
            </div>

        </div >
    );
};

export default MainScreen;
