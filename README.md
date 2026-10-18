# organization-website

Modern, neutral organizational website (static HTML/CSS).

## Local preview

```bash
python3 -m http.server 8080 --directory public
```

## Cloudflare Workers

Preview and production deploys use [Wrangler](https://developers.cloudflare.com/workers/wrangler/). Static files live in `public/`.

```bash
npm install
npm run preview   # requires CLOUDFLARE_API_TOKEN
npm run deploy
```

`wrangler.jsonc` includes the required empty `previews` block for `wrangler preview`.
