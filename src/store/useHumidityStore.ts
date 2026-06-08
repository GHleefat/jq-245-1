import { create } from "zustand";

export type HumidityStatus = "dry" | "normal" | "optimal" | "wet";

export interface ReadingPopupState {
  visible: boolean;
  x: number;
  y: number;
  humidity: number;
  worldPosition: { x: number; y: number; z: number };
}

interface HumidityStore {
  humidity: number;
  status: HumidityStatus;
  popup: ReadingPopupState;
  setHumidity: (value: number) => void;
  showPopup: (
    x: number,
    y: number,
    humidity: number,
    worldPosition: { x: number; y: number; z: number }
  ) => void;
  hidePopup: () => void;
}

const getStatus = (value: number): HumidityStatus => {
  if (value < 40) return "dry";
  if (value < 60) return "normal";
  if (value <= 85) return "optimal";
  return "wet";
};

export const useHumidityStore = create<HumidityStore>((set) => ({
  humidity: 70,
  status: "optimal",
  popup: {
    visible: false,
    x: 0,
    y: 0,
    humidity: 70,
    worldPosition: { x: 0, y: 0, z: 0 },
  },
  setHumidity: (value) =>
    set({
      humidity: value,
      status: getStatus(value),
    }),
  showPopup: (x, y, humidity, worldPosition) =>
    set({
      popup: {
        visible: true,
        x,
        y,
        humidity,
        worldPosition,
      },
    }),
  hidePopup: () =>
    set((state) => ({
      popup: { ...state.popup, visible: false },
    })),
}));
