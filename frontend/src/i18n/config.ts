/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 * 3. SaaS Restriction: This software, or any derivative of it, may not be used to offer a competing product or service (SaaS) without prior written consent from Hexastack. Offering the software as a service or using it in a commercial cloud environment without express permission is strictly prohibited.
 */

// Core i18next library.
import i18n from "i18next";
// Bindings for React: allow components to
// re-render when language changes.
import getConfig from "next/config";
import { initReactI18next } from "react-i18next";

import enTranslations from "./en/translation.json";
import frTranslations from "./fr/translation.json";

const { publicRuntimeConfig } = getConfig();

i18n.use(initReactI18next).init({
  lng: publicRuntimeConfig.lang.default,
  fallbackLng: "en",
  debug: true,
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

i18n.services.formatter?.add("dateFormat", (value, lng, options) =>
  new Intl.DateTimeFormat(lng, options?.formatParams?.val).format(
    new Date(options?.date || value),
  ),
);
export default i18n;