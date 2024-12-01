// import * as Updates from 'expo-updates';
import type TranslateOptions from 'i18next';
import i18n from 'i18next';
import memoize from 'lodash.memoize';
import { useCallback } from 'react';
import { I18nManager, NativeModules } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import { Language } from '.';
import { LANGUAGE_KEY } from '../utils/constants';
import { getItem, storage } from '../utils/storage';
import RNRestart from 'react-native-restart';
// export const LOCAL = 'local';

export const getLanguage = () => getItem(LANGUAGE_KEY); // getItem<Language | undefined>(LOCAL);

export const isRTL = () => i18n.dir() === 'rtl';

export const localize = memoize(
  (key, options?) => i18n.t(key, options),
  (key, options) => (options ? key + JSON.stringify(options) : key)
);

export const changeLanguage = async (lang: Language) => {
  await i18n.changeLanguage(lang);
  if (lang === 'ar') {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }

  if (__DEV__) NativeModules.DevSettings.reload();
  else {
    RNRestart.restart();
  }
};

export const useSelectedLanguage = () => {
  const [language, setLang] = useMMKVString(LANGUAGE_KEY);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLang(lang);
      if (lang !== undefined) changeLanguage(lang as Language);
    },
    [setLang]
  );

  return { language: language as Language, setLanguage };
};


export const isArabic = () => {
    const language = getLanguage();
    return language === LANGUAGE_KEY;
}
