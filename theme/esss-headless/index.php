<?php
/**
 * Fallback template.
 *
 * @package esss-headless
 */

get_header();
?>

<main id="primary" class="site-main">
	<div style="max-width: 800px; margin: 0 auto; padding: 48px 16px; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
		<h1 style="margin: 0 0 12px; font-size: 28px;">ESSS Headless CMS</h1>
		<p style="margin: 0; line-height: 1.5; opacity: 0.8;">
			This WordPress installation is configured as a headless CMS. Content is served via WPGraphQL.
		</p>
	</div>
</main>

<?php
get_footer();

