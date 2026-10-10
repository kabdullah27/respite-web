<script>
  import { copy, REPO, KOFI, TIP, VERSION } from './copy.js'
  import ScanDemo from './ScanDemo.svelte'

  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null
  let lang = $state(stored ?? (navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en'))
  const t = $derived(copy[lang])

  $effect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('lang', lang)
  })

  const shots = ['/screens/home.webp', '/screens/uninstaller.webp', '/screens/memory.webp', '/screens/diagnostic.webp', '/screens/keyboard.webp']
  let shot = $state(0)

  const xattr = 'xattr -cr /Applications/Respite.app'
  let copied = $state(false)
  async function copyCmd() {
    try {
      await navigator.clipboard.writeText(xattr)
      copied = true
      setTimeout(() => (copied = false), 1600)
    } catch {
      // Clipboard can be blocked; the command is still selectable on screen.
    }
  }
</script>

<header>
  <div class="wrap bar">
    <a href="/" class="brand">
      <img src="/favicon.png" alt="" width="28" height="28" />
      <span>Respite</span>
    </a>
    <nav aria-label="Sections">
      <a href="#tools">{t.nav.tools}</a>
      <a href="#safety">{t.nav.safety}</a>
      <a href="#faq">{t.nav.faq}</a>
    </nav>
    <div class="right">
      <div class="lang" role="group" aria-label={t.langLabel}>
        <button type="button" aria-pressed={lang === 'en'} onclick={() => (lang = 'en')}>EN</button>
        <button type="button" aria-pressed={lang === 'id'} onclick={() => (lang = 'id')}>ID</button>
      </div>
      <a class="get" href="#download">{t.nav.download}</a>
    </div>
  </div>
</header>

<main>
  <section class="wrap hero">
    <div class="pitch">
      <h1>{t.hero.title}</h1>
      <p class="lede">{t.hero.lede}</p>
      <div class="cta">
        <a class="btn" href={KOFI} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M10 2.5a.9.9 0 0 1 .9.9v8.1l2.6-2.6a.9.9 0 1 1 1.27 1.27l-4.14 4.14a.9.9 0 0 1-1.26 0L5.23 10.17A.9.9 0 1 1 6.5 8.9l2.6 2.6V3.4a.9.9 0 0 1 .9-.9ZM4 15.6h12a.9.9 0 0 1 0 1.8H4a.9.9 0 0 1 0-1.8Z" />
          </svg>
          {t.hero.download}
        </a>
        <div class="terms">
          <p>{t.hero.price}</p>
          <p>{t.hero.req}</p>
        </div>
      </div>
      <a class="quiet" href={REPO} target="_blank" rel="noopener noreferrer">{t.hero.source}</a>
    </div>
    <ScanDemo t={t.demo} />
  </section>

  <section id="tools" class="wrap block">
    <div class="intro">
      <h2>{t.tools.title}</h2>
      <p>{t.tools.lede}</p>
    </div>
    <div class="groups">
      {#each t.tools.groups as g}
        <div class="group">
          <h3>{g.name}</h3>
          <ul>
            {#each g.items as [name, line]}
              <li><strong>{name}</strong><span>{line}</span></li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <section id="safety" class="wrap block">
    <div class="intro">
      <h2>{t.flow.title}</h2>
    </div>
    <ol class="flow">
      {#each t.flow.steps as [head, body], i}
        <li>
          <span class="step" aria-hidden="true">{i + 1}</span>
          <h3>{head}</h3>
          <p>{body}</p>
        </li>
      {/each}
    </ol>
  </section>

  <section class="honest">
    <div class="wrap">
      <div class="intro">
        <h2>{t.honest.title}</h2>
        <p>{t.honest.lede}</p>
      </div>
      <ul>
        {#each t.honest.items as [claim, truth]}
          <li>
            <p class="claim">{claim}</p>
            <p>{truth}</p>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="wrap block screens">
    <div class="screens-head">
      <h2>{t.screens.title}</h2>
      <div class="seg" role="tablist" aria-label={t.screens.title}>
        {#each t.screens.tabs as tab, i}
          <button
            type="button"
            role="tab"
            id="shot-tab-{i}"
            aria-selected={shot === i}
            aria-controls="shot-panel"
            onclick={() => (shot = i)}>{tab}</button>
        {/each}
      </div>
    </div>
    <div class="frame" id="shot-panel" role="tabpanel" aria-labelledby="shot-tab-{shot}">
      <img src={shots[shot]} alt={t.screens.alts[shot]} width="1360" height="900" loading="lazy" />
    </div>
  </section>

  <section class="wrap block quote">
    <blockquote>
      <p>{t.quote.text}</p>
      <footer>{t.quote.who}, <span>{t.quote.role}</span></footer>
    </blockquote>
  </section>

  <section id="faq" class="wrap block faq">
    <h2>{t.faq.title}</h2>
    <div class="qa">
      {#each t.faq.items as [q, a]}
        <details>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      {/each}
    </div>
  </section>

  <section id="download" class="wrap block">
    <div class="get-it">
      <div class="get-main">
        <img src="/favicon.png" alt="" width="72" height="72" class="icon" />
        <h2>{t.download.title} {VERSION}</h2>
        <p>{t.download.lede}</p>
        <div class="get-actions">
          <a class="btn" href={KOFI} target="_blank" rel="noopener noreferrer">{t.download.button}</a>
          <a class="quiet" href={TIP} target="_blank" rel="noopener noreferrer">{t.download.tip}</a>
        </div>
      </div>
      <div class="gate">
        <h3>{t.download.gateTitle}</h3>
        <p>{t.download.gateBody}</p>
        <ol>
          {#each t.download.gate as step}<li>{step}</li>{/each}
        </ol>
        <div class="cmd">
          <code>{xattr}</code>
          <button type="button" onclick={copyCmd}>{copied ? t.download.copied : t.download.copy}</button>
        </div>
      </div>
    </div>
    <dl class="specs">
      {#each t.download.specs as [k, v]}
        <div><dt>{k}</dt><dd>{v}</dd></div>
      {/each}
    </dl>
  </section>
</main>

<footer class="site">
  <div class="wrap">
    <p>{t.footer.line}</p>
    <div>
      <a href={REPO} target="_blank" rel="noopener noreferrer">{t.footer.github}</a>
      <a href={TIP} target="_blank" rel="noopener noreferrer">{t.footer.kofi}</a>
    </div>
  </div>
</footer>

<style>
  .wrap {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 32px;
  }

  /* Header */
  header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(230, 236, 234, 0.86);
    backdrop-filter: saturate(1.4) blur(14px);
    -webkit-backdrop-filter: saturate(1.4) blur(14px);
    border-bottom: 1px solid rgba(18, 48, 42, 0.08);
  }

  .bar {
    display: flex;
    align-items: center;
    gap: 32px;
    height: 64px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    font-weight: 800;
    font-size: 19px;
    letter-spacing: -0.02em;
  }

  .brand img {
    border-radius: 7px;
  }

  nav {
    display: flex;
    gap: 26px;
  }

  nav a {
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    color: var(--slate);
  }

  nav a:hover {
    color: var(--pine);
  }

  .right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .lang {
    display: flex;
    background: rgba(18, 48, 42, 0.07);
    border-radius: 8px;
    padding: 2px;
  }

  .lang button {
    font: inherit;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--slate);
    background: none;
    border: 0;
    padding: 4px 9px;
    border-radius: 6px;
    cursor: pointer;
  }

  .lang button[aria-pressed='true'] {
    background: var(--sheet);
    color: var(--pine);
    box-shadow: 0 1px 2px rgba(18, 48, 42, 0.12);
  }

  .get {
    text-decoration: none;
    font-size: 14.5px;
    font-weight: 600;
    color: #fff;
    background: var(--pine);
    padding: 7px 15px;
    border-radius: 8px;
  }

  .get:hover {
    background: #1d443b;
  }

  /* Hero */
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.04fr);
    gap: 72px;
    align-items: center;
    padding-top: 88px;
    padding-bottom: 120px;
  }

  h1 {
    font-size: clamp(48px, 6.6vw, 88px);
    font-weight: 800;
    line-height: 0.96;
    letter-spacing: -0.045em;
    text-wrap: balance;
  }

  .lede {
    margin-top: 28px;
    font-size: 19px;
    line-height: 1.55;
    color: var(--slate);
    max-width: 42ch;
  }

  .cta {
    margin-top: 36px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    text-decoration: none;
    font-size: 17px;
    font-weight: 600;
    color: #fff;
    background: var(--teal);
    padding: 14px 24px;
    border-radius: 11px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 1px 2px rgba(15, 110, 86, 0.3);
  }

  .btn:hover {
    background: var(--teal-deep);
  }

  .terms p {
    font-size: 14px;
    line-height: 1.45;
    color: var(--slate);
  }

  .terms p:first-child {
    color: var(--pine);
    font-weight: 600;
  }

  .quiet {
    display: inline-block;
    margin-top: 28px;
    font-size: 15px;
    font-weight: 500;
    color: var(--slate);
    text-decoration: underline;
    text-decoration-color: var(--line);
    text-underline-offset: 4px;
  }

  .quiet:hover {
    color: var(--pine);
    text-decoration-color: currentColor;
  }

  /* Shared section rhythm */
  .block {
    padding-bottom: 136px;
  }

  h2 {
    font-size: clamp(32px, 3.8vw, 48px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.035em;
    text-wrap: balance;
  }

  .intro {
    max-width: 640px;
    margin-bottom: 48px;
  }

  .intro p {
    margin-top: 16px;
    font-size: 18px;
    color: var(--slate);
  }

  /* Tools: grouped like the app's sidebar */
  .groups {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
    align-items: start;
  }

  .group h3 {
    font-size: 15px;
    font-weight: 600;
    color: var(--slate);
    margin: 0 0 10px 16px;
  }

  .group ul {
    list-style: none;
    background: var(--sheet);
    border-radius: 12px;
    box-shadow: 0 0 0 1px rgba(18, 48, 42, 0.07);
  }

  .group li {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 14px 16px;
  }

  .group li + li {
    border-top: 1px solid #e3e9e6;
  }

  .group strong {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .group span {
    font-size: 14.5px;
    line-height: 1.45;
    color: var(--slate);
  }

  /* Flow: a real sequence, so it gets numbers */
  .flow {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 28px;
    position: relative;
  }

  .flow::before {
    content: '';
    position: absolute;
    top: 17px;
    left: 18px;
    right: 18px;
    height: 2px;
    background: linear-gradient(90deg, var(--teal-glow), var(--teal) 80%, var(--pine));
    opacity: 0.45;
  }

  .step {
    position: relative;
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--fog);
    border: 2px solid var(--teal);
    color: var(--teal-deep);
    font-weight: 800;
    font-size: 15px;
    font-variant-numeric: tabular-nums;
  }

  .flow li:last-child .step {
    background: var(--teal);
    color: #fff;
  }

  .flow h3 {
    margin-top: 20px;
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.015em;
  }

  .flow p {
    margin-top: 8px;
    font-size: 15px;
    line-height: 1.55;
    color: var(--slate);
  }

  /* Honest band: the page's one dark moment */
  .honest {
    background: var(--pine);
    color: #e3ece8;
    padding: 112px 0 120px;
    margin-bottom: 136px;
  }

  .honest h2 {
    color: #fff;
  }

  .honest .intro p {
    color: #a9bdb6;
  }

  .honest ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 48px;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    padding-top: 36px;
  }

  .honest .claim {
    font-size: 23px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: #fff;
    text-decoration: line-through;
    text-decoration-color: var(--teal-glow);
    text-decoration-thickness: 2px;
    margin-bottom: 14px;
  }

  .honest li p:last-child {
    font-size: 16px;
    color: #a9bdb6;
  }

  /* Screens */
  .screens-head {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 28px;
  }

  .seg {
    display: flex;
    background: rgba(18, 48, 42, 0.07);
    border-radius: 10px;
    padding: 3px;
    overflow-x: auto;
  }

  .seg button {
    font: inherit;
    font-size: 14.5px;
    font-weight: 500;
    color: var(--slate);
    background: none;
    border: 0;
    border-radius: 8px;
    padding: 7px 14px;
    white-space: nowrap;
    cursor: pointer;
  }

  .seg button[aria-selected='true'] {
    background: var(--sheet);
    color: var(--pine);
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(18, 48, 42, 0.14);
  }

  .frame {
    border-radius: 14px;
    overflow: hidden;
    background: #1e1e1e;
    box-shadow: 0 0 0 0.5px rgba(18, 48, 42, 0.3), 0 30px 60px -24px rgba(18, 48, 42, 0.4);
  }

  .frame img {
    width: 100%;
    height: auto;
  }

  /* Quote */
  .quote blockquote {
    max-width: 880px;
  }

  .quote blockquote p {
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: -0.02em;
    text-wrap: pretty;
  }

  .quote footer {
    margin-top: 24px;
    font-size: 16px;
    font-weight: 700;
  }

  .quote footer span {
    font-weight: 400;
    color: var(--slate);
  }

  /* FAQ */
  .faq {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 48px;
  }

  .qa {
    border-top: 1px solid var(--line);
  }

  details {
    border-bottom: 1px solid var(--line);
  }

  summary {
    list-style: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    padding: 20px 0;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::after {
    content: '';
    flex: none;
    width: 9px;
    height: 9px;
    border-right: 2px solid var(--slate);
    border-bottom: 2px solid var(--slate);
    transform: translateY(-3px) rotate(45deg);
    transition: transform 0.2s ease;
  }

  details[open] summary::after {
    transform: translateY(2px) rotate(-135deg);
  }

  details p {
    padding-bottom: 22px;
    max-width: 62ch;
    color: var(--slate);
    font-size: 16.5px;
  }

  /* Download */
  .get-it {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    background: var(--sheet);
    border-radius: 20px;
    box-shadow: 0 0 0 1px rgba(18, 48, 42, 0.07), 0 20px 40px -24px rgba(18, 48, 42, 0.25);
    overflow: hidden;
  }

  .get-main {
    padding: 56px;
  }

  .icon {
    border-radius: 16px;
    margin-bottom: 28px;
  }

  .get-main > p {
    margin-top: 14px;
    font-size: 18px;
    color: var(--slate);
    max-width: 40ch;
  }

  .get-actions {
    display: flex;
    align-items: baseline;
    gap: 24px;
    flex-wrap: wrap;
    margin-top: 32px;
  }

  .get-actions .quiet {
    margin-top: 0;
  }

  .gate {
    padding: 56px 48px;
    background: #eef3f1;
    border-left: 1px solid #e0e7e4;
  }

  .gate h3 {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.015em;
  }

  .gate > p {
    margin-top: 8px;
    font-size: 15px;
    color: var(--slate);
  }

  .gate ol {
    margin: 18px 0 0 20px;
    font-size: 15px;
    display: grid;
    gap: 8px;
  }

  .cmd {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--pine);
    border-radius: 9px;
    padding: 6px 6px 6px 14px;
  }

  .cmd code {
    flex: 1;
    min-width: 0;
    font-family: ui-monospace, 'SF Mono', Menlo, monospace;
    font-size: 13.5px;
    color: #d6efe5;
    overflow-x: auto;
    white-space: nowrap;
  }

  .cmd button {
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    color: var(--pine);
    background: #d6efe5;
    border: 0;
    border-radius: 6px;
    padding: 5px 11px;
    cursor: pointer;
    min-width: 72px;
  }

  .specs {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid var(--line);
  }

  .specs div {
    padding: 16px 0;
    border-bottom: 1px solid var(--line);
    display: flex;
    gap: 16px;
  }

  .specs dt {
    flex: none;
    width: 92px;
    font-size: 14.5px;
    color: var(--slate);
  }

  .specs dd {
    font-size: 14.5px;
    font-weight: 600;
  }

  /* Footer */
  .site {
    border-top: 1px solid var(--line);
    padding: 32px 0 48px;
  }

  .site .wrap {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 14.5px;
    color: var(--slate);
  }

  .site .wrap div {
    display: flex;
    gap: 22px;
  }

  .site a {
    text-decoration: none;
  }

  .site a:hover {
    color: var(--pine);
    text-decoration: underline;
  }

  /* Responsive */
  @media (max-width: 1000px) {
    .hero {
      grid-template-columns: 1fr;
      gap: 56px;
      padding-top: 56px;
    }

    .groups,
    .honest ul {
      grid-template-columns: 1fr 1fr;
    }

    .flow {
      grid-template-columns: 1fr;
      gap: 0;
    }

    .flow::before {
      top: 18px;
      bottom: 18px;
      left: 17px;
      right: auto;
      width: 2px;
      height: auto;
      background: linear-gradient(180deg, var(--teal-glow), var(--teal) 80%, var(--pine));
    }

    .flow li {
      display: grid;
      grid-template-columns: 36px 1fr;
      column-gap: 20px;
      padding-bottom: 28px;
    }

    .flow .step {
      grid-row: span 2;
    }

    .flow h3 {
      margin-top: 4px;
    }

    .get-it {
      grid-template-columns: minmax(0, 1fr);
    }

    .gate {
      border-left: 0;
      border-top: 1px solid #e0e7e4;
    }

    .specs {
      grid-template-columns: 1fr 1fr;
    }

    .faq {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  @media (max-width: 720px) {
    .wrap {
      padding: 0 20px;
    }

    nav {
      display: none;
    }

    .hero {
      padding-bottom: 88px;
    }

    .block {
      padding-bottom: 96px;
    }

    .groups,
    .honest ul,
    .specs {
      grid-template-columns: 1fr;
    }

    .honest {
      padding: 80px 0;
      margin-bottom: 96px;
    }

    .honest ul {
      gap: 32px;
    }

    .get-main,
    .gate {
      padding: 36px 24px;
    }
  }
</style>
