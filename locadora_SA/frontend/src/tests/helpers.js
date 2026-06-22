export async function loginComoAdmin(page) {
  await page.goto("/");
  await page.getByPlaceholder(/e-mail|email/i).fill("admin@locadora.sa");
  await page.getByPlaceholder(/senha|password/i).fill("12345");
  await page.getByRole("button", { name: /entrar|login/i }).click();
  // .app-layout não existe mais — aguarda texto do dashboard
  await page.waitForSelector("text=Dashboard", { timeout: 5000 });
}

export async function navegarPara(page, nomePagina) {
  await page.getByRole("button", { name: new RegExp(nomePagina, "i") }).click();
}