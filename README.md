# Organization Website

A modern, neutral, multi-page organizational website built with semantic HTML, CSS, and vanilla JavaScript.

## Pages

- **Home** (`index.html`) — Purpose, introduction, values overview, and calls to action
- **About** (`about.html`) — Mission, vision, and approach
- **Values** (`values.html`) — Six core values in a responsive card grid
- **Contact** (`contact.html`) — Accessible contact form (frontend demo only)

## Local preview

**Cloudflare Workers (recommended):**

```bash
npm install
npm run preview
```

`wrangler.jsonc` includes a required empty `"previews": {}` block for `wrangler preview` (open beta).

**Static server (optional):**

```bash
python3 -m http.server 8080 --directory public
```

Then open `http://localhost:8080`.

## Customization

Replace the **Organization** wordmark, placeholder email (`inquiries@example.placeholder`), and page copy as your brand evolves. Wire the contact form to your backend or a form provider when ready.
