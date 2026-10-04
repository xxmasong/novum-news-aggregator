# Novum News Aggregator

A full-stack news reader. Users sign up, choose a country and the news
categories they follow, and get a personalised feed with search, category pages
and related articles. Articles come from the [NewsData.io](https://newsdata.io)
API through a Laravel back end.

## Stack

| Part | Technology |
|---|---|
| Client (`client/`) | React 18, TypeScript, Vite, Redux Toolkit, Material UI, React Router, PWA plugin |
| Server (`server/`) | PHP 8.1, Laravel 10, Sanctum token auth, MySQL, Laravel Telescope |
| News source | NewsData.io (`newsdataio/newsdataapi`) |

## Features

- Registration, login and logout with Sanctum API tokens
- Per-user preferences: country and followed categories, stored server-side
- Home feed, category pages, search, and an article page with related articles
- Optional per-user NewsData API key; otherwise the server falls back through
  up to five configured keys until one succeeds (useful with free-tier limits)
- Uniform JSON responses (`success` / `error` with reasons) from a shared trait

## Design notes

**Client.** Components follow atomic design (`atoms/`, `molecules/`,
`organisms/`, `templates/`, `pages/`). Server calls live in `src/services/`
behind a small `ApiService` wrapper, and app state is in Redux Toolkit slices.

**Server.** Routes are table-driven: `app/Http/Tables/RoutesTable.php` lists
every API and web route as a typed props constant, and `app/Http/Routes.php`
registers them, so adding an endpoint never means editing several files.
Validation lives in form requests (`app/Http/Requests`), and response messages
are centralised in `app/Http/Messages.php`.

## API

| Area | Endpoints |
|---|---|
| Authentication | register, login, logout |
| Account | current user, current country, current categories, update user, update country, update categories |
| News | all countries, all categories, articles, sources |

## Running locally

Server (needs PHP 8.1+, Composer and MySQL):

```bash
cd server
cp .env.example .env          # set DB_* and NEWSDATA_API_KEY_1 (free key from newsdata.io)
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8100
```

Client (needs Node.js 18+):

```bash
cd client
cp .env.example .env          # VITE_URL_BACKEND=http://127.0.0.1:8100
npm install
npm run dev                   # http://localhost:3000
```
