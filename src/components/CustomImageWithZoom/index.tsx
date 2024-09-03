import React, { useState, useRef, createRef, useEffect } from "react";
import { View, Animated, ScrollView, Image, PixelRatio } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import Loader from "../Loader";
import { deviceHeight, deviceWidth } from "../../utils/helpers";
import { RfH } from "../../utils/helper";

const CustomImageWithZoom = (props: any) => {
  const { url, isLargeImage } = props || {};
  const [panEnabled, setPanEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = createRef();
  const panRef = createRef();

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const handlePinchStateChange = ({ nativeEvent }) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    let nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        nScale = 1;

        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }

      Animated.spring(scale, {
        toValue: nScale,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View>
      {url ? (
        <PanGestureHandler
          onGestureEvent={onPanEvent}
          ref={panRef}
          simultaneousHandlers={[pinchRef]}
          enabled={panEnabled}
          failOffsetX={[-1000, 1000]}
          shouldCancelWhenOutside
        >
          <Animated.View>
            <PinchGestureHandler
              ref={pinchRef}
              onGestureEvent={() => {}}
              simultaneousHandlers={[panRef]}
              onHandlerStateChange={handlePinchStateChange}
            >
              <ScrollView>
                <Animated.Image
                  source={{
                    uri: url,
                    cache: "default",
                  }}
                  style={{
                    width: deviceWidth(),
                    height: isLargeImage
                      ? deviceHeight() / 1.6
                      : deviceHeight(),
                    marginBottom: RfH(10),
                    transform: [{ scale }, { translateX }, { translateY }],
                  }}
                  resizeMode="contain"
                  onLoadStart={() => setIsLoading(true)}
                  onLoadEnd={() => setIsLoading(false)}
                />
              </ScrollView>
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      ) : null}
      <Loader isLoading={isLoading} />
    </View>
  );
};

export default CustomImageWithZoom;
