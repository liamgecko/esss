This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Email Configuration

The contact form uses [Resend](https://resend.com) to send emails. To enable email functionality:

## WordPress (Headless CMS) Configuration

This site can pull page content from WordPress via WPGraphQL.

### Local Development

1. Copy `env.example` → `.env.local`
2. Ensure this is set:
   ```bash
   WP_GRAPHQL_ENDPOINT=http://cms.engineeringspecialisedsupport.com/graphql
   ```
3. Restart the dev server

### Production (Vercel)

Set the same environment variable in Vercel:
- **Name**: `WP_GRAPHQL_ENDPOINT`
- **Value**: `http://cms.engineeringspecialisedsupport.com/graphql`

### Local Development

1. Sign up for a free account at [resend.com](https://resend.com)
2. Get your API key from the [Resend dashboard](https://resend.com/api-keys)
3. Create a `.env.local` file in the root directory:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```
4. Restart your development server

### Production Deployment

**For Vercel:**
1. Go to your project settings on [Vercel](https://vercel.com)
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (starts with `re_`)
   - **Environment:** Production (and Preview if desired)
4. Redeploy your application for the changes to take effect

**For Hostinger:**
1. Log in to your Hostinger control panel (hPanel)
2. Navigate to your domain/website settings
3. Look for "Environment Variables" or ".env" file management
4. Add `RESEND_API_KEY` with your API key value
5. If using cPanel, you can add it via "Environment Variables" in the "Software" section
6. Restart your Node.js application or rebuild your site

**For Other Platforms:**
- **Netlify:** Site settings → Environment variables
- **Railway:** Project → Variables
- **Render:** Environment → Environment Variables
- **Fly.io:** Use `fly secrets set RESEND_API_KEY=your_key`

**Note:** For production, you'll need to verify a domain with Resend and update the `from` address in `src/app/actions/send-email.ts` from `"onboarding@resend.dev"` to your verified domain.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [DM Sans](https://fonts.google.com/specimen/DM+Sans) from Google Fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
