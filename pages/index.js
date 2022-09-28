/* eslint-disable */
import React, { useEffect, useState } from "react";
import { convertWord } from "../src/helpers/common";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SayButton } from 'react-say';
import sound from './../public/sound.png';
import copy from './../public/copy.png';

const MainScreen = () => {
    const convertWordList = ["G", "S", "P", "U"];
    const [text, setText] = useState();
    const [originalText, setOriginalText] = useState();
    const [copied, setCopied] = useState(false);
    const [disable, setDisable] = useState(false);
    const [indexSelected, setIndexSelected] = useState(0);
    const [keyValue, setKeyValue] = useState(0);
    const [languangeType, setLanguangeType] = useState();

    useEffect(() => {
    }, [])

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

    // useEffect(() => {
    //     if (disable) {
    //         setTimeout(function () { setDisable(false) }, 2000);
    //     }
    // }, [disable]);

    useEffect(() => {

    }, [])

    useEffect(() => {
        let kamnos = document.querySelectorAll("#kamnos");
        setTimeout(() => {
            if (kamnos.length > 0) {
                setKeyValue(keyValue + 1);
            }
        }, 1000);
    }, []);

    useEffect(() => {
    }, [disable, languangeType])

    const handleChange = (e) => {
        // if (disable && languangeType === 'u') {
        //     return false
        // } else {
        let tmp = e.target.value;

        setOriginalText(tmp);
        if (tmp !== '') {
            convertWord(tmp, setText, languangeType);
        } else {
            setText();
        }
        // }
    }

    const handleSound = () => {
        setSound(true);
    }

    const handleKeyDown = (e) => {
        // if (e.key === ' ' && e.keyCode === 32 && languangeType === 'u') {
        //     setDisable(true);
        // }
    }

    const handleSelect = (e) => {
        setIndexSelected(e.target.id);
    }

    const handleReset = () => {
        let reset = document.getElementById('input');
        reset.value = "";
        setText();
        // setDisable(false);
    }


    return (
        <div key={keyValue} id="kamnos" className="main-screen__dictionary">
            <div className="main-screen__container">
                <div className="main-screen__title">
                    Kamnos
                </div>
                <div className="main-screen__input">
                    <input disabled={disable ? disable : false} type="text" id="input" placeholder="Masukkan Kata" name="input" onChange={handleChange} onKeyDown={handleKeyDown} autoFocus />
                    {text &&
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
                <div className="main-screen__result-label">
                    Hasil :
                </div>
                <div className="main-screen__result-convert">
                    {text && text[1]}
                </div>
                <div className="main-screen__copy">
                    <div id="button-sound">
                        <SayButton
                            id="test"
                            onClick={event => console.log(event)}
                            speak={text && text[1]}
                        >
                            <span style={{ marginRight: '4px' }}><img width={15} height={15} src={sound.src} /></span>
                            Suara
                        </SayButton>
                    </div>
                    <CopyToClipboard text={text && text[1]}
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
