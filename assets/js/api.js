/* =========================================================
   Rende+ Premium — Camada de dados 100% FRONT-END (localStorage)
   =========================================================
   Esta versão NÃO usa backend. Simula a mesma interface da API
   (registar, login, perfil, listar, criar, editar, apagar) mas
   guarda tudo no localStorage do navegador. Assim toda a app
   funciona exatamente igual, sem servidor.

   Quando quiseres ligar a um backend real, basta voltar a pôr
   aqui a versão que faz fetch() — o resto da app não muda.
   ========================================================= */
const API = (function () {
  const TOKEN_KEY = "rende_token";
  const getToken = () => { try { return localStorage.getItem(TOKEN_KEY) || null; } catch { return null; } };
  const setToken = (t) => { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch {} };

  const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);
  // pequena latência só para a experiência ficar parecida com um servidor real
  const wait = (v) => new Promise((r) => setTimeout(() => r(v), 50));

  const readUsers = () => { try { return JSON.parse(localStorage.getItem("rende_users") || "{}"); } catch { return {}; } };
  const writeUsers = (u) => { try { localStorage.setItem("rende_users", JSON.stringify(u)); } catch {} };

  const EMPTY = () => ({ despesas: [], rendimentos: [], metas: [], aforros: [], contas: [], categorias: [] });
  const dataKey = (email) => "rende_data_" + email;
  const readData = (email) => { try { return JSON.parse(localStorage.getItem(dataKey(email))) || EMPTY(); } catch { return EMPTY(); } };
  const writeData = (email, d) => { try { localStorage.setItem(dataKey(email), JSON.stringify(d)); } catch {} };

  const emailFromToken = () => { const t = getToken(); return t && t.indexOf("tok_") === 0 ? t.slice(4) : null; };
  const currentEmail = () => { const e = emailFromToken(); if (!e) throw new Error("Sessão inválida. Inicia sessão."); return e; };

  // ---------- autenticação ----------
  async function registar({ email, password, nome, moeda }) {
    email = (email || "").trim().toLowerCase();
    if (!email || !password || !nome) throw new Error("Preenche nome, email e palavra-passe.");
    const users = readUsers();
    if (users[email]) throw new Error("Já existe uma conta com este email.");
    users[email] = { email, password, nome, moeda: moeda || "EUR", poupancaPct: 20, orcamento: null };
    writeUsers(users);
    if (!localStorage.getItem(dataKey(email))) writeData(email, EMPTY());
    return wait({ token: "tok_" + email, user: { email, nome, moeda: moeda || "EUR" } });
  }
  async function login({ email, password }) {
    email = (email || "").trim().toLowerCase();
    const u = readUsers()[email];
    if (!u || u.password !== password) throw new Error("Email ou palavra-passe incorretos.");
    return wait({ token: "tok_" + email, user: { email: u.email, nome: u.nome, moeda: u.moeda } });
  }
  async function perfil() {
    const u = readUsers()[currentEmail()];
    if (!u) throw new Error("Sessão inválida.");
    return wait({ email: u.email, nome: u.nome, moeda: u.moeda, poupancaPct: u.poupancaPct ?? 20, orcamento: u.orcamento ?? null });
  }
  async function atualizarPerfil(patch) {
    const email = currentEmail(); const users = readUsers();
    users[email] = { ...users[email], ...patch }; writeUsers(users);
    return wait(users[email]);
  }

  // ---------- CRUD genérico ----------
  async function listar(recurso) {
    const d = readData(currentEmail());
    if (recurso === "metas") {
      return wait((d.metas || []).map((m) => ({ ...m, aforros: (d.aforros || []).filter((a) => a.metaId === m.id) })));
    }
    return wait([...(d[recurso] || [])]);
  }
  async function criar(recurso, corpo) {
    const email = currentEmail(); const d = readData(email);
    const obj = { id: uid(), ...corpo };
    d[recurso] = [...(d[recurso] || []), obj]; writeData(email, d);
    return wait(obj);
  }
  async function editar(recurso, id, patch) {
    const email = currentEmail(); const d = readData(email); let res = null;
    d[recurso] = (d[recurso] || []).map((x) => (x.id === id ? (res = { ...x, ...patch }) : x));
    writeData(email, d);
    return wait(res || { id, ...patch });
  }
  async function apagar(recurso, id) {
    const email = currentEmail(); const d = readData(email);
    d[recurso] = (d[recurso] || []).filter((x) => x.id !== id);
    if (recurso === "metas") d.aforros = (d.aforros || []).filter((a) => a.metaId !== id);
    writeData(email, d);
    return wait({ ok: true });
  }

  return { BASE: "local", getToken, setToken, registar, login, perfil, atualizarPerfil, listar, criar, editar, apagar };
})();
window.API = API;
