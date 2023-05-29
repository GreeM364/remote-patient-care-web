import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import uaTranslation from './locales/ua.json';
import frTranslation from './locales/fr.json';
import arTranslation from './locales/ar.json';
import esTranslation from './locales/es.json';
import zhTranslation from './locales/zh.json';

const resources = {
    en: {
        translation: enTranslation
    },
    ua: {
        translation: uaTranslation
    },
    fr: {
        translation: frTranslation
    },
    ar: {
        translation: arTranslation
    },
    es: {
        translation: esTranslation
    },
    zh: {
        translation: zhTranslation
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // язык по умолчанию
        fallbackLng: 'en', // язык, используемый при отсутствии перевода
        interpolation: {
            escapeValue: false // не экранировать строки
        }
    });

export default i18n;
