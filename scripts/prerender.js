// Renders each language to static HTML after `vite build`, so crawlers and
// link previews get real content instead of an empty <div id="app">.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { renderPage } from '../dist-ssr/entry-server.js'

const template = readFileSync('dist/index.html', 'utf8')
const pages = [
  { lang: 'en', file: 'dist/index.html' },
  { lang: 'id', file: 'dist/id/index.html' },
]

for (const { lang, file } of pages) {
  const { head, body } = renderPage(lang)
  const html = template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', body)
  mkdirSync(file.slice(0, file.lastIndexOf('/')), { recursive: true })
  writeFileSync(file, html)
  console.log(`prerendered ${file}`)
}
