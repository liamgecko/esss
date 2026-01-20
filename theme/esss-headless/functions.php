<?php
/**
 * ESSS Headless theme functions.
 *
 * Keep this theme intentionally minimal. Use this file to control
 * WordPress behavior for headless usage (WPGraphQL, ACF blocks, etc).
 *
 * @package esss-headless
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Theme setup.
 */
function esss_headless_setup(): void {
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support('html5', array('comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));
}
add_action('after_setup_theme', 'esss_headless_setup');

/**
 * Enqueue minimal styles (optional).
 * This theme is headless; you typically don't need front-end assets here.
 */
function esss_headless_enqueue_assets(): void {
	$theme = wp_get_theme();
	wp_enqueue_style(
		'esss-headless',
		get_stylesheet_uri(),
		array(),
		$theme->get('Version')
	);
}
add_action('wp_enqueue_scripts', 'esss_headless_enqueue_assets');

/**
 * Disable the main content editor on Pages.
 *
 * This removes the WordPress editor ("main content area") for the `page` post type,
 * since content is managed via ACF blocks/flexible content in this headless setup.
 */
function esss_headless_disable_page_editor(): void {
	remove_post_type_support('page', 'editor');
}
add_action('init', 'esss_headless_disable_page_editor');

/**
 * Optional: Redirect front-end requests to your Next.js site.
 *
 * This does NOT affect wp-admin or /graphql.
 * Set ESSS_HEADLESS_FRONTEND_URL in wp-config.php if you want to enable it:
 *   define('ESSS_HEADLESS_FRONTEND_URL', 'https://your-vercel-domain.vercel.app');
 */
function esss_headless_redirect_frontend(): void {
	if (is_admin()) {
		return;
	}

	// Don't interfere with GraphQL endpoint.
	$request_uri = isset($_SERVER['REQUEST_URI']) ? (string) $_SERVER['REQUEST_URI'] : '';
	if (stripos($request_uri, '/graphql') === 0) {
		return;
	}

	if (!defined('ESSS_HEADLESS_FRONTEND_URL')) {
		return;
	}

	$target = rtrim((string) ESSS_HEADLESS_FRONTEND_URL, '/');
	if ($target === '') {
		return;
	}

	// Preserve path + query string.
	$redirect_to = $target . $request_uri;
	wp_safe_redirect($redirect_to, 302);
	exit;
}
add_action('template_redirect', 'esss_headless_redirect_frontend');

