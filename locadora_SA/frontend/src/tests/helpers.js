import { expect } from "@playwright/test";

export async function loginComoAdmin(page) {
  await page.goto("/");

  await page.locator('input[type="email"]').fill("admin@locadora.sa");
  await page.locator('input[type="password"]').fill("12345");

  await page.getByRole("button", {
    name: /entrar|login/i,
  }).click();

  // espera a navegação real acontecer
  await page.waitForLoadState("networkidle");

  // validação mais flexível (não depende de texto exato)
  await expect(page.locator("body")).toContainText(/dashboard|jogos/i);
}

export async function navegarPara(page, destino) {
  await page.getByRole("button", {
    name: new RegExp(destino, "i"),
  }).click();

  await page.waitForLoadState("networkidle");
}