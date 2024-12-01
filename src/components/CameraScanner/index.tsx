import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { RNHoleView } from "react-native-hole-view";
import {
  Camera,
  CameraRuntimeError,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/native";
import { deviceWidth, deviceHeight, isIos } from "../../utils/helpers";
import { useAppStateListener } from "./hook";
import IconButtonWrapper from "../IconButtonWrapper";
import { Images } from "../../theme";

interface ICameraScannerProps {
  setIsCameraShown: (value: boolean) => void;
  onReadCode: (value: string) => void;
}

export const CameraScanner = ({
  setIsCameraShown,
  onReadCode,
}: ICameraScannerProps) => {
  const device = useCameraDevice("back");
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const [isCameraInitialized, setIsCameraInitialized] = useState(isIos);
  const [isActive, setIsActive] = useState(isIos);
  const [flash, setFlash] = useState<"on" | "off">(isIos ? "off" : "on");
  const { appState } = useAppStateListener();
  const [codeScanned, setCodeScanned] = useState("");

  useEffect(() => {
    if (codeScanned) {
      onReadCode(codeScanned);
    }
  }, [codeScanned, onReadCode]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isCameraInitialized) {
      timeout = setTimeout(() => {
        setIsActive(true);
        setFlash("off");
      }, 1000);
    }
    setIsActive(false);
    return () => {
      clearTimeout(timeout);
    };
  }, [isCameraInitialized]);

  const onInitialized = () => {
    setIsCameraInitialized(true);
  };

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        if (codes[0].value) {
          console.log("codes[0].value", codes[0].value);
          setIsActive(false);
          setTimeout(() => setCodeScanned(codes[0]?.value || ""), 500);
        }
      }
      return;
    },
  });

  function handleBackButtonClick() {
    if (isActive) {
      setIsCameraShown(false);
    }
    return false;
  }

  const onCrossClick = () => {
    setIsCameraShown(false);
  };

  const onError = (error: CameraRuntimeError) => {
    Alert.alert("Error!", error.message);
  };

  if (!device) {
    Alert.alert("Error!", "Camera could not be started");
    return null;
  }

  if (isFocused && device) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Modal presentationStyle="fullScreen" animationType="slide">
          <View style={[styles.cameraControls, { backgroundColor: undefined }]}>
            <TouchableOpacity activeOpacity={0.5} onPress={onCrossClick}>
              <IconButtonWrapper
                iconWidth={20}
                iconHeight={20}
                iconImage={Images.crossWhite}
              />
            </TouchableOpacity>
          </View>
          <Camera
            torch={flash}
            onInitialized={onInitialized}
            ref={camera}
            onError={onError}
            photo={false}
            style={styles.fullScreenCamera}
            device={device}
            codeScanner={codeScanner}
            isActive={
              isActive &&
              isFocused &&
              appState === "active" &&
              isCameraInitialized
            }
          />
          <RNHoleView
            holes={[
              {
                x: deviceWidth() * 0.1,
                y: deviceHeight() * 0.28,
                width: deviceWidth() * 0.8,
                height: deviceHeight() * 0.4,
                borderRadius: 10,
              },
            ]}
            style={[styles.rnholeView, styles.fullScreenCamera]}
          />
        </Modal>
      </SafeAreaView>
    );
  }

  return null;
};
