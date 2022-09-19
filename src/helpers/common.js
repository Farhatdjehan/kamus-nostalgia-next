
// import ReactGA from "react-ga";

const gaTrackingID = "G-VRQXV82CTZ";



// export function googleAnalytics() {
//     // send to google analytics
//     const _hostname = window.location.hostname;
//     const _pathname = window.location.pathname;
//     const _location = _hostname + _pathname.slice(1);
//     ReactGA.initialize(gaTrackingID);
//     var ga = ReactGA.ga();

//     ga("set", "hostname", _hostname);
//     ga("set", "page", _pathname);
//     ga("set", "location", _location);
//     ga("send", "pageview");
//     // ga("send", { hitType: "pageview", page: _pathname });
// }

export const convertWord = (tmp, setValue, type) => {

    let convertNonVocalAlpha = tmp.split(/[aeiou]/gi);
    let convertVocalAlpha = tmp.match(/[aeiou]/gi);
    let resultConvert;
    if (convertVocalAlpha === undefined || convertVocalAlpha === null) {
        resultConvert += tmp;
    } else {
        if (type == "u") {

            const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

            function syllabify(words) {
                return words.match(syllableRegex);
            }

            let syllabelWord = syllabify(tmp);

            let firstConvert = syllabelWord[1]?.replace(syllabelWord[1].match(/[aeiou]/gi), "a");
            let nang = "nang";
            let nangConvert = nang?.replace(nang?.match(/[aeiou]/gi), syllabelWord[1]?.match(/[aeiou]/gi) === null ? "a" : syllabelWord[1]?.match(/[aeiou]/gi));

            if (syllabelWord?.length === 2) {
                resultConvert += type + firstConvert + syllabelWord[0] + nangConvert;
            } else if (syllabelWord?.length > 2 && !syllabelWord.includes("nya")) {
                resultConvert += type + firstConvert + syllabelWord[2] + syllabelWord[0] + nangConvert;
            } else if (syllabelWord.includes("nya") && syllabelWord?.length > 3) {
                resultConvert += type + syllabelWord[2] + syllabelWord[0] + syllabelWord[1] + nang + syllabelWord[3];
            } else if (syllabelWord.includes("nya") && syllabelWord?.length === 3) {
                resultConvert += type + syllabelWord[1] + syllabelWord[0] + nang + syllabelWord[3];
            }
            console.log(resultConvert, syllabelWord);

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
    setValue(resultConvert?.split('undefined'));
}