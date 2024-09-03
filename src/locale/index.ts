import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ar, en } from './translations';
import { NativeModules, Platform } from 'react-native';
import { LANGUAGE_KEY } from '../utils/constants';
import { getItem, setItem, storage } from '../utils/storage';

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const resources = {
  en: {
    translation: en
  },
  ar: {
    translation: ar
  }
};

export type Language = keyof typeof resources;

const languageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      const presentLanguage = getItem(LANGUAGE_KEY);
      if (presentLanguage) {
        return callback((presentLanguage as string) ?? deviceLanguage);
      } else {
        callback(deviceLanguage);
      }
    } catch (error) {
      console.log('error reading language', error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    // store "language" in AsyncStorage
    try {
      setItem(LANGUAGE_KEY, language);
      //   await AsyncStorage.setItem(LANGUAGE_KEY, language)
    } catch (error) {}
  }
};

i18n.use(initReactI18next).use(languageDetectorPlugin).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: 'en'
});

export default i18n;
