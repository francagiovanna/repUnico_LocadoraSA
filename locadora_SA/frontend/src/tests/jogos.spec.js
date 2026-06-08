import { test, expect } from "@playwright/test";
import { loginComoAdmin, navegarPara } from "./helpers.js";

test.describe("CT03 — Cadastrar jogo (RF03)", () => {
  test.beforeEach(async ({ page }) => {
    await loginComoAdmin(page);
    await navegarPara(page, "Jogos");
  });

  test("deve cadastrar um novo jogo com título válido", async ({ page }) => {
    // 1. Abre o modal de novo jogo
    await page.getByRole("button", { name: /novo jogo/i }).click();

    // 2. Modal deve estar visível com o título correto
    await expect(page.getByText("Novo jogo")).toBeVisible();

    // 3. Preenche o título
    await page.getByLabel(/título/i).fill("Sonic the Hedgehog");

    // 4. Salva
    await page.getByRole("button", { name: /salvar/i }).click();

    // 5. Modal fecha — botão "Salvar" não deve mais aparecer
    await expect(page.getByRole("button", { name: /salvar/i })).not.toBeVisible();

    // 6. Novo jogo aparece na tabela
    await expect(page.getByRole("cell", { name: "Sonic the Hedgehog" })).toBeVisible();
  });
});