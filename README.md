# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and Open Graph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

## Reference design migration

The pages in `refer/` have been ported to native Astro components and CSS. No React or Tailwind runtime is required. The reference files remain unchanged.

- `/`: reference hero and responsive navigation.
- `/portfolio/`: category filters, image preview, and video playback (Escape or close button dismisses the preview).
- `/blog/`: published Markdown/MDX articles with tag filters and reading times.
- `/about/`: biography, skills, and contact information.
- `/editor/`: local drafts, plain-text preview, local article saving, and Markdown export.
- `/article/?id=…`: articles saved in the current browser.

### Customize and publish

Update `src/consts.ts` for the reference identity, contact details, and optional social links. Update the biography copy in `src/pages/index.astro` and `src/pages/about.astro`, and works in `src/data/works.ts`. Images and the sample video use external URLs from the reference; replace them with your own assets when publishing. Failed images display a local fallback.

Add Markdown or MDX files under `src/content/blog/`. Supported frontmatter: `title`, `description`, `pubDate`, optional `updatedDate`, `tags`, `heroImage` (local asset), and `coverImage` (remote URL). Existing starter articles have been retained alongside the two reference articles.

The editor saves only to this browser's localStorage. It does not publish to a server or synchronize between devices. Export Markdown, place the file in `src/content/blog/`, then rebuild to publish. Published articles are managed through source files; only local articles have a Delete action. Clear browser data only after exporting anything you want to keep.

The deployment URL in `astro.config.mjs` is `https://xkonohax.github.io`. The target repository is `xkonohax/xkonohax.github.io`; no `base` prefix or custom domain is needed.

### Run locally

```sh
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run build
```

If Windows blocks npm's command-shell subprocess, the equivalent direct commands are `node node_modules/astro/bin/astro.mjs dev --background` and `node node_modules/astro/bin/astro.mjs build`.

Implementation follows the Astro [component](https://docs.astro.build/en/basics/astro-components/), [styling](https://docs.astro.build/en/guides/styling/), [routing](https://docs.astro.build/en/guides/routing/), and [content collection](https://docs.astro.build/en/guides/content-collections/) guides.


## GitHub Pages deployment

Target repository: `https://github.com/xkonohax/xkonohax.github.io`
Website: `https://xkonohax.github.io/`

1. Create the `xkonohax.github.io` repository under the `xkonohax` account if it does not already exist. For a new repository, leave it empty so the local Git history can be pushed directly.
2. In its **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. This local checkout previously pointed to `xkonohax/KonohaBlog`. Check `git remote -v`; if necessary, switch the destination before pushing:

   ```sh
   git remote set-url origin https://github.com/xkonohax/xkonohax.github.io.git
   ```

4. Commit the website source, `package.json`, `package-lock.json`, and `.github/workflows/deploy.yml`, then push the `main` branch to the target repository. If the target repository already has commits, fetch and reconcile its history first; do not force-push over it.
5. Follow **Actions → Deploy to GitHub Pages**. After the deployment succeeds, open the website URL above. Future pushes to `main` rebuild and publish automatically; the workflow can also be run manually.

The workflow builds on Linux with Node.js 24 and deploys Astro's generated static output. Do not upload `node_modules`, `.astro`, or `dist` as source; they are ignored by Git. No personal access token or custom domain configuration is required for this workflow. GitHub supplies the deployment token automatically.

The browser editor remains local-only after deployment. To publish an article for everyone, export its Markdown file to `src/content/blog/`, commit it, and push to `main`.
