import { expect, test } from "@playwright/test";
import { CardPage, CatalogPage, MyCartPage } from "@pages";
import { ErrorMessages, wrongReturnBtnString } from "@types";
import { CommentForm } from "@helpers/mocks";

test.describe("Find Bugs Challenge", () => {
  let catalog: CatalogPage;
  let card: CardPage;

  test.beforeEach(async ({ page }) => {
    catalog = new CatalogPage(page);
    card = new CardPage(page);
    await catalog.goto();
  });

  test("The product image should fill the box entirely", async () => {
    await catalog.clickProduct(4281370);
    await expect(catalog.bugPopup).toBeVisible();

    await catalog.fillBugPopup();
    expect(await catalog.getCorrectResult()).toBeTruthy();

    await catalog.issueReportBtn.click();
    await expect(catalog.finalPopupTitle).toContainText(
      ErrorMessages.successFoundBug,
    );
  });

  test("The selected number of results should display according to the clicked buttons", async () => {
    await catalog.setPaginationCount("10");
    await expect(catalog.crashBugOverlay).toContainText(
      ErrorMessages.foundCrashBugLong,
    );
  });

  test("The currency should change as expected", async () => {
    const productName = await catalog.getProductName(4481370);
    await card.gotoProduct(4481370);

    const cardTitle = await card.getTitle();
    expect(cardTitle?.toLowerCase()).toEqual(productName);

    await card.selectCurrency();
    await expect(card.crashBugOverlay).toContainText(
      ErrorMessages.foundCrashBugShort,
    );
  });

  test("User can leave comment to product", async () => {
    await card.gotoProduct(4481370);
    await card.leaveComment(CommentForm);

    await expect(card.crashBugOverlay).toContainText(
      ErrorMessages.foundCrashBugLong,
    );
  });

  test("Button in empty cart has correct text", async ({ page }) => {
    const cartPage = new MyCartPage(page);
    await card.gotoProduct(4481370);
    await card.addToCart();
    await cartPage.removeProduct();

    const visible = await cartPage.emptyCartTitle.isVisible();

    if (visible) {
      await expect(cartPage.returnBtn).toContainText(wrongReturnBtnString);
      await cartPage.returnBtn.click();
      await expect(catalog.bugPopup).toBeVisible();
    }
  });
});
