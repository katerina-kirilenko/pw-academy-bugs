import { Locator, Page } from "@playwright/test";
import { step } from "allure-js-commons";

export class MyCartPage {
  readonly page: Page;
  public returnBtn: Locator;
  public emptyCartTitle: Locator;
  public removeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.returnBtn = page.locator(".ec_cart_empty_button");
    this.removeBtn = page.locator(".ec_cartitem_delete");
    this.emptyCartTitle = page.locator(".ec_cart_empty");
  }

  async removeProduct(): Promise<void> {
    await step("Удалить товар из корзины", async () => {
      await this.removeBtn.click();
    });
  }
}
