import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Static export pre-renders as Myanmar (default); client-side LanguageProvider
  // overrides locale via NextIntlClientProvider for dynamic switching.
  const locale = "mm";
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
