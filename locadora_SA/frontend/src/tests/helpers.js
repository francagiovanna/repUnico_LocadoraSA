export async function loginComoAdmin(page) {
  await page.goto("/");

  await page.locator('input[type="email"]').fill("admin@locadora.sa");

  await page.locator('input[type="password"]').fill("12345");

  await page.getByRole("button", {
    name: /entrar|login/i,
  }).click();

  await page.waitForSelector("text=Dashboard");
}

export async function navegarPara(page, destino) {
  await page.getByRole("button", {
    name: new RegExp(destino, "i"),
  }).click();
}