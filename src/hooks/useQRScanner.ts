import { useState } from "react";
import { Linking } from "react-native";
import { useCameraPermission } from "react-native-vision-camera";
import { localize } from "../locale/utils";
import { alertBox } from "../utils/helpers";

const useQRScanner = (onScan?: (value: string) => void) => {
  const [isQRScannerVisible, setIsQRScannerVisible] = useState(false);
  const [scannedData, setScannedData] = useState<string | undefined>(undefined);
  const { hasPermission, requestPermission } = useCameraPermission();

  const openSettings = async (): Promise<void> => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error("Failed to open settings:", error);
      alertBox(
        localize("common.error"),
        localize("common.someThingWentWrong"),
        {
          positiveText: localize("common.ok"),
          cancelable: true,
        }
      );
    }
  };

  const openQRScanner = async (): Promise<void> => {
    try {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          alertBox(
            localize("components.requiredPermissionMissing"),
            localize("components.cameraPermissionMsg"),
            {
              positiveText: localize("common.settings"),
              negativeText: localize("common.cancel"),
              cancelable: true,
              onPositiveClick: () => openSettings(),
            }
          );
          return;
        }
      }
      setIsQRScannerVisible(true);
    } catch (error) {
      console.error("Failed to open QR scanner:", error);
      alertBox(
        localize("common.error"),
        localize("common.someThingWentWrong"),
        {
          positiveText: localize("common.ok"),
          cancelable: true,
        }
      );
    }
  };

  const handleReadCode = (value: string) => {
    setScannedData(value);
    setIsQRScannerVisible(false);
    if (onScan) {
      onScan(value);
    }
  };

  return {
    isQRScannerVisible,
    scannedData,
    openQRScanner,
    handleReadCode,
    setIsQRScannerVisible,
  };
};

export default useQRScanner;
