import { test, expect } from "@playwright/test";
import { loginComoAdmin, navegarPara } from "./helpers.js";

test.describe("CT03 — Cadastrar jogo (RF03)", () => {
  test.beforeEach(async ({ page }) => {
    await loginComoAdmin(page);
    await navegarPara(page, "Jogos");
  });

  test("deve cadastrar um novo jogo com título válido", async ({ page }) => {
    await page.getByRole("button", { name: /novo jogo/i }).click();
    await expect(
      page.getByRole("heading", { name: /novo jogo/i })
    ).toBeVisible();

    await page.locator('input').nth(1).fill("Sonic the Hedgehog");

    await page.locator('select').nth(0).selectOption("Ação");

    await page.locator('select').nth(1).selectOption("PS5");

    await page
      .locator('input[type="number"]')
      .first()
      .fill("15");

    await page
      .locator('input[type="number"]')
      .nth(1)
      .fill("5");

    await page.getByRole("button", { name: /salvar/i }).click();

    await expect(
      page.getByRole("button", { name: /salvar/i })
    ).not.toBeVisible();

    await expect(
      page.getByRole("cell", { name: "Sonic the Hedgehog" })
    ).toBeVisible();
  });
});