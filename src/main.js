import './app.css'
import { hydrate, mount } from 'svelte'
import App from './App.svelte'

const target = document.getElementById('app')
const lang = location.pathname.startsWith('/id') ? 'id' : 'en'

// Production pages are prerendered (scripts/prerender.js); dev serves an empty shell.
const app = target.firstChild
  ? hydrate(App, { target, props: { lang } })
  : mount(App, { target, props: { lang } })

export default app
