import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const SVGBackButton = () => {
  return (
    <Svg
      width="48"
      height="23"
      viewBox="0 0 48 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.92057 10.4584C8.34534 11.0546 8.36229 12.0042 8.95845 12.5794L18.6733 21.9534C19.2695 22.5286 20.219 22.5117 20.7943 21.9155C21.3695 21.3194 21.3526 20.3698 20.7564 19.7946L12.121 11.4621L20.4534 2.8267C21.0286 2.23055 21.0117 1.28095 20.4155 0.705715C19.8194 0.130481 18.8698 0.147438 18.2946 0.74359L8.92057 10.4584ZM10.0268 12.9998L38.0268 12.4998L37.9732 9.50024L9.97322 10.0002L10.0268 12.9998Z"
        fill="black"
      />
    </Svg>
  );
};

export default SVGBackButton;
