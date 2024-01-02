import { writable } from "svelte/store";
import { get } from "svelte/store";
import PlayerHudStore from "../stores/playerStatusHudStore";
import type {
  playerHudColorEffects,
  iconNamesKind,
  colorNamesKind,
  shapekind,
  globalEditableColorsType,
} from "../types/types";
import {
  defaultColorEffect,
  defaultEditableColor,
  createEditableColor,
  colorStoreLocalStorageName,
} from "../types/types";

export interface colorEffectStoreType {
  icons: playerHudColorEffects;
  globalColorSettings: globalEditableColorsType;
}

const store = () => {
  let stored: string = localStorage.getItem(colorStoreLocalStorageName);
  let storedObject: object = {};
  if (stored) {
    storedObject = JSON.parse(stored);
  }

  function getLocalStorage(
    key: iconNamesKind | "globalColorSettings",
    fallback: any
  ) {
    if (storedObject && storedObject[key] != null) {
      return storedObject[key];
    }
    return fallback;
  }

  function getDefaultSettings(): colorEffectStoreType {
    return {
      globalColorSettings: getLocalStorage("globalColorSettings", {
        editableColors: defaultEditableColor(),
        editSingleIconName: "voice",
        editSingleIconStage: 0,
        iconColor: "",
        iconContrast: 100,
        iconDropShadowAmount: 0,
        innerColor: "",
        outlineColor: "",
        outlineContrast: 100,
        outlineDropShadowAmount: 0,
        progressColor: "",
        progressContrast: 100,
        progressDropShadowAmount: 0,
      }),
      icons: {
        voice: getLocalStorage("voice", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("not-talking", "#c5c5c5"),
            defaultColorEffect("talking", "#6960f6"),
            defaultColorEffect("radio-talking", "#D64763"),
          ],
          editableColors: defaultEditableColor(),
        }),
        health: getLocalStorage("health", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("alive", "#28b166"),
            defaultColorEffect("dead", "#960521"),
          ],
          editableColors: defaultEditableColor(),
        }),
        armor: getLocalStorage("armor", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("armor", "#2e587a"),
            defaultColorEffect("no-armor", "#2e587a"),
          ],
          editableColors: defaultEditableColor(),
        }),
        hunger: getLocalStorage("hunger", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("normal", "#fa9f4e"),
            defaultColorEffect("starving", "#fa9f4e"),
          ],
          editableColors: defaultEditableColor(),
        }),
        thirst: getLocalStorage("thirst", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("normal", "#15b5b1"),
            defaultColorEffect("thirsty", "#15b5b1"),
          ],
          editableColors: defaultEditableColor(),
        }),
        stress: getLocalStorage("stress", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#D387F2")],
          editableColors: defaultEditableColor(),
        }),
        oxygen: getLocalStorage("oxygen", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#E7E367")],
          editableColors: defaultEditableColor(),
        }),
        armed: getLocalStorage("armed", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#952A6B")],
          editableColors: defaultEditableColor(),
        }),
        parachute: getLocalStorage("parachute", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#CD6C78")],
          editableColors: defaultEditableColor(),
        }),
        engine: getLocalStorage("engine", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("no-damage", "#9AD582"),
            defaultColorEffect("minor-damage", "#ff8960"),
            defaultColorEffect("major-damage", "#413231"),
          ],
          editableColors: defaultEditableColor(),
        }),
        harness: getLocalStorage("harness", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#6BB097")],
          editableColors: defaultEditableColor(),
        }),
        cruise: getLocalStorage("cruise", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#415c72")],
          editableColors: defaultEditableColor(),
        }),
        nitro: getLocalStorage("nitro", {
          currentEffect: 0,
          colorEffects: [
            defaultColorEffect("no-nitro", "#415c72"),
            defaultColorEffect("active-nitro", "#D64763"),
          ],
          editableColors: defaultEditableColor(),
        }),
        dev: getLocalStorage("dev", {
          currentEffect: 0,
          colorEffects: [defaultColorEffect("normal", "#000000")],
          editableColors: defaultEditableColor(),
        }),
      },
    };
  }

  const colorEffectState: colorEffectStoreType = getDefaultSettings();

  const { subscribe, set, update } = writable(colorEffectState);

  const methods = {
    resetColorEffects() {
      storedObject = {};
      localStorage.removeItem(colorStoreLocalStorageName);
      set(getDefaultSettings());
    },
    receiveUIUpdateMessage(data) {
      if (!data || !Object.keys(data).length) {
        return;
      }
      let statusIconData = get(PlayerHudStore);
      update((state) => {
        let key: any, value: any;
        for ([key, value] of Object.entries(data)) {
          state.icons[key] = {
            currentEffect: 0,
            editableColors: createEditableColor(
              statusIconData.icons[key].shape
            ),
            colorEffects: value.colorEffects,
          };
        }
        return state;
      });
    },
    updateAllDefaultEffectColorSetting(
      colorSetting: colorNamesKind,
      newValue: any
    ) {
      update((state) => {
        for (let iconColorEffect of Object.keys(state.icons)) {
          switch (colorSetting) {
            case "progressDropShadowAmount":
            case "iconDropShadowAmount":
            case "outlineDropShadowAmount":
              for (let effectStage of state.icons[iconColorEffect]
                .colorEffects) {
                effectStage[colorSetting] = newValue;
              }
              break;
            default:
              state.icons[iconColorEffect].colorEffects[0][colorSetting] =
                newValue;
              break;
          }
        }
        state.globalColorSettings[colorSetting as any] = newValue;
        return state;
      });
    },
    updateAllIconShapeEditableColor(shape: shapekind) {
      update((state) => {
        let newEditableSettings = createEditableColor(shape);
        for (let icon in state.icons) {
          state.icons[icon].editableColors = newEditableSettings;
        }
        state.globalColorSettings.editableColors = newEditableSettings;
        return state;
      });
    },
    updateDefaultEffectColorSetting(
      iconName: iconNamesKind,
      colorSetting: colorNamesKind,
      newValue: any
    ) {
      update((state) => {
        state.icons[iconName].colorEffects[0][colorSetting as any] = newValue;
        return state;
      });
    },
    updateIconColorToProgressColor() {
      update((state) => {
        for (const iconColorEffect of Object.values(state.icons)) {
          for (const iconColorState of iconColorEffect.colorEffects) {
            iconColorState.iconColor = iconColorState.progressColor;
          }
        }
        return state;
      });
    },
    updateIconEffectStage(iconName: iconNamesKind, stageNumber: number) {
      update((state) => {
        if (
          stageNumber < 0 ||
          stageNumber > state.icons[iconName].colorEffects.length - 1
        ) {
          return state;
        }
        state.icons[iconName].currentEffect = stageNumber;
        return state;
      });
    },
    updateIconShapeEditableColor(iconName: iconNamesKind, shape: shapekind) {
      update((state) => {
        state.icons[iconName].editableColors = createEditableColor(shape);
        return state;
      });
    },
    updateColorSetting(
      iconName: iconNamesKind,
      stageNumber: number,
      settingName: colorNamesKind,
      newValue: any
    ) {
      update((state) => {
        if (
          stageNumber < 0 ||
          stageNumber > state.icons[iconName].colorEffects.length - 1
        ) {
          return state;
        }
        state.icons[iconName].colorEffects[stageNumber][settingName as any] =
          newValue;
        return state;
      });
    },
    updateProgressColor(
      iconName: iconNamesKind,
      stageNumber: number,
      newColor: string
    ) {
      update((state) => {
        if (
          stageNumber < 0 ||
          stageNumber > state.icons[iconName].colorEffects.length - 1
        ) {
          return state;
        }
        state.icons[iconName].colorEffects[stageNumber].progressColor =
          newColor;
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
