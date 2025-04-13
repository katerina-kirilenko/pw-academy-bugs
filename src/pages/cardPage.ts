import { Locator, Page } from "@playwright/test";
import { step } from "allure-js-commons";
import { IComment, URLs } from "@types";

export class CardPage {
  readonly page: Page;
  public card: (id: number) => Locator;
  public crashBugOverlay: Locator;
  public title: Locator;
  public addToCartBtn: Locator;
  public commentInput: Locator;
  public nameInput: Locator;
  public emailInput: Locator;
  public addCommentBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.card = (id: number) => page.locator(`#ec_product_li_${id}`);
    this.crashBugOverlay = page.locator(".academy-bug-info-overlay");
    this.title = page.locator("h1").first();
    this.addToCartBtn = page.locator(".ec_details_add_to_cart");

    this.commentInput = page.getByRole("textbox", { name: "Comment" });
    this.nameInput = page.getByRole("textbox", { name: "Name*" });
    this.emailInput = page.getByRole("textbox", { name: "Email*" });
    this.addCommentBtn = page.getByRole("button", { name: "Post Comment" });
  }

  async gotoProduct(id: number): Promise<void> {
    await step("Переход на страницу товара", async () => {
      await this.card(id).click();
    });
  }

  async getTitle(): Promise<string | null> {
    return await step("Получить название товара", async () => {
      return await this.title.textContent();
    });
  }

  async selectCurrency(): Promise<void> {
    await step("Изменить валюту", async () => {
      await this.page.locator("#ec_currency_conversion").selectOption("EUR");
    });
  }

  async addToCart(): Promise<void> {
    await step("Добавить товар в корзину", async () => {
      await this.addToCartBtn.click();
      await this.page.waitForURL(URLs.cart);
    });
  }

  async leaveComment({ comment, name, email }: IComment): Promise<void> {
    await step("Добавить комментарий к товару", async () => {
      await this.commentInput.click();
      await this.commentInput.fill(comment);
      await this.nameInput.click();
      await this.nameInput.fill(name);
      await this.emailInput.click();
      await this.emailInput.fill(email);
      await this.addCommentBtn.click();
    });
  }
}
