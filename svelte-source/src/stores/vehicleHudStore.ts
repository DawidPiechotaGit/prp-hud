import { writable } from "svelte/store";
import { capAmountToHundred } from "../types/types";

type vehicleStatusType = {
  fuelColor: string;
  altitude: number;
  fuel: number;
  speed: number;
  show: boolean;
  showAltitude: boolean;
  showSeatBelt: boolean;
  showSquare: boolean;
  showSquareBorder: boolean;
  ShowCircle: boolean;
  showCircleBorder: boolean;
  seatbeltColor: string;
  rpmD: number;
  currentGear: number;
};

type vehicleHudUpdateMessageType = {
  show: boolean;
  isPaused: boolean;
  seatbelt: boolean;
  speed: number;
  fuel: number;
  altitude: number;
  showAltitude: boolean;
  showSeatbelt: boolean;
  showSquareB: boolean;
  showCircleB: boolean;
  rpmD: number;
  currentGear: number;
};

type vehicleHudShowMessage = {
  show: boolean;
  seatbelt: boolean;
};

const store = () => {
  const vehicleStatusState: vehicleStatusType = {
    fuelColor: "#FFFFFF",
    altitude: 0,
    fuel: 0,
    speed: 0,
    show: false,
    showAltitude: false,
    showSeatBelt: false,
    showSquare: false,
    showSquareBorder: false,
    ShowCircle: false,
    showCircleBorder: false,
    seatbeltColor: "#e85b14",
    rpmD: 0,
    currentGear: 0,
  };

  const { subscribe, set, update } = writable(vehicleStatusState);

  const methods = {
    receiveShowMessage(data: vehicleHudShowMessage) {
      update((state) => {
        state.show = data.show;
        // state.show = false;
        state.showSeatBelt = data.seatbelt;
        return state;
      });
    },
    receiveUpdateMessage(data: vehicleHudUpdateMessageType) {
      update((state) => {
        state.show = data.show;
        // state.show = false;
        state.speed = data.speed;
        state.altitude = data.altitude;
        state.fuel = capAmountToHundred(data.fuel);
        state.showSeatBelt = data.showSeatbelt;
        state.showAltitude = data.showAltitude;
        state.showSquareBorder = data.showSquareB;
        state.showCircleBorder = data.showCircleB;
        state.rpmD = data.rpmD;
        state.currentGear = data.currentGear;

        if (data.seatbelt) {
          state.showSeatBelt = false;
        } else {
          state.showSeatBelt = true;
        }

        if (data.fuel <= 20) {
          state.fuelColor = "#ff0000";
        } else if (data.fuel <= 30) {
          state.fuelColor = "#dd6e14";
        } else {
          state.fuelColor = "#FFFFFF";
        }

        if (data.isPaused) {
          state.show = false;
        }

        return state;
      });
    },
  };

  return {
    subscribe,
    set,
    update,
    ...methods,
  };
};

export default store();
