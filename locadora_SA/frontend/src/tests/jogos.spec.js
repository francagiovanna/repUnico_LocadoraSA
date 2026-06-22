import { test, expect } from "@playwright/test";
import { loginComoAdmin, navegarPara } from "./helpers.js";

test.describe("CT03 — Cadastrar jogo (RF03)", () => {
  test.beforeEach(async ({ page }) => {
    await loginComoAdmin(page);
    await navegarPara(page, "Jogos");
  });

  test("deve cadastrar um novo jogo com título válido", async ({ page }) => {
    await page.getByRole("button", { name: /novo jogo/i }).click();
    await expect(page.getByText("Novo jogo")).toBeVisible();

    await page.getByLabel(/título/i).fill("Sonic the Hedgehog");

    // Campos obrigatórios — sem eles salvar() retorna silenciosamente
    await page.locator("select").first().selectOption("Ação");
    await page.locator("select").last().selectOption("SNES");

    await page.getByRole("button", { name: /salvar/i }).click();

    await expect(
      page.getByRole("button", { name: /salvar/i })
    ).not.toBeVisible();

    await expect(
      page.getByRole("cell", { name: "Sonic the Hedgehog" })
    ).toBeVisible();
  });
});