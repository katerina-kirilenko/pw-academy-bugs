import { defineConfig } from "allure";

export default defineConfig({
  name: "Allure Report",
  output: "./allure-report",
  historyPath: "./history.json",
  plugins: {
    awesome: {
      options: {
        singleFile: true,
        reportLanguage: "en",
        reportName: "Allure Report",
      },
    },
  },
});
