import { test, expect } from "@playwright/test";
import { loginComoAdmin, navegarPara } from "./helpers";

test("CT04 — Cadastrar jogo (RF03)", async ({ page }) => {
  await loginComoAdmin(page);

  await navegarPara(page, "Jogos");

  await expect(
    page.getByRole("button", { name: /\+ novo jogo/i })
  ).toBeVisible();

  await page
    .getByRole("button", { name: /\+ novo jogo/i })
    .click();

  const titulo = `Jogo Teste ${Date.now()}`;

  // FIX
  await page
    .getByRole("textbox")
    .nth(1)
    .fill(titulo);

  await page
    .getByRole("combobox")
    .first()
    .selectOption("Ação");

  await page
    .getByRole("combobox")
    .nth(1)
    .selectOption("PS5");

  await page
    .getByRole("spinbutton")
    .first()
    .fill("10");

  await page
    .getByRole("spinbutton")
    .nth(1)
    .fill("1");

  await page
    .getByRole("button", { name: /^salvar$/i })
    .click();

  await expect(
    page.getByRole("button", { name: /^salvar$/i })
  ).toBeHidden();

  await expect(
    page.locator("tbody")
  ).toContainText(titulo, {
    timeout: 10000,
  });
});

test("CT05 — Cadastrar jogo sem nome (RF03)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Jogos");

  // Aguarda tabela carregar antes de qualquer coisa
  await page.waitForSelector("tbody tr", { timeout: 10000 });

  await page.getByRole("button", { name: /\+ novo jogo/i }).click();
  await expect(page.getByText(/novo jogo/i).first()).toBeVisible();

  // Preenche tudo EXCETO o título
  await page.getByRole("combobox").first().selectOption({ index: 1 });
  await page.getByRole("combobox").nth(1).selectOption({ index: 1 });
  await page.getByRole("spinbutton").first().fill("10");
  await page.getByRole("spinbutton").nth(1).fill("1");

  await page.getByRole("button", { name: /salvar/i }).click();

  await page.waitForTimeout(500);

  // Modal deve continuar aberto
  await expect(
    page.getByRole("button", { name: /salvar/i })
  ).toBeVisible();

  // Mensagem de erro deve aparecer
  await expect(
    page.getByText(/título é obrigatório/i)
  ).toBeVisible();
});

