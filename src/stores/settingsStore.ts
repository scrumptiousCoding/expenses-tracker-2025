import { defineStore } from "pinia";
import type { ICountryLocale } from "./interfaces/ICountryLocale";
import axios from "axios";

interface ILocaleResponse {
  country: {
    name: string;
    currency_code: string;
  };
  locale: string;
}

export interface ISettingsStore {
  selectedCountry: ICountryLocale;
  countryLocaleList: ICountryLocale[];
}

export const useSettingsStore = defineStore("settingsStore", {
  state: (): ISettingsStore => ({
    selectedCountry: {
      locale: "af-ZA",
      currencyCode: "ZAR",
      countryName: "South Africa",
    },
    countryLocaleList: [],
  }),
  getters: {},
  actions: {
    getLocaleList() {
      axios
        .get<ILocaleResponse[]>("https://cdn.simplelocalize.io/public/v1/locales")
        .then((response) => {
          const newCountryLocaleList: ICountryLocale[] = [];
          response.data.forEach((item: ILocaleResponse) => {
            if (item.country.currency_code !== "") {
              const exists = newCountryLocaleList.findIndex(
                (x: ICountryLocale) => x.currencyCode === item.country.currency_code
              );
              if (exists === -1) {
                newCountryLocaleList.push({
                  countryName: item.country.name,
                  locale: item.locale,
                  currencyCode: item.country.currency_code,
                });
              }
            }
          });
          newCountryLocaleList.sort((a: ICountryLocale, b: ICountryLocale) => {
            return a.countryName.localeCompare(b.countryName);
          });
          this.countryLocaleList = newCountryLocaleList;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setSelectedCountry(country: ICountryLocale) {
      console.log(country);

      this.selectedCountry = country;
    },
    currencyFormatting(amount: number) {
      return new Intl.NumberFormat(this.selectedCountry.locale, {
        style: "currency",
        currency: this.selectedCountry.currencyCode,
      }).format(amount);
    },
  },
});
