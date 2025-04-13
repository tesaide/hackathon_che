import { accessibilityLevels } from "../contexts/FiltersContext";
import { IMarker } from "../models";
import { getRandomFloatInRange } from "./getRandomFloatInRange";

const pinColors = ["green", "blue", "yellow"];

export const getMarkersArray = (count: number) => {
  const res: IMarker[] = [];

  Array.from(Array(count + 1).keys()).forEach(() => {
    const color = getRandomFloatInRange(0, pinColors.length);
    const accessibilityLevel = getRandomFloatInRange(
      0,
      accessibilityLevels.length
    );

    res.push({
      latitude: getRandomFloatInRange(51.48, 51.55),
      longitude: getRandomFloatInRange(31.25, 31.33),
      title: "ЧОДА",
      color: pinColors[Number.parseInt(`${color}`)],
      accessibilityLevel:
        accessibilityLevels[Number.parseInt(`${accessibilityLevel}`)],
    });
  });

  return res;
};
