# Rende+ Premium — versão front-end

Versão **premium** do Rende+, construída a partir da versão grátis e **100% front-end** (sem backend).
Tem **todas as funcionalidades da versão grátis** + as **funcionalidades premium**, e guarda tudo no
`localStorage` do navegador.

## Como abrir

Por causa do Babel no navegador (carrega os `.jsx`), abre com um servidor local — não com duplo clique.

```bash
# na pasta do projeto
python3 -m http.server 5173
# depois abre http://localhost:5173
```

Ou usa a extensão **Live Server** do VS Code (botão direito no `index.html` → "Open with Live Server").

## Estrutura (igual à versão grátis)

```
rende-premium/
├── index.html
├── manifest.webmanifest        # PWA (instalável)
├── sw.js                       # service worker (offline)
├── favicon.* / icon-*.png      # ícones
└── assets/
    ├── css/
    │   └── styles.css          # design system (tema claro/escuro)
    ├── favicon/
    │   └── favicon.ico
    └── js/
        ├── data.js             # catálogo + helpers (BM) + I18N
        ├── api.js              # ⭐ camada de dados em localStorage (sem servidor)
        ├── finance.jsx         # store (auth + dados + seletores)
        ├── components.jsx      # UI partilhada + navegação
        ├── icons.jsx           # ícones (BoxIcons)
        ├── charts.jsx          # gráficos
        ├── screens1.jsx        # Auth, Dashboard, Despesas, Rendimentos
        ├── screens2.jsx        # Poupança, Relatórios, Histórico, Perfil, Definições
        ├── contas.jsx          # Contas ligadas
        ├── landing.jsx         # página de entrada
        ├── premium.jsx         # ⭐ funcionalidades premium
        ├── tweaks-panel.jsx    # painel de personalização (tema/fonte)
        └── app.jsx             # shell + rotas
```

## Funcionalidades

**Da versão grátis (tudo a funcionar):** registo/login, dashboard, despesas, rendimentos,
metas de poupança com depósitos, orçamento, relatórios, histórico, perfil, categorias
personalizadas, multi-moeda, tema claro/escuro e personalização.

**Premium (novas):**
- **Lembretes** — pagamentos com data e aviso ("vence em X dias", marcar pago).
- **Recorrentes** — despesas que se repetem (valor, dia do mês, categoria) + total mensal.
- **Partilha** — grupos com membros e despesas divididas; calcula quanto recebes/pagas.
- **Previsão** — saldo previsto no fim do mês + exportar CSV.

As funcionalidades premium estão **desbloqueadas por defeito** nesta versão.

## Onde estão os dados

Tudo no `localStorage`, por conta:
- `rende_users` — contas (email, nome, moeda…).
- `rende_data_<email>` — despesas, rendimentos, metas, etc.
- `rende_premium_<email>` — lembretes, recorrentes, grupos.

Para recomeçar do zero: apaga estas chaves nas DevTools (Application → Local Storage).

## Ligar a um backend real (mais tarde)

Toda a app fala com o objeto `API` (em `assets/js/api.js`). Esta versão guarda em `localStorage`,
mas a interface é a mesma de um backend (`registar`, `login`, `perfil`, `listar`, `criar`,
`editar`, `apagar`). Para usar um servidor real, basta voltar a pôr a versão do `api.js` que faz
`fetch()` — **o resto da app não muda**.
