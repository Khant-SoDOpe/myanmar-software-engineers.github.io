"use client";

import {
  createContext,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../messages/en.json";
import mm from "../../messages/mm.json";

export type Locale = "en" | "mm";

const STORAGE_KEY = "mmswe-locale";
const allMessages = { en, mm } as const;

// External store for locale (avoids setState-in-effect lint issues)
let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(callback: () => void) {
  listeners = [...listeners, callback];
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function getSnapshot(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "mm") return stored;
  } catch {
    // localStorage unavailable
  }
  return "mm";
}

function getServerSnapshot(): Locale {
  return "mm";
}

export interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isMyanmar: boolean;
  isEnglish: boolean;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((newLocale: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // localStorage unavailable
    }
    emitChange();
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        isMyanmar: locale === "mm",
        isEnglish: locale === "en",
      }}
    >
      <NextIntlClientProvider locale={locale} messages={allMessages[locale]}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};
