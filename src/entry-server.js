import { render } from 'svelte/server'
import App from './App.svelte'

export function renderPage(lang) {
  return render(App, { props: { lang } })
}
