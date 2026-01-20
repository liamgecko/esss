ESSS Headless (bare-bones WordPress theme)
=========================================

This theme is intentionally minimal and designed for a headless setup
where WordPress serves content (WPGraphQL/ACF) and Next.js renders the UI.

Files
-----
- style.css     Theme header (required by WordPress)
- functions.php Theme hooks (place your WP environment control here)
- index.php     Minimal front-end placeholder
- header.php / footer.php Minimal templates to keep WP happy

Optional front-end redirect
---------------------------
To redirect all front-end requests to your Next.js site while leaving wp-admin
and /graphql intact, define this in wp-config.php:

  define('ESSS_HEADLESS_FRONTEND_URL', 'https://your-vercel-domain.vercel.app');

