/**
 * helpers.js — funções reutilizáveis para os testes Playwright
 */

/**
 * Faz login como admin e aguarda o dashboard carregar.
 * Funciona com a página de Login que chama onLogin(user) via estado.
 */
export async function loginComoAdmin(page) {
  await page.goto("/");

  // Preenche email e senha
  await page.getByPlaceholder(/e-mail|email/i).fill("admin@locadora.sa");
  await page.getByPlaceholder(/senha|password/i).fill("12345");

  // Clica no botão de entrar (texto variável: "Entrar", "Login", etc.)
  await page.getByRole("button", { name: /entrar|login/i }).click();

  // Aguarda algum elemento exclusivo do layout autenticado aparecer
  await page.waitForSelector(".app-layout", { timeout: 5000 });
}

/**
 * Navega para uma página pelo texto do link na Sidebar.
 * Ex.: navegarPara(page, "Jogos")
 */
export async function navegarPara(page, nomePagina) {
  await page.getByRole("button", { name: new RegExp(nomePagina, "i") }).click();
}