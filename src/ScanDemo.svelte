<script>
  let { t } = $props()

  // Sizes in bytes; macOS reports storage in base-10 units, so we do too.
  const seed = [
    { id: 'chrome', app: 'Google Chrome', kind: 'cache', size: 1_310_000_000, tint: '#4a7fd6' },
    { id: 'spotify', app: 'Spotify', kind: 'cache', size: 842_000_000, tint: '#2c9a5a' },
    { id: 'figma', app: 'Figma', kind: 'cache', size: 612_000_000, tint: '#8a5bd0', recent: true },
    { id: 'slack', app: 'Slack', kind: 'cache', size: 388_000_000, tint: '#a8427a' },
    { id: 'adobe', app: 'Adobe Creative Cloud', kind: 'logs', size: 214_000_000, tint: '#c4492f' },
    { id: 'zoom', app: 'Zoom', kind: 'logs', size: 57_000_000, tint: '#3c8fc4' },
  ]

  let items = $state(seed.map((i) => ({ ...i, checked: !i.recent })))
  let phase = $state('review') // review → moving → done
  let moved = $state(0)

  const total = $derived(items.reduce((s, i) => s + i.size, 0))
  const picked = $derived(items.filter((i) => i.checked))
  const pickedSize = $derived(picked.reduce((s, i) => s + i.size, 0))

  function fmt(bytes) {
    if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`
    return `${Math.round(bytes / 1e6)} MB`
  }

  function clean() {
    if (!picked.length) return
    moved = pickedSize
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    phase = 'moving'
    setTimeout(() => (phase = 'done'), reduce ? 0 : 900)
  }

  function reset() {
    items = seed.map((i) => ({ ...i, checked: !i.recent }))
    phase = 'review'
  }
</script>

<figure class="demo">
  <div class="window" aria-live="polite">
    <div class="bar">
      <span class="lights" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="title">{t.title}</span>
    </div>

    {#if phase !== 'done'}
      <div class="head">
        <p class="found">{t.found(fmt(total))}</p>
        <p class="note">{t.note}</p>
      </div>

      <ul class="rows" class:moving={phase === 'moving'}>
        {#each items as item, i (item.id)}
          <li class:off={!item.checked} class:leaving={phase === 'moving' && item.checked} style="--i:{i}">
            <label>
              <input type="checkbox" bind:checked={item.checked} disabled={phase !== 'review'} />
              <span class="tile" style="background:{item.tint}" aria-hidden="true">{item.app[0]}</span>
              <span class="what">
                <span class="name">
                  {item.app}
                  {#if item.recent}<span class="recent">{t.recent}</span>{/if}
                </span>
                <span class="why">
                  {item.kind === 'cache' ? t.cache : t.logs}.
                  {item.recent ? t.recentWhy : item.kind === 'cache' ? t.cacheWhy : t.logsWhy}
                </span>
              </span>
              <span class="size">{fmt(item.size)}</span>
            </label>
          </li>
        {/each}
      </ul>

      <div class="foot">
        <span class="count">{t.selected(picked.length)}</span>
        <button type="button" class="act" onclick={clean} disabled={!picked.length || phase !== 'review'}>
          {#if phase === 'moving'}{t.moving}{:else if picked.length}{t.move(fmt(pickedSize))}{:else}{t.nothing}{/if}
        </button>
      </div>
    {:else}
      <div class="done">
        <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" stroke-width="3" />
          <path d="M14 25l7 7 13-15" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p class="done-title">{t.doneTitle(fmt(moved))}</p>
        <p class="done-body">{t.doneBody}</p>
        <button type="button" class="again" onclick={reset}>{t.again}</button>
      </div>
    {/if}
  </div>
  <figcaption>{t.hint}</figcaption>
</figure>

<style>
  .demo {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif;
  }

  .window {
    background: #fdfefd;
    border-radius: 14px;
    box-shadow:
      0 0 0 0.5px rgba(18, 48, 42, 0.22),
      0 1px 2px rgba(18, 48, 42, 0.06),
      0 24px 48px -12px rgba(18, 48, 42, 0.28);
    overflow: hidden;
    min-height: 520px;
    display: flex;
    flex-direction: column;
  }

  .bar {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 14px;
    background: #f1f4f3;
    border-bottom: 1px solid #dfe5e2;
    position: relative;
  }

  .lights {
    display: flex;
    gap: 8px;
  }

  .lights i {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff5f57;
    box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.15);
  }
  .lights i:nth-child(2) { background: #febc2e; }
  .lights i:nth-child(3) { background: #28c840; }

  .title {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 13px;
    font-weight: 600;
    color: #3b4a46;
    pointer-events: none;
  }

  .head {
    padding: 22px 24px 14px;
  }

  .found {
    font-size: 21px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--pine);
    font-variant-numeric: tabular-nums;
  }

  .note {
    margin-top: 6px;
    font-size: 12.5px;
    line-height: 1.45;
    color: #66756f;
    max-width: 46ch;
  }

  .rows {
    list-style: none;
    margin: 0 12px;
    flex: 1;
  }

  .rows li {
    border-top: 1px solid #edf0ef;
    transition: opacity 0.2s ease;
  }

  .rows li.off .size,
  .rows li.off .name {
    color: #8a9792;
  }

  .rows li.leaving {
    animation: leave 0.42s cubic-bezier(0.5, 0, 0.75, 0) forwards;
    animation-delay: calc(var(--i) * 70ms);
  }

  @keyframes leave {
    to { opacity: 0; transform: translateX(28px); }
  }

  label {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    align-items: center;
    gap: 12px;
    padding: 11px 12px;
    border-radius: 8px;
    cursor: pointer;
  }

  label:hover {
    background: #f3f6f5;
  }

  input {
    width: 16px;
    height: 16px;
    accent-color: var(--teal);
    margin: 0;
  }

  .tile {
    width: 30px;
    height: 30px;
    border-radius: 7px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    display: grid;
    place-items: center;
  }

  .what {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .name {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--pine);
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .recent {
    font-size: 11px;
    font-weight: 600;
    color: #8a5a06;
    background: #fbefd6;
    padding: 1px 7px;
    border-radius: 5px;
  }

  .why {
    font-size: 12px;
    color: #66756f;
    line-height: 1.4;
  }

  .size {
    white-space: nowrap;
    font-size: 13px;
    font-weight: 500;
    color: var(--pine);
    font-variant-numeric: tabular-nums;
  }

  .foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 24px;
    border-top: 1px solid #dfe5e2;
    background: #f7f9f8;
  }

  .count {
    font-size: 12.5px;
    color: #66756f;
  }

  .act {
    font: inherit;
    font-size: 13.5px;
    font-weight: 600;
    color: #fff;
    background: var(--teal);
    border: 0;
    border-radius: 7px;
    padding: 8px 16px;
    cursor: pointer;
    font-variant-numeric: tabular-nums;
  }

  .act:hover:not(:disabled) { background: var(--teal-deep); }
  .act:disabled { background: #b9c6c1; cursor: default; }

  .done {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 36px;
    color: var(--teal);
    animation: arrive 0.4s ease-out;
  }

  @keyframes arrive {
    from { opacity: 0; transform: scale(0.97); }
  }

  .done-title {
    margin-top: 16px;
    font-size: 21px;
    font-weight: 700;
    color: var(--pine);
    font-variant-numeric: tabular-nums;
  }

  .done-body {
    margin-top: 8px;
    font-size: 13.5px;
    line-height: 1.5;
    color: #56655f;
    max-width: 38ch;
  }

  .again {
    margin-top: 22px;
    font: inherit;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--pine);
    background: #fff;
    border: 1px solid #cfd8d4;
    border-radius: 7px;
    padding: 7px 16px;
    cursor: pointer;
  }

  .again:hover { background: #f3f6f5; }

  figcaption {
    margin-top: 14px;
    font-family: var(--font);
    font-size: 14px;
    color: var(--slate);
  }

  @media (max-width: 520px) {
    .head { padding: 18px 16px 12px; }
    .rows { margin: 0 4px; }
    label { gap: 10px; padding: 10px 10px; }
    .tile { display: none; }
    .foot { padding: 12px 16px; }
    .window { min-height: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .rows li.leaving, .done { animation: none; }
  }
</style>
