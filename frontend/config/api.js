import { NativeModules, Platform } from "react-native";

const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");
const scriptUrl = NativeModules.SourceCode?.scriptURL;
const expoHost = scriptUrl?.match(/^https?:\/\/([^/:]+)/)?.[1];
const host =
  Platform.OS === "web"
    ? typeof window !== "undefined"
      ? window.location.hostname
      : "localhost"
    : expoHost || (Platform.OS === "android" ? "10.0.2.2" : "localhost");

export const API_URL = configuredApiUrl || `http://${host}:3000`;
export const WS_URL = API_URL.replace(/^http/, "ws");
