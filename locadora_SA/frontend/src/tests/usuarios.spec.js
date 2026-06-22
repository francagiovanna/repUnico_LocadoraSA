import { test, expect } from "@playwright/test";
import { loginComoAdmin, navegarPara } from "./helpers";

test.describe("CT09 — Cadastrar usuário (RF07)", () => {
  test.beforeEach(async ({ page }) => {
    await loginComoAdmin(page);
    await navegarPara(page, "Usuários");
  });

  test("deve cadastrar um novo usuário", async ({ page }) => {
    const nome = `Usuário ${Date.now()}`;

    await page.getByRole("button", { name: /novo usuário/i }).click();

    await page.getByRole("textbox").first().fill(nome);
    await page.getByRole("textbox").nth(1).fill(`teste${Date.now()}@mail.com`);
    await page.getByRole("textbox").nth(2).fill("999999999");

    await page.getByRole("button", { name: /salvar/i }).click();

    // espera a tabela atualizar
    await page.waitForTimeout(500);

    // ASSERT CORRETA
    await expect(
      page.getByRole("row").filter({ hasText: nome })
    ).toBeVisible();
  });
});

test("CT10 — Listar usuários (RF08)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Usuários");

  // espera pelo carregamento da API/UI
  await page.waitForLoadState("networkidle");

  // garante que alguma linha da tabela existe
  const linhas = page.locator('[data-testid="usuario-row"]');

  await expect(linhas.first()).toBeVisible();
});

test("CT13 — Editar usuário (RF11)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Usuários");

  await page.waitForLoadState("networkidle");

  const linha = page.getByTestId("usuario-row").first();
  await expect(linha).toBeVisible();

  await linha.getByRole("button", { name: /editar/i }).click();

  const novoEmail = `editado${Date.now()}@mail.com`;

  const emailInput = page.getByTestId("input-email");

  await expect(emailInput).toBeVisible();

  await emailInput.fill(novoEmail);

  await page.getByRole("button", { name: /salvar/i }).click();

  await expect(page.getByText(novoEmail)).toBeVisible();
});

test("CT14 — Excluir usuário (RF12)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Usuários");

  await page.waitForLoadState("networkidle");

  const linha = page.getByTestId("usuario-row").first();
  await expect(linha).toBeVisible();

  const nomeAntes = await linha.textContent();

  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await linha.getByRole("button", { name: /excluir/i }).click();

  // espera UI atualizar de verdade
  await page.waitForResponse((res) =>
    res.url().includes("/customers") && res.ok()
  );

  // valida que o usuário não está mais na lista
  await expect(page.getByText(nomeAntes)).toHaveCount(0);
});