<script>
  const REPO = 'https://github.com/kabdullah27/respite'
  const KOFI = 'https://ko-fi.com/kabdullah'

  const stats = [
    { value: '45–48 MB', label: 'idle memory footprint', sub: 'lighter than most browser tabs' },
    { value: '0.09%', label: 'CPU in the menu bar', sub: 'near-zero background overhead' },
    { value: '121', label: 'unit tests, passing', sub: 'battle-tested filesystem safety' },
    { value: '0', label: 'background network calls', sub: '100% offline & local execution' },
  ]

  const screens = [
    {
      id: 'smart-care',
      name: 'Smart Care',
      shortcut: '⌘1',
      image: '/screens/home.webp',
      tag: 'Flagship Overview',
      desc: 'Reclaimable space up front, fifteen tools one click away. Press ⌘1–⌘9 to switch between tools instantaneously.'
    },
    {
      id: 'uninstaller',
      name: 'App Uninstaller',
      shortcut: '⌘2',
      image: '/screens/uninstaller.webp',
      tag: 'Deep Cleanup',
      desc: 'Apps plus their leftovers — including lingering plists, application support folders, and caches from apps deleted ages ago.'
    },
    {
      id: 'memory',
      name: 'Memory Monitor',
      shortcut: '⌘5',
      image: '/screens/memory.webp',
      tag: 'Real-time Telemetry',
      desc: 'Live memory pressure bars, heavy processes breakdown, and honest Stop / Force Stop controls with real failure reasons.'
    },
    {
      id: 'keyboard',
      name: 'Keyboard Lock',
      shortcut: '⌘⌥L',
      image: '/screens/keyboard.webp',
      tag: 'Maintenance Mode',
      desc: 'Hold every key press behind a full-screen overlay while you wipe your display and keys. Trackpad stays active; ⌘⌥L unlocks.'
    }
  ]

  let activeScreenIndex = 0

  const categories = [
    { id: 'all', label: 'All Tools', count: 8 },
    { id: 'cleaning', label: 'Cleaning', count: 5 },
    { id: 'monitoring', label: 'Monitoring', count: 1 },
    { id: 'misc', label: 'Utilities', count: 2 },
  ]

  let activeCategory = 'all'

  const features = [
    { glyph: '⌘', tag: 'cleaning', title: 'Smart Scan', text: 'Caches, logs, and the Trash in one pass — grouped per app, each with an explanation.', featured: true },
    { glyph: '⌫', tag: 'cleaning', title: 'App Uninstaller', text: 'Apps plus their leftovers — including files from apps you deleted ages ago.' },
    { glyph: '⧉', tag: 'cleaning', title: 'Duplicate Finder', text: 'Byte-identical in three phases. Hard links are never counted as savings.' },
    { glyph: '◧', tag: 'cleaning', title: 'Similar Photos', text: 'Perceptual hashing that respects EXIF orientation. Never touches Photo libraries.' },
    { glyph: '⚒', tag: 'cleaning', title: 'Developer Caches', text: 'Xcode, Homebrew, Go, Cargo, node_modules — and AI app logs. Models are never touched.' },
    { glyph: '⏱', tag: 'monitoring', title: 'Memory Monitor', text: 'Live metrics, heavy processes, and Stop / Force Stop with honest failure reasons.' },
    { glyph: '⌨', tag: 'misc', title: 'Keyboard Lock', text: 'Wipe your screen without triggering keys. Trackpad keeps working; timer auto-unlocks.' },
    { glyph: '⏻', tag: 'misc', title: 'Power on-Lid', text: 'A firmware toggle (NVRAM) so your MacBook only starts when you press the power button.' },
  ]

  $: filteredFeatures = activeCategory === 'all'
    ? features
    : features.filter(f => f.tag === activeCategory)

  const honest = [
    {
      title: 'Purgeable space',
      tag: 'Zero exaggeration',
      text: 'macOS reclaims it on its own. Respite shows it in the storage donut and refuses to count it as savings.'
    },
    {
      title: 'CPU temperature',
      tag: 'Sensor integrity',
      text: 'Modern Apple Silicon locks the sensor away from all apps. Where it is readable, Respite shows it. Where it is not, it stays quiet.'
    },
    {
      title: 'The Mac App Store',
      tag: 'Sandboxing reality',
      text: 'Sandboxing forbids everything a thorough cleaner needs. Respite is distributed directly, like most tools in this category.'
    },
  ]

  const principles = [
    { num: '01', title: 'Explain before deleting', text: 'Every scan result says what it is, why it is safe to remove, and who owns it. If the app cannot explain an item, it does not offer it.' },
    { num: '02', title: 'Reversible by default', text: 'Cleaning means moving to the Trash, with an audit trail written before anything runs. The only irreversible tool is buried behind layered confirmation.' },
    { num: '03', title: 'Local unless you ask', text: 'No telemetry, no account, no background network activity. Pressing "Check for Updates" is the single network call the app can make.' },
    { num: '04', title: 'Quiet on purpose', text: 'No scare tactics, no "clean now" nagging, no pop-ups. Scans keep running when you switch views and a banner tells you when they are done.' },
  ]

  const faq = [
    { q: 'Is $0 really okay?', a: 'Yes. Respite is GPL-3.0, and the license lets anyone pay any amount — including nothing. The Ko-fi download and the one you build from source are the exact same app. Paying is pure support.' },
    { q: 'Why isn\u2019t it on the Mac App Store?', a: 'App Store apps must be sandboxed, and sandboxing forbids everything a cleaner needs: scanning ~/Library, reading browser caches, managing login items. Respite is distributed directly, like most tools in this category.' },
    { q: 'Why can\u2019t I see CPU temperature?', a: 'Modern Apple Silicon locks the temperature sensor away from all apps. On Macs where it is readable, Respite shows it. Where it is not, it stays quiet instead of inventing a number.' },
    { q: 'Is Keyboard Lock safe? How do I get out?', a: 'It is an app overlay, not a hardware switch — force-quitting Respite ends it instantly. While locked: hold the on-screen button for 1 second, press ⌘⌥L, or wait for the timer (default 2 minutes). The trackpad is never blocked.' },
    { q: 'Does it phone home?', a: 'No. There is no telemetry and no background network activity. "Check for Updates" is the only network call the app can make, and only when you press it.' },
  ]

  const specs = [
    { k: 'Requires', v: 'macOS 13+' },
    { k: 'Binary', v: 'Universal (Apple Silicon & Intel)' },
    { k: 'DMG size', v: '4.7 MB' },
    { k: 'Permission', v: 'Full Disk Access' },
    { k: 'Network', v: 'Only on user request' },
    { k: 'License', v: 'GPL-3.0 (Open Source)' },
  ]
</script>

<header>
  <div class="wrap">
    <a href="/" class="brand-group">
      <img src="/favicon.png" alt="Respite icon" class="brand-icon" width="28" height="28" />
      <span class="brand">Respite</span>
      <span class="version-tag">v1.1</span>
    </a>
    <nav>
      <a href="#screens">Screens</a>
      <a href="#features">Features</a>
      <a href="#honest">Honesty</a>
      <a href="#principles">Principles</a>
      <a href="#faq">FAQ</a>
    </nav>
    <a class="pill" href={KOFI} target="_blank" rel="noopener noreferrer">
      <span>Download</span>
      <span class="pill-dot">·</span>
      <span>$0+</span>
    </a>
  </div>
</header>

<main>
  <!-- Hero Section -->
  <section class="hero wrap">
    <div class="badge-pill">
      <span class="pulse-dot"></span>
      <span>v1.1 Released · Free & GPL-3.0 · macOS 13+</span>
    </div>

    <h1>
      A cleaner that<br>
      <span class="gradient-text">stays calm.</span>
    </h1>

    <p class="lede">
      Smart Scan · App Uninstaller · Duplicates · Memory Monitor · Keyboard Lock —
      every one of them explains itself before it touches a single byte.
    </p>

    <div class="cta">
      <a class="button primary" href={KOFI} target="_blank" rel="noopener noreferrer">
        <svg class="button-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
          <path fill-rule="evenodd" d="M3 14.5A1.5 1.5 0 004.5 16h11a1.5 1.5 0 001.5-1.5V11a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-11a.25.25 0 01-.25-.25V11A.75.75 0 003 11v3.5z" clip-rule="evenodd"/>
          <path fill-rule="evenodd" d="M9.47 11.53a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V3.75a.75.75 0 00-1.5 0v5.44L7.53 7.47a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd"/>
        </svg>
        Download DMG — pay what you want
      </a>
      <a class="button ghost" href={REPO} target="_blank" rel="noopener noreferrer">
        <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        GitHub Source →
      </a>
    </div>

    <div class="chips">
      <span class="chip"><span class="chip-dot"></span>$0 included</span>
      <span class="chip"><span class="chip-dot"></span>No telemetry</span>
      <span class="chip"><span class="chip-dot"></span>Universal binary</span>
      <span class="chip"><span class="chip-dot"></span>GPL-3.0 License</span>
    </div>
  </section>

  <!-- Stats Grid -->
  <section class="wrap">
    <div class="numbers">
      {#each stats as st}
        <div class="stat-card">
          <strong class="stat-value">{st.value}</strong>
          <span class="stat-label">{st.label}</span>
          <span class="stat-sub">{st.sub}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Interactive Screens Showcase -->
  <section id="screens" class="wrap section-block">
    <div class="section-head">
      <p class="micro">interface</p>
      <h2>The whole thing, in four frames</h2>
      <p class="section-desc">Real macOS native views. Designed to inform, not frighten.</p>
    </div>

    <!-- Screen Tabs -->
    <div class="screen-tabs">
      {#each screens as scr, idx}
        <button
          type="button"
          class="screen-tab-btn"
          class:active={activeScreenIndex === idx}
          on:click={() => activeScreenIndex = idx}
        >
          <span class="tab-shortcut">{scr.shortcut}</span>
          <span class="tab-name">{scr.name}</span>
        </button>
      {/each}
    </div>

    <!-- Mac Window Container -->
    <div class="mac-window">
      <div class="mac-titlebar">
        <div class="traffic-lights">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="mac-window-title">
          <svg class="window-shield-icon" viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
            <path fill-rule="evenodd" d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V1.75A.75.75 0 0110 1zm0 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 16zm-5-8a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 8z" clip-rule="evenodd"/>
          </svg>
          Respite — {screens[activeScreenIndex].name}
        </div>
        <div class="mac-window-badge">
          {screens[activeScreenIndex].tag}
        </div>
      </div>
      <div class="mac-window-body">
        <img
          src={screens[activeScreenIndex].image}
          alt={screens[activeScreenIndex].name}
          class="screen-img"
          width="1710"
          height="1074"
        />
      </div>
    </div>

    <!-- Active Caption -->
    <div class="active-caption-card">
      <div class="caption-left">
        <span class="caption-tag">{screens[activeScreenIndex].tag}</span>
        <strong class="caption-title">{screens[activeScreenIndex].name}</strong>
      </div>
      <p class="caption-desc">{screens[activeScreenIndex].desc}</p>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="wrap section-block">
    <div class="section-head">
      <p class="micro">features</p>
      <h2>Small tools that explain themselves</h2>
      <p class="section-desc">Inspect every item before deciding. Clean up without blind faith.</p>
    </div>

    <!-- Category Filter Pills -->
    <div class="filter-bar">
      {#each categories as cat}
        <button
          type="button"
          class="filter-pill"
          class:active={activeCategory === cat.id}
          on:click={() => activeCategory = cat.id}
        >
          {cat.label}
          <span class="count-badge">{cat.count}</span>
        </button>
      {/each}
    </div>

    <!-- Features Bento Grid -->
    <div class="grid three bento">
      {#each filteredFeatures as f}
        <div class="card" class:flagship={f.featured && activeCategory === 'all'}>
          <div class="card-head">
            <span class="tag">{f.tag}</span>
            <span class="glyph">{f.glyph}</span>
          </div>
          {#if f.featured && activeCategory === 'all'}
            <div class="featured-badge">Flagship Tool</div>
          {/if}
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Honest Engineering Section -->
  <section id="honest" class="wrap section-block">
    <div class="section-head">
      <p class="micro">honest engineering</p>
      <h2>No placebo buttons, no manufactured panic</h2>
      <p class="section-desc">Commercial cleaners love inventing red warnings. Here is what we refuse to do.</p>
    </div>
    <div class="grid three">
      {#each honest as h}
        <div class="card honest-card">
          <span class="tag highlight">{h.tag}</span>
          <h3>{h.title}</h3>
          <p>{h.text}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Principles Section -->
  <section id="principles" class="wrap section-block">
    <div class="section-head">
      <p class="micro">principles</p>
      <h2>Four rules, applied everywhere</h2>
      <p class="section-desc">The design contract between the app and your hard drive.</p>
    </div>
    <div class="grid two">
      {#each principles as p}
        <div class="card principle-card">
          <div class="principle-number">{p.num}</div>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Founder Statement -->
  <section class="wrap founder-section">
    <div class="founder-card">
      <div class="quote-icon">“</div>
      <blockquote>
        I built Respite because every cleaner I tried either tried to scare me into
        cleaning or hid what it was doing behind one big button. This one explains
        itself, keeps everything reversible, and sits in the menu bar at 0.09% CPU.
      </blockquote>
      <div class="founder-cite">
        <div class="avatar-badge">K</div>
        <div>
          <strong>Khalid</strong>
          <span>Building Respite end to end</span>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section id="faq" class="wrap section-block">
    <div class="section-head">
      <p class="micro">faq</p>
      <h2>Plain answers</h2>
      <p class="section-desc">No corporate doublespeak. Everything you want to know before running it.</p>
    </div>
    <div class="faq-list">
      {#each faq as item}
        <details class="faq-item">
          <summary>
            <span>{item.q}</span>
            <span class="faq-toggle-icon"></span>
          </summary>
          <div class="faq-content">
            <p>{item.a}</p>
          </div>
        </details>
      {/each}
    </div>
  </section>

  <!-- Specs Section -->
  <section class="wrap runs section-block">
    <div class="section-head">
      <p class="micro">runs on</p>
      <h2>System requirements & build specs</h2>
    </div>
    <div class="grid three specs-grid">
      {#each specs as spec}
        <div class="spec-card">
          <span class="spec-label">{spec.k}</span>
          <strong class="spec-value">{spec.v}</strong>
        </div>
      {/each}
    </div>
  </section>

  <!-- Download CTA Card -->
  <section id="download" class="wrap download-section">
    <div class="download-box">
      <div class="download-content">
        <div class="badge-pill">Version 1.1 · Open Source</div>
        <h2>Get Respite for macOS</h2>
        <p class="download-lede">
          Pay what you want, <strong>$0 included</strong>. Universal binary for Apple Silicon (M1–M4) and Intel Macs.
        </p>
        <div class="cta download-cta">
          <a class="button primary big" href={KOFI} target="_blank" rel="noopener noreferrer">
            <svg class="button-icon" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
              <path fill-rule="evenodd" d="M3 14.5A1.5 1.5 0 004.5 16h11a1.5 1.5 0 001.5-1.5V11a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-11a.25.25 0 01-.25-.25V11A.75.75 0 003 11v3.5z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M9.47 11.53a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V3.75a.75.75 0 00-1.5 0v5.44L7.53 7.47a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd"/>
            </svg>
            Download DMG on Ko-fi
          </a>
          <a class="button ghost" href={REPO} target="_blank" rel="noopener noreferrer">
            View Source Code
          </a>
        </div>
        <div class="notarize-box">
          <span class="info-icon">ℹ</span>
          <span>
            Not notarized yet — macOS Gatekeeper warns on first launch: right-click the app, then click <strong>Open</strong>.
            The Ko-fi DMG and the source build are byte-for-byte identical.
          </span>
        </div>
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="wrap footer-content">
    <div class="footer-left">
      <div class="brand-group">
        <img src="/favicon.png" alt="Respite icon" class="brand-icon" width="20" height="20" />
        <span class="brand">Respite</span>
      </div>
      <p class="fine">GPL-3.0 · Built with calm restraint for macOS.</p>
    </div>
    <div class="footer-links">
      <a href={REPO} target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href={KOFI} target="_blank" rel="noopener noreferrer">Support on Ko-fi</a>
      <a href="#screens">Screens</a>
      <a href="#features">Features</a>
    </div>
  </div>
</footer>

<style>
  /* Header & Navigation */
  header {
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid var(--border);
    padding: 12px 0;
    background: rgba(11, 17, 14, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  header .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand-group {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .brand-icon {
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .brand {
    font-family: var(--font-serif);
    font-size: 22px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.02em;
  }

  .version-tag {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent);
    background: var(--accent-subtle);
    border: 1px solid rgba(59, 191, 142, 0.25);
    padding: 2px 7px;
    border-radius: 999px;
  }

  nav {
    display: flex;
    gap: 24px;
  }

  nav a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.15s ease;
  }

  nav a:hover {
    color: var(--text);
  }

  .pill {
    color: #fff;
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 600;
    background: var(--accent-dim);
    border: 1px solid var(--accent);
    padding: 7px 18px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 10px rgba(59, 191, 142, 0.2);
  }

  .pill:hover {
    background: var(--accent);
    box-shadow: 0 4px 16px rgba(59, 191, 142, 0.4);
    transform: translateY(-1px);
  }

  .pill-dot {
    opacity: 0.6;
  }

  /* Hero Section */
  .hero {
    padding: 92px 24px 48px;
    text-align: center;
    position: relative;
  }

  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--accent);
    background: var(--accent-subtle);
    border: 1px solid rgba(59, 191, 142, 0.28);
    padding: 6px 16px;
    border-radius: 999px;
    margin-bottom: 24px;
  }

  .pulse-dot {
    width: 7px;
    height: 7px;
    background: var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--accent);
    animation: pulse 2s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
  }

  .hero h1 {
    font-size: 64px;
    line-height: 1.08;
    margin-bottom: 20px;
    letter-spacing: -0.025em;
  }

  .gradient-text {
    background: linear-gradient(135deg, #3bbf8e 0%, #7ef0c5 50%, #d9e4dd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .lede {
    font-size: 19px;
    color: var(--text-muted);
    max-width: 660px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .cta {
    margin-top: 36px;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 26px;
    border-radius: 9px;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .button.primary {
    background: linear-gradient(180deg, #26a57e 0%, #178363 100%);
    color: #fff;
    border: 1px solid var(--accent);
    box-shadow: 0 4px 18px rgba(59, 191, 142, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .button.primary:hover {
    background: linear-gradient(180deg, #33b88e 0%, #1da07a 100%);
    box-shadow: 0 6px 24px rgba(59, 191, 142, 0.38);
    transform: translateY(-1.5px);
  }

  .button.ghost {
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-muted);
    border: 1px solid var(--border);
  }

  .button.ghost:hover {
    background: rgba(255, 255, 255, 0.07);
    color: var(--text);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .chips {
    margin-top: 32px;
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border);
    padding: 6px 14px;
    border-radius: 999px;
  }

  .chip-dot {
    width: 5px;
    height: 5px;
    background: var(--accent);
    border-radius: 50%;
    opacity: 0.8;
  }

  /* Numbers / Stats Grid */
  .numbers {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-top: 10px;
    margin-bottom: 64px;
  }

  .stat-card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 22px 18px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0.3;
    transition: opacity 0.2s ease;
  }

  .stat-card:hover {
    border-color: var(--border-accent);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px -10px rgba(0, 0, 0, 0.5);
  }

  .stat-card:hover::before {
    opacity: 1;
  }

  .stat-value {
    font-family: var(--font-mono);
    font-size: 26px;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 4px;
  }

  .stat-sub {
    font-size: 12px;
    color: var(--muted);
    line-height: 1.4;
  }

  /* Section Headers */
  .section-block {
    padding-bottom: 84px;
  }

  .section-head {
    margin-bottom: 30px;
  }

  .micro {
    font-family: var(--font-mono);
    font-size: 11.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
  }

  .section-head h2 {
    font-size: 34px;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .section-desc {
    font-size: 15.5px;
    color: var(--text-muted);
  }

  /* Screen Showcase */
  .screen-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 18px;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .screen-tab-btn {
    background: var(--panel);
    border: 1px solid var(--border);
    color: var(--text-muted);
    padding: 8px 16px;
    border-radius: 8px;
    font-family: var(--font-sans);
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.18s ease;
  }

  .screen-tab-btn:hover {
    color: var(--text);
    border-color: rgba(59, 191, 142, 0.3);
  }

  .screen-tab-btn.active {
    background: var(--panel-elevated);
    color: #fff;
    border-color: var(--accent);
    box-shadow: 0 0 14px rgba(59, 191, 142, 0.2);
  }

  .tab-shortcut {
    font-family: var(--font-mono);
    font-size: 11px;
    background: rgba(255, 255, 255, 0.06);
    padding: 2px 6px;
    border-radius: 4px;
    color: var(--accent);
  }

  /* Mac Window Frame */
  .mac-window {
    background: #0d1612;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04);
  }

  .mac-titlebar {
    background: #141f19;
    border-bottom: 1px solid var(--border);
    padding: 11px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .traffic-lights {
    display: flex;
    gap: 7px;
  }

  .dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }

  .dot.red { background: #ff5f57; border: 1px solid #e0443e; }
  .dot.yellow { background: #febc2e; border: 1px solid #d89e24; }
  .dot.green { background: #28c840; border: 1px solid #1aab29; }

  .mac-window-title {
    font-family: var(--font-mono);
    font-size: 12.5px;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .mac-window-badge {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent);
    background: var(--accent-subtle);
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid rgba(59, 191, 142, 0.2);
  }

  .mac-window-body {
    background: #080c0a;
  }

  .screen-img {
    width: 100%;
    height: auto;
    display: block;
    transition: opacity 0.25s ease;
  }

  .active-caption-card {
    margin-top: 14px;
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .caption-left {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 160px;
  }

  .caption-tag {
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .caption-title {
    font-size: 16px;
    color: var(--text);
  }

  .caption-desc {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  /* Filter Bar */
  .filter-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 22px;
    flex-wrap: wrap;
  }

  .filter-pill {
    background: var(--panel);
    border: 1px solid var(--border);
    color: var(--text-muted);
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.18s ease;
  }

  .filter-pill:hover {
    color: var(--text);
    border-color: rgba(59, 191, 142, 0.3);
  }

  .filter-pill.active {
    background: var(--accent-subtle);
    color: var(--accent);
    border-color: var(--accent);
  }

  .count-badge {
    font-family: var(--font-mono);
    font-size: 11px;
    background: rgba(255, 255, 255, 0.06);
    padding: 1px 6px;
    border-radius: 999px;
  }

  /* Grid layouts */
  .grid {
    display: grid;
    gap: 16px;
  }

  .grid.two { grid-template-columns: repeat(2, 1fr); }
  .grid.three { grid-template-columns: repeat(3, 1fr); }

  /* Card Component */
  .card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px 22px;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .card:hover {
    background: var(--panel-elevated);
    border-color: rgba(59, 191, 142, 0.45);
    transform: translateY(-2.5px);
    box-shadow: 0 12px 28px -12px rgba(0, 0, 0, 0.6), 0 0 20px -8px rgba(59, 191, 142, 0.15);
  }

  .card.flagship {
    grid-column: span 2;
    background: linear-gradient(135deg, var(--panel) 0%, #15271e 100%);
    border-color: rgba(59, 191, 142, 0.35);
  }

  .featured-badge {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #fff;
    background: var(--accent-dim);
    display: inline-block;
    align-self: flex-start;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .glyph {
    font-family: var(--font-mono);
    font-size: 15px;
    color: var(--accent);
    background: var(--accent-subtle);
    border: 1px solid rgba(59, 191, 142, 0.2);
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .card:hover .glyph {
    background: var(--accent-dim);
    color: #fff;
    border-color: var(--accent);
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .tag.highlight {
    color: var(--accent);
    background: var(--accent-subtle);
    border: 1px solid rgba(59, 191, 142, 0.25);
    padding: 3px 8px;
    border-radius: 4px;
    display: inline-block;
    align-self: flex-start;
    margin-bottom: 14px;
  }

  .card h3 {
    font-size: 19px;
    line-height: 1.3;
    margin-bottom: 8px;
    color: var(--text);
  }

  .card p {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-muted);
  }

  /* Principle Cards */
  .principle-card {
    position: relative;
    padding-top: 30px;
  }

  .principle-number {
    position: absolute;
    top: 20px;
    right: 22px;
    font-family: var(--font-mono);
    font-size: 18px;
    font-weight: 600;
    color: var(--accent);
    opacity: 0.45;
  }

  /* Founder Statement */
  .founder-section {
    padding-bottom: 84px;
  }

  .founder-card {
    background: linear-gradient(145deg, var(--panel) 0%, #15221b 100%);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 36px 40px;
    position: relative;
    box-shadow: 0 16px 36px -16px rgba(0, 0, 0, 0.6);
  }

  .quote-icon {
    font-family: var(--font-serif);
    font-size: 64px;
    line-height: 1;
    color: var(--accent);
    opacity: 0.3;
    margin-bottom: -16px;
  }

  .founder-card blockquote {
    font-family: var(--font-serif);
    font-size: 21px;
    line-height: 1.55;
    color: var(--text);
    margin-bottom: 22px;
  }

  .founder-cite {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .avatar-badge {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--accent-dim);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-weight: 600;
    font-size: 16px;
    border: 1px solid var(--accent);
  }

  .founder-cite strong {
    display: block;
    font-size: 15px;
    color: var(--text);
  }

  .founder-cite span {
    font-size: 13px;
    color: var(--muted);
  }

  /* FAQ List */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .faq-item {
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--panel);
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .faq-item:hover {
    border-color: rgba(59, 191, 142, 0.3);
  }

  .faq-item[open] {
    border-color: var(--border-accent);
    background: var(--panel-elevated);
  }

  .faq-item summary {
    padding: 18px 22px;
    cursor: pointer;
    font-weight: 600;
    font-size: 15.5px;
    color: var(--text);
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    user-select: none;
  }

  .faq-item summary::-webkit-details-marker {
    display: none;
  }

  .faq-toggle-icon {
    width: 14px;
    height: 14px;
    position: relative;
  }

  .faq-toggle-icon::before,
  .faq-toggle-icon::after {
    content: '';
    position: absolute;
    background: var(--accent);
    transition: transform 0.2s ease;
  }

  .faq-toggle-icon::before {
    top: 6px;
    left: 0;
    width: 14px;
    height: 2px;
  }

  .faq-toggle-icon::after {
    top: 0;
    left: 6px;
    width: 2px;
    height: 14px;
  }

  .faq-item[open] .faq-toggle-icon::after {
    transform: rotate(90deg);
    opacity: 0;
  }

  .faq-content {
    padding: 0 22px 20px;
  }

  .faq-content p {
    color: var(--text-muted);
    font-size: 14.5px;
    line-height: 1.6;
  }

  /* Specs Grid */
  .spec-card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: all 0.2s ease;
  }

  .spec-card:hover {
    border-color: rgba(59, 191, 142, 0.35);
    background: var(--panel-elevated);
  }

  .spec-label {
    font-family: var(--font-mono);
    font-size: 11.5px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .spec-value {
    font-size: 15px;
    color: var(--text);
  }

  /* Download Section */
  .download-section {
    padding-bottom: 96px;
  }

  .download-box {
    background: radial-gradient(ellipse at 50% 0%, #173628 0%, #0e1713 70%);
    border: 1px solid rgba(59, 191, 142, 0.35);
    border-radius: 16px;
    padding: 56px 32px;
    text-align: center;
    position: relative;
    box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(59, 191, 142, 0.15);
  }

  .download-box h2 {
    font-size: 40px;
    margin: 16px 0 12px;
  }

  .download-lede {
    font-size: 17px;
    color: var(--text-muted);
    max-width: 580px;
    margin: 0 auto;
  }

  .download-cta {
    margin-top: 28px;
    margin-bottom: 28px;
  }

  .button.big {
    padding: 15px 32px;
    font-size: 16px;
  }

  .notarize-box {
    display: inline-flex;
    align-items: flex-start;
    gap: 10px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border);
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 13px;
    color: var(--muted);
    max-width: 620px;
    text-align: left;
    line-height: 1.5;
  }

  .info-icon {
    font-family: var(--font-mono);
    color: var(--accent);
    font-weight: 600;
  }

  /* Footer */
  footer {
    border-top: 1px solid var(--border);
    padding: 40px 0;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .footer-left .fine {
    font-size: 13px;
    color: var(--muted);
  }

  .footer-links {
    display: flex;
    gap: 20px;
  }

  .footer-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.15s ease;
  }

  .footer-links a:hover {
    color: var(--text);
  }

  /* Responsive Queries */
  @media (max-width: 820px) {
    .numbers {
      grid-template-columns: repeat(2, 1fr);
    }
    .grid.three {
      grid-template-columns: repeat(2, 1fr);
    }
    .card.flagship {
      grid-column: span 1;
    }
  }

  @media (max-width: 720px) {
    .hero h1 {
      font-size: 42px;
    }
    .numbers, .grid.two, .grid.three {
      grid-template-columns: 1fr;
    }
    nav {
      display: none;
    }
    .active-caption-card {
      flex-direction: column;
      align-items: flex-start;
    }
    .founder-card {
      padding: 24px 20px;
    }
    .founder-card blockquote {
      font-size: 18px;
    }
    .footer-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }
</style>
