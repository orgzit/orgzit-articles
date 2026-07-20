import fs from 'node:fs/promises'

const MANIFEST_PATH = new URL('../manifest.json', import.meta.url)
const OUT_PATH = new URL('../dist/_redirects', import.meta.url)

async function main() {
  const manifest = JSON.parse(await fs.readFile(MANIFEST_PATH))

  const lines = manifest.map((entry) => {
    const oldPath = new URL(entry.intercom_url).pathname
    return `${oldPath}  ${entry.new_path}  301`
  })

  await fs.writeFile(OUT_PATH, lines.join('\n') + '\n')
  console.log(`Wrote ${lines.length} redirects to dist/_redirects`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
