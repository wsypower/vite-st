/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-03-22 13:18:38
 * @LastEditTime: 2023-03-22 14:40:50
 * @LastEditors: wsy
 */
import path from 'node:path'
import fs from 'node:fs/promises'
import { type Plugin } from 'esbuild'
const createScript = (src: string): string => `<script type="module" src="${src}"></script>`
const createLink = (src: string): string => `<link rel="stylesheet" href="${src}"></link>`
const generateHTML = (scripts: string[], links: string[]): string => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Esbuild App</title>
  ${links.join('\n')}
</head>

<body>
  <div id="root"></div>
  ${scripts.join('\n')}
</body>

</html>
`

const htmlPlugin: Plugin = {
  name: 'html',
  setup(build) {
    build.onStart(() => {
      // eslint-disable-next-line no-console
      console.log('build start')
    })
    build.onEnd(async (BuildResult) => {
      const { metafile } = BuildResult
      const scripts: string[] = []
      const links: string[] = []
      if (metafile) {
        const { outputs } = metafile
        Object.keys(outputs).forEach((assets) => {
          if (assets.endsWith('.js'))
            scripts.push(createScript(assets))

          else if (assets.endsWith('.css'))
            links.push(createLink(assets))
        })
      }
      const templateContent = generateHTML(scripts, links)
      const templatePath = path.join(__dirname, '../', 'index.html')
      await fs.writeFile(templatePath, templateContent)
    })
  },
}

export default htmlPlugin
