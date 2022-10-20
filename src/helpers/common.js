import html2canvas from "html2canvas";


export const convertWord = (tmp, setValue, type) => {

    let convertNonVocalAlpha = tmp.split(/[aeiou]/gi);
    let convertVocalAlpha = tmp.match(/[aeiou]/gi);
    let resultConvert;

    if (convertVocalAlpha === undefined || convertVocalAlpha === null) {
        resultConvert += tmp;
    } else {
        if (type == "u") {

            const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

            let nangReplace;
            let remainingTextNya;
            let remainingText;
            let nangConvert;
            let syllabelWord;
            let firstConvert;
            let lengthWord;
            let nang;

            nang = "nang";
            syllabelWord = [];
            lengthWord = tmp.split(" ");

            for (let i = 0; i <= lengthWord.length; i++) {
                if (lengthWord) {
                    syllabelWord.push(syllabify(lengthWord[i]));
                }
            }

            for (let i = 0; i <= syllabelWord?.length; i++) {
                if (syllabelWord[i]?.length) {
                    let positionConvert = syllabelWord[i]?.length - 1;
                    let positionConvertTwo = syllabelWord[i]?.length - 2;

                    if (syllabelWord[i][positionConvert]?.match(/[aeiou]/gi)?.length === 2) {
                        nangReplace = syllabelWord[i][positionConvert]?.match(/[aeiou]/gi)[1];
                    } else {
                        nangReplace = syllabelWord[i][positionConvert]?.match(/[aeiou]/gi)
                    }

                    firstConvert = syllabelWord[i][positionConvert]?.replace(syllabelWord[i][positionConvert].match(/[aeiou]/gi), "a")

                    nangConvert = nang?.replace(nang?.match(/[aeiou]/gi), syllabelWord[i][positionConvert]?.match(/[aeiou]/gi) === null ? "a" : nangReplace);

                    remainingText = syllabelWord[i].map((item, index) => {
                        return (
                            index + 1 !== syllabelWord[i]?.length ? item : ''
                        )
                    });

                    remainingTextNya = syllabelWord[i].map((item, index) => {
                        return (
                            index + 1 !== positionConvert && index + 1 !== positionConvert - 0 ? item : ''
                        )
                    });

                    if (syllabelWord[i]?.length === 1) {
                        resultConvert += type + firstConvert + nangConvert + ' ';
                    } else if (syllabelWord[i]?.length === 2) {
                        resultConvert += type + firstConvert + syllabelWord[i][0] + nangConvert + ' ';
                    } else if (syllabelWord[i]?.length > 2 && !syllabelWord[i].includes("nya")) {
                        resultConvert += type + firstConvert + remainingText.join('') + nangConvert + ' ';
                    } else if (syllabelWord[i].includes("nya") && syllabelWord[i]?.length > 3) {
                        resultConvert += type + syllabelWord[i][positionConvertTwo] + remainingTextNya.join('') + nang + syllabelWord[i][positionConvert] + ' ';
                    } else if (syllabelWord[i].includes("nya") && syllabelWord[i]?.length === 3) {
                        resultConvert += type + syllabelWord[i][2] + syllabelWord[i][0] + nang + syllabelWord[i][positionConvert] + ' ';
                    }
                }
            }

            function syllabify(words) {
                return words?.match(syllableRegex);
            }

        } else {

            for (let i = 0; i <= convertNonVocalAlpha.length; i++) {
                for (let j = 0; j <= 0; j++) {
                    resultConvert +=
                        convertNonVocalAlpha[i] +
                        convertVocalAlpha[i] +
                        type +
                        convertVocalAlpha[i];
                }
            }

        }
    }
    let result = resultConvert?.split('undefined')
    setValue(result[1]);
}

export const exportAsImage = async (element, imageFileName) => {
    const html = document.getElementsByTagName("html")[0];
    const body = document.getElementsByTagName("body")[0];
    let htmlWidth = html.clientWidth;
    let bodyWidth = body.clientWidth;

    const newWidth = element.scrollWidth - element.clientWidth;

    if (newWidth > element.clientWidth) {
        htmlWidth += newWidth;
        bodyWidth += newWidth;
    }

    html.style.width = htmlWidth + "px";
    body.style.width = bodyWidth + "px";

    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png", 1.0);
    const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;

        fakeLink.href = blob;

        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);

        fakeLink.remove();
    };

    downloadImage(image, imageFileName);

    html.style.width = null;
    body.style.width = null;

}

/** READ COOKIE */
export function getCookie(cname) {
    if (typeof document === "undefined") return;
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/** CREATE COOKIE */
export function setCookie(cname, cvalue, exdays) {
    if (typeof document === "undefined") return;
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/** DELETE COOKIE */
export function deleteCookie(cname) {
    if (typeof document === "undefined") return;
    let expires = "expires=" + "01 Jan 1970 00:00:00";
    document.cookie = cname + "=" + "" + ";" + expires + ";path=/";
}