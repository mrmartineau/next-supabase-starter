<div align="center">

  <h1>next-supabase-starter</h1>

> An optionated starter project using [Next.js](https://nextjs.org) and [Supabase](https://supabase.com).

  <p>
    <a
      href="https://github.com/MrMartineau/next-supabase-starter/blob/master/LICENSE"
    >
      <img
        src="https://img.shields.io/badge/license-MIT-blue.svg"
        alt="This project is released under the MIT license."
      />
    </a>
    <img
      src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"
      alt="PRs welcome!"
    />
    <a href="https://main.elk.zone/toot.cafe/@zander">
      <img src="https://img.shields.io/mastodon/follow/90758?domain=https%3A%2F%2Ftoot.cafe" alt="Follow @zander" />
    </a>
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting started</a> •
    <a href="#docs">Docs</a> •
    <a href="#otter-ecosystem">Ecosystem</a>
  </p>
</div>

## Getting started

### Prerequisites

- [pnpm](https://pnpm.io) - install with `npm i -g pnpm`
- [Vercel](https://vercel.com) account and the [Vercel CLI](https://vercel.com/cli) - install with `npm i -g vercel`
- [Supabase](https://supabase.com) account and the [Supabase CLI](https://supabase.com/docs/reference/cli/introduction) - install with `npm i -g supabase`
- [Cloudflare](https://cloudflare.com) account (optional) - used for the page scraper and Mastodon to Supabase worker

### Setup

1. Fork this repo
2. Go to [database.new](https://database.new) and create a new [Supabase](https://supabase.com) project. You will need the project ID (found in the project settings page) and the the database password for the next step.
3. Link your Supabase project to your local dev environment: `pnpm supabase:link`
4. Seed your database with `pnpm supabase:setup`
5. Install npm dependencies with [pnpm](https://pnpm.io): `pnpm install`
6. Create a new project on vercel and setup env vars (see below)
7. To allow signups, set the value of `ALLOW_SIGNUP` in `./src/constants.ts` to `true`
8. Run the app locally using `pnpm dev`
9. Visit [`http://localhost:5678`](http://localhost:5678) and create an account

### Env vars

Set up the following env vars using either the Vercel CLI or through the Vercel project settings. Once they are added run `vc env pull` to pull them down to your local dev environment.

```bash
# Find these in your Supabase project settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## License

[MIT](https://choosealicense.com/licenses/mit/) © [Zander Martineau](https://zander.wtf)

> Made by Zander • [zander.wtf](https://zander.wtf) • [GitHub](https://github.com/mrmartineau/) • [Mastodon](https://main.elk.zone/toot.cafe/@zander)
