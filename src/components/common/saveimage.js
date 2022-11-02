import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  AsyncStorage,
  Modal,
  Text,
  Pressable,
  PermissionsAndroid,
  Platform,
} from "react-native";
import ToolBar from "../../../../component/ToolBar";
import AppText from "../../../../component/Text";
import styleApp from "../../../../../res/style/style";
import { sizeFont, sizeWidth, sizeHeight } from "../../../../util/Size";
import IconCircleButton from "../../../../component/IconCircleButton";
import NavigationActions from "../../../../router/NavigationActions";
import Svg from "react-native-svg";
import ShapePainted from "../../../../component/ShapePainted";
import Button from "../../../../component/Button";
import { strings } from "../../../../config/i18n/i18n";
import {
  NUMBER_SACLE,
  NUMBER_PATH,
  ANIMALS_DATA,
  OBJECTS_DATA,
} from "../../../../../Constant";
import ViewShot from "react-native-view-shot";
import RNFetchBlob from "rn-fetch-blob";
import CameraRoll from "@react-native-community/cameraroll";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Toast from "react-native-toast-message";
var RNFS = require("react-native-fs");

import { inject, observer } from "mobx-react";
@inject("paintStore")
@observer
export default class LetPaintingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      videoUrl: "",
      gifPosition: "imageGifPot",
    };
  }

  // async componentDidMount() {
  //   await this.requestCameraPermission();
  // }

  render() {
    const { navigation } = this.props;
    const { modalVisible, videoUrl, gifPosition } = this.state;
    const item = navigation.getParam("item");
    const paint = navigation.getParam("paint");
    const char = navigation.getParam("char");
    numberScale =
      this.props.paintStore.pNumber * this.props.paintStore.numberScale;
    numberPath =
      this.props.paintStore.pNumber * this.props.paintStore.numberPath;

    return (
      <View style={styles.container}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image style={styles[gifPosition]} source={videoUrl} />
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() =>
                    this.setState({
                      gifPosition:
                        gifPosition === "imageGifPot"
                          ? "imageGifLand"
                          : "imageGifPot",
                    })
                  }
                >
                  <Text style={styles.textStyleModal}>
                    {gifPosition === "imageGifPot" ? "Landscape" : "Potrait"}
                  </Text>
                </Button>
                <Button
                  style={[styles.button, styles.buttonClose]}
                  onPress={() =>
                    this.setState({
                      modalVisible: false,
                    })
                  }
                >
                  <Text style={styles.textStyleModal}>Close</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        <Image
          style={styles.backgroundImage}
          source={require("../../../../../res/images_paint/background/paintedscreen.jpg")}
        />
        {this.renderToolbar()}
        <View
          style={{
            height: sizeHeight(100),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.contentHeader}>
            <Image
              style={{
                resizeMode: "contain",
                width: sizeWidth(62.5),
              }}
              source={require("../../../../../res/images_paint/buttons/finish_2x.png")}
            />
          </View>

          <View style={styles.contentImage}>
            <ViewShot
              // ref="svgElement"
              ref={(input) => (this.svgElement = input)}
              options={{
                format: "jpg",
                quality: 0.9,
                result: Platform.OS === "ios" ? "data-uri" : "base64",
              }}
            >
              <Svg
                width={item.size.width * numberScale}
                height={item.size.height * numberScale}
              >
                {item.data.map((itemData, index) => (
                  <ShapePainted
                    numberScale={numberScale}
                    numberPath={numberPath}
                    paint={paint}
                    data={itemData}
                    idPath={itemData.number - 1}
                    id={item.id}
                    name={item.name}
                    mau={""}
                    isPaint={false}
                    key={index}
                  />
                ))}
              </Svg>
            </ViewShot>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: sizeHeight(3),
              }}
            >
              <Button
                onPress={() => this.onPressTakePhoto(char)}
                style={styles.button_save}
                text={strings("common.take")}
                textStyle={[styles.textStyle, { color: "white" }]}
                iconLeft={require("../../../../../res/images_paint/buttons/savep.png")}
                iconLeftStyle={{
                  height: sizeWidth(3),
                  width: sizeWidth(3),
                  marginRight: sizeWidth(1.5),
                }}
              />
              <Button
                onPress={() => this.onPressShowVideo(item, paint)}
                style={styles.button_take}
                text={strings("common.showVideo")}
                textStyle={styles.textStyle}
                iconLeft={require("../../../../../res/images_paint/buttons/video.png")}
                iconLeftStyle={{
                  height: sizeWidth(5),
                  width: sizeWidth(5),
                  marginRight: sizeWidth(1),
                }}
              />
            </View>
          </View>

          <View style={styles.contentColor}>
            {/*<Button
                onPress={() => this.onPressTakePhoto(item)}
                style={styles.button_take}
                text={strings("common.take")}
                iconLeft = {require("../../../../../res/images_paint/buttons/camera_2x.png")}
            />*/}
            <Button
              onPress={() => this.onPressNextPainting(item, paint, char)}
              style={styles.button_next}
              text={strings("common.nextPainting")}
              textStyle={{ fontSize: sizeFont(3.5) }}
              iconLeftStyle={{
                height: sizeWidth(4),
                width: sizeWidth(4),
              }}
              iconLeft={require("../../../../../res/images_paint/buttons/nextp.png")}
            />
            <Button
              onPress={() => NavigationActions.navigate("Paint")}
              style={styles.button_choose}
              text={strings("common.chooseCharacter")}
              textStyle={{ fontSize: sizeFont(3.5) }}
              iconLeftStyle={{
                height: sizeWidth(4),
                width: sizeWidth(4),
              }}
              iconLeft={require("../../../../../res/images_paint/buttons/choose.png")}
            />
          </View>
        </View>
      </View>
    );
  }

  async onPressTakePhoto(char) {
    const per = await this.requestCameraPermission();
    if (per) {
      this.svgElement.capture().then((uri) => {
        if (Platform.OS === "ios") {
          CameraRoll.save(uri, { type: "photo", album: "ChaCha" })
            .then((res) => {
              console.log(res);
              Toast.show({
                type: "success",
                text1: "Image saved!",
                text2: res,
                position: "bottom",
              });
            })
            .catch((err) => {
              console.log(err);
              Toast.show({
                type: "error",
                text1: "Failed to save image",
                text2: err,
                position: "bottom",
              });
            });
        } else {
          const dirs = RNFetchBlob.fs.dirs;
          const Chacha = dirs.DCIMDir;

          // console.log(dirs);

          // RNFetchBlob.fs.mkdir(Chacha + "/.Chacha").catch((err) => {});

          var path = `/${char}${Math.round(new Date().getTime() / 1000)}.jpg`;
          RNFS.writeFile(
            Chacha + path,
            RNFetchBlob.base64.encode(uri),
            "base64"
          )
            .then(async (success) => {
              console.log(success, "ssss");
              try {
                await CameraRoll.save(Chacha + path);
                // RNFetchBlob.fs.unlink(Chacha + "/.Chacha" + path);
                console.log("File : ", res);
              } catch (error) {
                console.log("Error : ", error);
              }
            })
            .catch((error) => {
              console.log("sdsad", error);
            });
        }
      });
    }
  }

  async requestCameraPermission() {
    if (Platform.OS === "ios") {
      const res = await request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(
        (result) => {
          return result === RESULTS.GRANTED;
        }
      );
      return res;
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "App Camera Permission",
            message: "Chacha Drawing App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "No",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log("request granted");
          return true;
        } else {
          // console.log("request rejected");
          return false;
        }
      } catch (err) {
        // console.log("request error", err);
        return false;
      }
    }
  }

  onPressNextPainting(item, paint, char) {
    DATA = paint === "Animals" ? ANIMALS_DATA : OBJECTS_DATA;
    currentIndex = DATA.findIndex((letter) => letter.id == item.id);
    if (char === "fireman") {
      currentIndex = DATA.findIndex((letter) => letter.id == item.id);
      if (currentIndex === 5) {
        nextItem = DATA[0];
      } else {
        nextItem = DATA[currentIndex + 1];
      }
    } else if (char === "constructorman") {
      currentIndex = DATA.findIndex((letter) => letter.id == item.id);
      if (currentIndex === 12) {
        nextItem = DATA[6];
      } else {
        nextItem = DATA[currentIndex + 1];
      }
    } else {
      currentIndex = DATA.findIndex((letter) => letter.id == item.id);
      if (currentIndex === DATA.length - 1) {
        nextItem = DATA[0];
      } else {
        nextItem = DATA[currentIndex + 1];
      }
    }

    NavigationActions.navigate("LetNewPaint", {
      paint: nextItem.paint,
      item: nextItem,
      currentIndex: currentIndex,
      needIndexFromNavigation: true,
      isNumber: false,
      studiedAlphabet: [],
      studiedNumber: [],
    });
  }
  onPressShowVideo(item, paint) {
    DATA = paint === "Animals" ? ANIMALS_DATA : OBJECTS_DATA;
    currentIndex = DATA.findIndex((letter) => letter.id == item.id) + 1;
    let url = "";
    if (paint === "Animals") {
      switch (currentIndex) {
        case 1:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_2269641374923453.gif",
          };
          break;
        case 2:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_6608082358366503.gif",
          };
          break;
        case 3:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_2797129643240578.gif",
          };
          break;
        case 4:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_1356029837686357.gif",
          };
          break;
        case 5:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_2369102977992867.gif",
          };
          break;
        case 6:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_2512730492730152.gif",
          };
          break;
      }
    } else {
      switch (currentIndex) {
        case 1:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_4878923296172384.gif",
          };
          break;
        case 2:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_2802851250418047.gif",
          };
          break;
        case 3:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_1331129111746293.gif",
          };
          break;
        case 4:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_2866841139193485.gif",
          };
          break;
        case 5:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_5826824728797062.gif",
          };
          break;
        case 6:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_2566112250290144.gif",
          };
          break;
        case 7:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_3201565672908671.gif",
          };
          break;
        case 8:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_2154605740264553.gif",
          };
          break;
        case 9:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_2503454205299487.gif",
          };
          break;
        case 10:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_2092773795874556.gif",
          };
          break;
        case 11:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_1564534851461165.gif",
          };
          break;
        case 12:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_5731667516779754.gif",
          };
          break;
        case 13:
          url = {
            uri: "https://satukelas-assignments.ap-south-1.linodeobjects.com/us79215453_5731667516779754.gif",
          };
          break;
      }
    }
    this.setState({
      videoUrl: url,
      modalVisible: true,
    });
  }

  renderToolbar = () => {
    return (
      <ToolBar
        right={this.renderToolbarRight()}
        center={<AppText style={styleApp.ToolBarText}></AppText>}
      />
    );
  };

  renderToolbarRight = () => {
    return (
      <IconCircleButton
        onPress={() => this.onPressHome()}
        styleButton={{
          marginRight: sizeWidth(5),
        }}
        source={require("../../../../../res/images_paint/buttons/home.png")}
      />
    );
  };

  onPressHome = () => {
    NavigationActions.navigate("Main");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  button_take: {
    width: sizeWidth(30),
    backgroundColor: "#FEDC00",
    marginLeft: sizeWidth(1),
  },
  button_save: {
    width: sizeWidth(30),
    backgroundColor: "#0D4D99",
    marginRight: sizeWidth(1),
  },
  button_next: {
    width: sizeWidth(55),
    paddingVertical: sizeWidth(1),
    backgroundColor: "#0B763C",
    marginBottom: sizeHeight(1),
  },
  button_choose: {
    width: sizeWidth(55),
    paddingVertical: sizeWidth(1),
    backgroundColor: "#0D4D99",
    marginTop: sizeHeight(1),
  },
  contentImage: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: sizeHeight(49),
    width: Platform.OS === "ios" ? sizeWidth(95) : sizeWidth(80),
    backgroundColor: "#fff",
    borderRadius: sizeWidth(3),
    paddingHorizontal: sizeWidth(2),
    paddingTop: sizeWidth(3),
  },
  contentColor: {
    height: sizeHeight(20),
    width: sizeWidth(90.5),
    marginBottom: sizeHeight(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contentHeader: {
    marginTop: sizeHeight(-5),
    width: sizeWidth(90.5),
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
  },
  fireworks_left: {
    resizeMode: "center",
  },
  fireworks_right: {
    resizeMode: "center",
  },
  textStyle: {
    fontSize: sizeFont(3.5),
    color: "#111",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#11111155",
  },
  modalView: {
    backgroundColor: "#11111155",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: sizeHeight(100),
    width: sizeWidth(100),
  },
  loadingContainer: {
    backgroundColor: "white",
    height: "auto",
    width: "auto",
    position: "absolute",
    padding: 8,
    zIndex: -1,
  },
  loadingText: { textAlign: "center" },
  button: {
    borderRadius: sizeWidth(3),
    padding: sizeWidth(2),
    marginHorizontal: sizeWidth(2),
    elevation: 2,
    bottom: 0,
    width: sizeWidth(30),
  },
  buttonOpen: {
    backgroundColor: "#3bbf4f",
  },
  buttonClose: {
    backgroundColor: "#bf3b3b",
  },
  textStyleModal: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: sizeFont(4),
    fontWeight: "bold",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: sizeHeight(5),
    display: "flex",
    flexDirection: "row",
  },
  imageGifPot: {
    width: sizeWidth(100),
    height: sizeHeight(100),
    resizeMode: "contain",
    // zIndex: 1
    // transform: [{ rotate: "90deg" }],
  },
  imageGifLand: {
    height: sizeWidth(100),
    width: sizeHeight(100),
    resizeMode: "contain",
    // zIndex: 1,
    transform: [{ rotate: "90deg" }],
  },
});
