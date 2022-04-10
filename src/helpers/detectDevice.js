import { MOBILES_NAME } from "../variables";

export default function detectedDevice() {
  const nav = navigator.userAgent.toLowerCase();
  let result = false;

  MOBILES_NAME.forEach((name) => {
    const regexp = new RegExp(`${name}`, 'g')
    if (nav.match(regexp)) {
      result = true;
    };
  });

  return result;
};