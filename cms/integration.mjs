import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// These routes exist only in `astro dev`; nothing is copied into dist.
export default function localCms() {
  return {
    name: 'local-decap-cms',
    hooks: {
      'astro:config:setup': ({ command, injectRoute }) => {
        if (command !== 'dev') return;
        for (const name of ['editor', 'article']) {
          injectRoute({ pattern: `/${name}/`, entrypoint: fileURLToPath(new URL(`../src/local/${name}.astro`, import.meta.url)) });
        }
      },
      'astro:server:setup': ({ server }) => {
        const files = new Map([
          ['/admin/works.js', [new URL('./works.js', import.meta.url), 'text/javascript; charset=utf-8']],
          ['/admin/', [new URL('./index.html', import.meta.url), 'text/html; charset=utf-8']],
          ['/admin/config.yml', [new URL('./config.yml', import.meta.url), 'text/yaml; charset=utf-8']],
          ['/admin/decap-cms.js', [new URL('../node_modules/decap-cms/dist/decap-cms.js', import.meta.url), 'text/javascript; charset=utf-8']],
        ]);
        server.middlewares.use(async (req, res, next) => {
          const pathname = new URL(req.url || '/', 'http://localhost').pathname;
          if (pathname === '/admin') { res.writeHead(302, { Location: '/admin/' }); res.end(); return; }
          let asset = files.get(pathname);
          // Decap lazy-loads its editor widgets and WASM from sibling assets.
          const chunk = pathname.match(/^\/admin\/([a-zA-Z0-9.-]+\.(?:js|wasm))$/);
          if (!asset && chunk && !chunk[1].includes('..')) {
            asset = [new URL('../node_modules/decap-cms/dist/' + chunk[1], import.meta.url), chunk[1].endsWith('.wasm') ? 'application/wasm' : 'text/javascript; charset=utf-8'];
          }
          if (!asset) return next();
          try {
            const content = await readFile(asset[0]);
            res.writeHead(200, { 'Content-Type': asset[1], 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' });
            res.end(content);
          } catch (error) { next(error); }
        });
      },
    },
  };
}

