import { loginComoAdmin, navegarPara } from "./helpers";
import { test, expect } from "@playwright/test";

test("CT11 — Registrar aluguel (RF09)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Aluguéis");

  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: /\+ novo aluguel/i }).click();

  // selects sem name= — usa combobox por ordem de aparição no modal
  await page.getByRole("combobox").first().selectOption({ index: 1 });
  await page.getByRole("combobox").nth(1).selectOption({ index: 1 });

  await page.locator("input[type='date']").fill("2026-12-31");

  await page.getByRole("button", { name: /salvar/i }).click();

  const linhas = page.locator('[data-testid="aluguel-row"]');
  await expect(linhas.first()).toBeVisible({ timeout: 10000 });
});

test("CT12 — Encerrar aluguel (RF10)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Aluguéis");

  await page.waitForLoadState("networkidle");

  const botaoEncerrar = page.getByRole("button", { name: /encerrar/i }).first();
  await expect(botaoEncerrar).toBeVisible();

  page.on("dialog", async (dialog) => await dialog.accept());
  await botaoEncerrar.click();

  await page.waitForTimeout(500);

  await expect(page.getByText(/finalizado/i).first()).toBeVisible();
});

test("CT16 — Exibir histórico de aluguéis (RF14)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Aluguéis");

  await page.waitForSelector("tbody tr", { timeout: 10000 });

  const linhas = page.locator("tbody tr");
  await expect(linhas).not.toHaveCount(0);

  await expect(page.getByRole("columnheader", { name: /cliente/i })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: /jogo/i })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: /status/i })).toBeVisible();

  const statusCells = page.locator("tbody tr td:nth-child(6)");
  const total = await statusCells.count();
  expect(total).toBeGreaterThan(0);

  for (let i = 0; i < total; i++) {
    // normaliza pra lowercase — CSS uppercase afeta innerText()
    const texto = (await statusCells.nth(i).innerText()).trim().toLowerCase();
    expect(["em aberto", "finalizado"]).toContain(texto);
  }

  await expect(page.getByText(/ativos/i)).toBeVisible();
});