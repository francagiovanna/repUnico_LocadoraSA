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

// ─── CT06 — Listar jogos ───────────────────────────────────────────────────

test("CT06 — Listar jogos (RF04)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Jogos");

  await page.waitForSelector("tbody tr", { timeout: 10000 });

  const linhas = page.locator("tbody tr");
  await expect(linhas).not.toHaveCount(0);

  // Usa columnheader para evitar ambiguidade com texto do subtítulo
  await expect(page.getByRole("columnheader", { name: /título/i })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: /plataforma/i })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: /estoque/i })).toBeVisible();
});

test("CT07 — Editar jogo (RF05)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Jogos");

  await page.waitForSelector("tbody tr", { timeout: 10000 });

  const tituloOriginal = await page
    .locator("tbody tr").first()
    .locator("strong").innerText();

  const tituloEditado = `${tituloOriginal} EDITADO ${Date.now()}`;

  await page
    .locator("tbody tr").first()
    .getByRole("button", { name: /editar/i })
    .click();

  await expect(page.getByText(/editar jogo/i)).toBeVisible();

  // nth(1) porque nth(0) é a barra de busca no background
  const inputTitulo = page.getByRole("textbox").nth(1);
  await inputTitulo.clear();
  await inputTitulo.fill(tituloEditado);

  await page.getByRole("button", { name: /^salvar$/i }).click();

  await expect(
    page.getByRole("button", { name: /^salvar$/i })
  ).toBeHidden({ timeout: 5000 });

  await page.waitForSelector("tbody tr", { timeout: 10000 });

  await expect(page.locator("tbody")).toContainText(tituloEditado, {
    timeout: 10000,
  });
});

test("CT08 — Excluir jogo (RF06)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Jogos");

  // Cria um jogo específico para excluir (isolamento)
  const titulo = `Jogo Para Excluir ${Date.now()}`;

  await page.getByRole("button", { name: /\+ novo jogo/i }).click();
  await page.getByRole("textbox").nth(1).fill(titulo);
  await page.getByRole("combobox").first().selectOption("Ação");
  await page.getByRole("combobox").nth(1).selectOption("PS5");
  await page.getByRole("spinbutton").first().fill("10");
  await page.getByRole("spinbutton").nth(1).fill("1");
  await page.getByRole("button", { name: /^salvar$/i }).click();
  await expect(
    page.getByRole("button", { name: /^salvar$/i })
  ).toBeHidden({ timeout: 5000 });

  // Confirma que o jogo aparece na tabela
  await expect(page.locator("tbody")).toContainText(titulo, {
    timeout: 10000,
  });

  // Aceita o confirm() automaticamente
  page.on("dialog", (dialog) => dialog.accept());

  // Clica em Excluir na linha do jogo criado
  await page
    .getByRole("row")
    .filter({ hasText: titulo })
    .getByRole("button", { name: /excluir/i })
    .click();

  // Aguarda a linha sumir
  await expect(
    page.getByRole("row").filter({ hasText: titulo })
  ).toHaveCount(0, { timeout: 10000 });
});
// ─── CT15 — Buscar jogo por nome ──────────────────────────────────────────

test("CT15 — Buscar jogo por nome (RF13)", async ({ page }) => {
  await loginComoAdmin(page);
  await navegarPara(page, "Jogos");

  // Aguarda pelo menos 1 jogo carregado
  await page.waitForSelector("tbody tr", { timeout: 10000 });

  // Pega o título do primeiro jogo da tabela pra usar como termo de busca
  const tituloBuscado = await page
    .locator("tbody tr").first()
    .locator("strong").innerText();

  // Pega as primeiras 4 letras como termo parcial (valida busca parcial)
  const termoBusca = tituloBuscado.substring(0, 4);

  // Digita na barra de busca (primeiro textbox da página, antes do modal)
  await page.getByRole("textbox").first().fill(termoBusca);

  // Aguarda DOM reagir ao filtro (é client-side, não precisa de timeout grande)
  await page.waitForTimeout(300);

  // Todas as linhas visíveis devem conter o termo buscado
  const linhas = page.locator("tbody tr");
  const total = await linhas.count();

  expect(total).toBeGreaterThan(0);

  for (let i = 0; i < total; i++) {
    const texto = await linhas.nth(i).innerText();
    expect(texto.toLowerCase()).toContain(termoBusca.toLowerCase());
  }

  // Limpa busca e confirma que todos os jogos voltam
  await page.getByRole("textbox").first().clear();
  await page.waitForTimeout(300);

  const linhasDepoisLimpar = page.locator("tbody tr");
  await expect(linhasDepoisLimpar).not.toHaveCount(0);
  expect(await linhasDepoisLimpar.count()).toBeGreaterThanOrEqual(total);
});


