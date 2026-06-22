import { loginComoAdmin, navegarPara } from "./helpers";
import { test, expect } from "@playwright/test";

test("CT11 — Registrar aluguel (RF09)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Aluguéis");

  await page.waitForLoadState("networkidle");

  // 1. abrir modal
  await page.getByRole("button", { name: /\+ novo aluguel/i }).click();

  // 2. selecionar cliente (primeiro válido)
  await page.locator("select[name='usuario']").selectOption({ index: 1 });

  // 3. selecionar jogo (primeiro válido)
  await page.locator("select[name='jogo']").selectOption({ index: 1 });

  // 4. preencher data
  await page.locator("input[type='date']").fill("2026-12-31");

  // 5. salvar (FALTAVA O CLICK NO TEU CÓDIGO)
  await page.getByRole("button", { name: /salvar/i }).click();

  // 6. validação
  const linhas = page.locator('[data-testid="aluguel-row"]');
  await expect(linhas.first()).toBeVisible();
});

test("CT12 — Encerrar aluguel (RF10)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Aluguéis");

  await page.waitForLoadState("networkidle");

  const botaoEncerrar = page.getByRole("button", { name: /encerrar/i }).first();

  await expect(botaoEncerrar).toBeVisible();

  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await botaoEncerrar.click();

  // espera UI atualizar
  await page.waitForTimeout(500);

  // valida que o status mudou
  await expect(
    page.getByText(/finalizado/i).first()
  ).toBeVisible();
});