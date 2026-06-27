/* ===== Landing page (versão Premium) ===== */
function Landing({ onCreate, onLogin, theme, setTheme, lang, setLang }) {
  // moeda que vai rodando no cartão flutuante (mantém o destaque das moedas)
  const PREVIEW_ORDER = ["EUR", "BRL", "USD", "AOA", "GBP", "CVE", "MZN", "CAD"];
  const PREVIEW_FX = { EUR: 1, USD: 1.08, GBP: 0.85, CAD: 1.48, BRL: 6.2, AOA: 950, CVE: 110.27, MZN: 69 };
  const [pcur, setPcur] = React.useState("EUR");
  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % PREVIEW_ORDER.length; setPcur(PREVIEW_ORDER[i]); }, 2600);
    return () => clearInterval(id);
  }, []);
  const fmtP = (n) => {
    const c = (BM.currencies && BM.currencies[pcur]) || { sym: "€", pos: "before", space: true, locale: "pt-PT", dec: 2 };
    const places = c.dec != null ? c.dec : 2;
    const v = (n * (PREVIEW_FX[pcur] || 1)).toLocaleString(c.locale || "pt-PT", { minimumFractionDigits: places, maximumFractionDigits: places });
    return c.pos === "after" ? `${v}\u00A0${c.sym}` : `${c.sym}${c.space ? "\u00A0" : ""}${v}`;
  };

  const feats = [
    ["wallet", "var(--accent)", "Tudo num só sítio", "Rendimentos, despesas e poupança lado a lado. Sabes para onde vai cada euro sem andares a saltar entre apps."],
    ["target", "var(--c-transporte)", "Metas que cumpres", "Defines um objetivo, separas um valor todos os meses e vês a barra a encher até lá chegares."],
    ["piechart", "var(--c-educacao)", "Vês onde gastas", "Gráficos simples mostram as categorias que mais pesam no teu mês, para decidires com calma."],
  ];
  const premium = [
    ["bell", "Lembretes de pagamento", "Avisamos-te antes de cada conta vencer: a renda, a Netflix, o seguro. Deixas de pagar juros só por esquecimento."],
    ["repeat", "Despesas recorrentes", "Registas uma vez aquilo que se repete todos os meses e o Rende+ trata de lançar sozinho."],
    ["users", "Orçamentos partilhados", "Divides a casa, a viagem ou o jantar com quem quiseres, e o sistema diz quem deve a quem."],
    ["trend", "Previsão e relatórios", "Vês como o mês vai terminar antes de ele acabar e descarregas tudo em PDF ou Excel quando precisares."],
  ];
  const steps = [
    ["user", "Cria a tua conta", "Leva menos de um minuto e os teus dados ficam contigo."],
    ["coins", "Regista o que entra", "Adicionas os teus rendimentos do mês, seja salário, bolsa ou freelance."],
    ["wallet", "Acompanha o que sai", "Lanças as despesas e o Rende+ organiza tudo por categoria."],
    ["trend", "Decide com clareza", "Com o resumo à frente, sabes quanto podes poupar e quanto podes gastar."],
  ];
  const sobre = [
    ["flag", "Um objetivo claro", "Ajudar os jovens a perceber para onde vai o dinheiro e a ganhar confiança com as suas contas."],
    ["shield", "Privacidade a sério", "Os teus números são teus. Nada é vendido nem partilhado com terceiros."],
    ["smile", "Feito para pessoas reais", "Linguagem simples, sem termos de banco, pensado para o dia a dia de quem está a começar."],
  ];

  const goSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", window.location.pathname + window.location.search);
  };
  const goTop = (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); history.replaceState(null, "", window.location.pathname + window.location.search); };

  return (
    <div className="lp">
      <header className="lp-header">
        <a href="#" onClick={goTop} style={{ textDecoration: "none", cursor: "pointer" }} aria-label="Ir para o topo"><Brand /></a>
        <nav className="lp-nav">
          <a href="#funcionalidades" onClick={(e) => goSection(e, "funcionalidades")}>Funcionalidades</a>
          <a href="#premium" onClick={(e) => goSection(e, "premium")}>Premium</a>
          <a href="#como-funciona" onClick={(e) => goSection(e, "como-funciona")}>Como funciona</a>
          <a href="#moedas" onClick={(e) => goSection(e, "moedas")}>Moedas</a>
        </nav>
        <div className="lp-header-actions">
          {setLang && (
            <select className="lp-lang" value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Idioma" title="Idioma">
              {(I18N.SUP || ["pt"]).map((l) => <option key={l} value={l}>{(I18N.LABELS && I18N.LABELS[l]) || l}</option>)}
            </select>
          )}
          <button className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Mudar tema"><Icon name={theme === "dark" ? "sun" : "moon"} size={18} /></button>
          <button className="btn btn-ghost" onClick={onLogin}>Entrar</button>
          <button className="btn btn-primary" onClick={onCreate}>Criar conta</button>
        </div>
      </header>

      <div className="lp-main">
        {/* HERO */}
        <section className="lp-hero">
          <div>
            <span className="lp-eyebrow"><Icon name="star" size={14} /> A versão completa do Rende+</span>
            <h1 className="lp-h1">As tuas finanças, finalmente <span className="accent">debaixo de olho</span>.</h1>
            <p className="lp-sub">O Rende+ Premium reúne tudo o que precisas para organizar o teu dinheiro: lembretes, despesas que se repetem, contas partilhadas e uma previsão do teu mês. Simples, em português e na tua moeda.</p>
            <div className="lp-cta">
              <button className="btn btn-primary" style={{ padding: "13px 22px", fontSize: 15 }} onClick={onCreate}><Icon name="rocket" size={16} color="#fff" /> Começar agora</button>
              <button className="btn btn-ghost" style={{ padding: "13px 22px", fontSize: 15 }} onClick={onLogin}>Já tenho conta</button>
            </div>
            <div className="lp-trust">
              <span className="lp-trust-item"><Icon name="check" size={16} color="var(--accent)" /> Sem anúncios</span>
              <span className="lp-trust-item"><Icon name="check" size={16} color="var(--accent)" /> Os dados são teus</span>
              <span className="lp-trust-item"><Icon name="check" size={16} color="var(--accent)" /> {Object.keys(BM.currencies).length} moedas</span>
            </div>
          </div>

          <div className="lp-app-wrap">
            <img className="lp-app" src="assets/img/rende-app.png" alt="Painel do Rende+ Premium" />
            <div className="lp-float lp-float-a">
              <div className="row" style={{ gap: 10 }}>
                <span className="li-ico" style={{ width: 34, height: 34, background: "var(--accent-soft)" }}><Icon name="target" size={16} color="var(--accent)" sw={2} /></span>
                <div><div className="tiny muted" style={{ fontWeight: 700 }}>Poupança do mês</div><div key={pcur} className="tnum cur-fade" style={{ fontWeight: 700, fontSize: 15 }}>{fmtP(95)}</div></div>
              </div>
            </div>
            <div className="lp-float lp-float-b">
              <div className="tiny muted" style={{ fontWeight: 700, marginBottom: 4 }}>Na tua moeda</div>
              <div className="row" style={{ gap: 8, alignItems: "center" }}>
                <span key={pcur} className="cur-pill cur-fade">{pcur}</span>
                <span key={"v" + pcur} className="tnum cur-fade" style={{ fontWeight: 700, fontSize: 15 }}>{fmtP(317)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* FUNCIONALIDADES */}
        <section className="lp-feats" id="funcionalidades">
          <div className="lp-feats-head">
            <h2>Tudo o que precisas de saber sobre o teu dinheiro</h2>
            <p>O essencial da versão gratuita, agora com mais força. Vês o panorama completo num relance.</p>
          </div>
          <div className="lp-feat-grid">
            {feats.map(([ic, col, title, d]) => (
              <div className="lp-feat" key={title}>
                <div className="lp-feat-ico" style={{ background: `color-mix(in srgb, ${col} 15%, transparent)` }}><Icon name={ic} size={23} color={col} sw={1.9} /></div>
                <h3>{title}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PREMIUM */}
        <section className="lp-feats lp-premium" id="premium">
          <div className="lp-feats-head">
            <span className="lp-eyebrow" style={{ marginBottom: 16 }}><Icon name="star" size={13} /> Só no Premium</span>
            <h2>O que vais encontrar na versão Premium</h2>
            <p>As ferramentas que fazem a diferença ao fim do mês, pensadas para te pouparem tempo e dinheiro.</p>
          </div>
          <div className="lp-prem-grid">
            {premium.map(([ic, title, d]) => (
              <div className="lp-feat lp-prem-card" key={title}>
                <div className="lp-feat-ico" style={{ background: "var(--accent-soft)" }}><Icon name={ic} size={22} color="var(--accent)" sw={1.9} /></div>
                <div><h3>{title}</h3><p>{d}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="lp-feats" id="como-funciona">
          <div className="lp-feats-head">
            <h2>Como funciona</h2>
            <p>Quatro passos e ficas com o teu mês organizado. Sem folhas de cálculo nem complicações.</p>
          </div>
          <div className="lp-feat-grid lp-steps">
            {steps.map(([ic, title, d], i) => (
              <div className="lp-feat lp-step" key={title}>
                <span className="lp-step-n">{i + 1}</span>
                <div className="lp-feat-ico" style={{ background: "var(--accent-soft)" }}><Icon name={ic} size={22} color="var(--accent)" sw={1.9} /></div>
                <h3>{title}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MOEDAS */}
        <section className="lp-curr" id="moedas">
          <div>
            <h3>Funciona na tua moeda</h3>
            <p>Quer estejas em Portugal, no Brasil ou em Angola, o Rende+ mostra os valores na moeda do teu país.</p>
          </div>
          <div className="lp-curr-chips">
            {Object.values(BM.currencies).map((c) => (
              <span className="lp-curr-chip" key={c.code}><span className="lp-curr-sym">{c.sym}</span> {c.code}</span>
            ))}
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="lp-about">
          <div className="lp-feats-head" style={{ marginBottom: 28 }}>
            <h2>Sobre o Rende+</h2>
            <p>Um projeto criado para ajudar quem está a começar a sua vida financeira a ganhar controlo e tranquilidade.</p>
          </div>
          <div className="lp-about-grid">
            {sobre.map(([ic, title, d]) => (
              <div className="lp-feat lp-prem-card" key={title}>
                <div className="lp-feat-ico" style={{ background: "var(--accent-soft)" }}><Icon name={ic} size={22} color="var(--accent)" sw={1.9} /></div>
                <div><h3>{title}</h3><p>{d}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="lp-cta-final">
          <h2>Pronto para começares?</h2>
          <p>Cria a tua conta e organiza o teu próximo mês ainda hoje.</p>
          <div className="row" style={{ gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" style={{ padding: "14px 26px", fontSize: 15.5 }} onClick={onCreate}><Icon name="rocket" size={16} color="#fff" /> Criar conta grátis</button>
            <button className="btn btn-ghost" style={{ padding: "14px 26px", fontSize: 15.5 }} onClick={onLogin}>Entrar</button>
          </div>
        </section>
      </div>

      <footer className="lp-footer">
        <div className="lp-footer-in">
          <a href="#" onClick={goTop} style={{ textDecoration: "none", cursor: "pointer" }} aria-label="Ir para o topo"><Brand size={30} /></a>
          <span className="muted">© {new Date().getFullYear()} Rende+. Feito em Portugal.</span>
          <div className="row" style={{ marginLeft: "auto", gap: 8 }}>
            <button className="btn btn-ghost" onClick={onLogin}>Entrar</button>
            <button className="btn btn-primary" onClick={onCreate}>Criar conta</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
window.Landing = Landing;