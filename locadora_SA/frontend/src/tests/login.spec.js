import { test, expect } from "@playwright/test";
import { loginComoAdmin } from "./helpers.js";

test.describe("Login e Dashboard", () => {

  test("CT01 — Login válido (RF01)", async ({ page }) => {
    await loginComoAdmin(page);

    await expect(page.locator("body")).toContainText(/dashboard|jogos/i);
  });

  test("CT02 — Login inválido (RF01)", async ({ page }) => {
    await page.goto("/");

    await page.locator('input[type="email"]').fill("errado@teste.com");
    await page.locator('input[type="password"]').fill("senhaerrada");

    await page.getByRole("button", { name: /entrar|login/i }).click();

    await expect(page.getByText(/inválid|erro|credencial/i)).toBeVisible();

    await expect(page.locator("body")).not.toContainText(/dashboard/i);
  });

  test("CT03 — Carregar dashboard (RF02)", async ({ page }) => {
    await loginComoAdmin(page);

    // garante que entrou no sistema
    await expect(page.locator("body")).toContainText(/dashboard/i);

    // valida elementos principais do dashboard
    await expect(page.locator("body")).toContainText(/jogos/i);
    await expect(page.locator("body")).toContainText(/usuários/i);
    await expect(page.locator("body")).toContainText(/alug|aluguéis/i);
  });

});