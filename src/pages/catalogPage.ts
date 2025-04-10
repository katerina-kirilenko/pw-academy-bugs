import { Page, Locator } from "@playwright/test";
import { step } from "allure-js-commons";
import { URLs } from "@types";

export class CatalogPage {
  private page: Page;
  private productItems: Locator;
  private productItem: (id: number) => Locator;
  public bugPopup: Locator;
  public resultPopup: Locator;
  public issueReportBtn: Locator;
  public finalPopupTitle: Locator;
  public crashBugOverlay: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItems = page.locator("li.ec_product_li");
    this.productItem = (id: number) => page.locator(`#ec_product_li_${id}`);

    this.bugPopup = page.locator("#bug-popup");
    this.resultPopup = page.locator("#result-popup");
    this.issueReportBtn = page.getByRole("button", {
      name: "View Issue Report",
    });
    this.finalPopupTitle = page.locator(".academy-popup-bug-title");
    this.crashBugOverlay = page.locator(".academy-bug-overlay");
  }

  async goto(): Promise<void> {
    await step("Переход на страницу каталога", async () => {
      await this.page.goto(URLs.findBugs);
      await this.page.getByRole("button", { name: "Accept cookies" }).click();
    });
  }

  async getProductCount(): Promise<number> {
    return await step("Получить количество товаров на странице", async () => {
      return await this.productItems.count();
    });
  }

  async getProductName(id: number): Promise<string> {
    return await step("Получение названия товара по id", async () => {
      const name = await this.productItem(id)
        .locator(".ec_product_title_type1 > a.ec_image_link_cover")
        .innerText();
      return name.toLowerCase();
    });
  }

  async clickProduct(id: number): Promise<void> {
    await step("Клик по товару по id", async () => {
      await this.productItem(id).click();
    });
  }

  async fillBugPopup(): Promise<void> {
    await step("Заполнить попап", async () => {
      await this.bugPopup.getByText("Visual").click();
      await this.bugPopup.getByText("The product image fills the").click();
      await this.bugPopup.getByRole("button", { name: "Submit" }).click();
    });
  }

  async getCorrectResult(): Promise<boolean> {
    return await step("Проверить результат на корректность", async () => {
      return await this.resultPopup
        .getByRole("heading", { name: "✅ Correct!" })
        .isVisible();
    });
  }

  async setPaginationCount(number: string): Promise<void> {
    await step("Изменить пагинацию", async () => {
      await this.page.getByRole("link", { name: number }).click();
    });
  }
}
