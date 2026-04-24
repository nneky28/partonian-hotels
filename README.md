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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Runtime Content Updates (Google Sheets)

You can now update branch prices, nearby attractions, and footer text without redeploying.

### 1) Add environment variables on your server (cPanel)

- `GOOGLE_SHEET_ID`: your Google Sheet ID
- `GOOGLE_SHEET_GID`: tab ID (optional, defaults to `0`)

Example:

```bash
GOOGLE_SHEET_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz
GOOGLE_SHEET_GID=0
```

### 2) Sheet format

Create a sheet tab with these headers in row 1:

- `branch`
- `section`
- `key`
- `value`
- `extra`

Supported sections:

- `room_price`
- `attraction`
- `footer`

#### Room prices

- `branch`: `lekki`, `ikate`, or `awka`
- `section`: `room_price`
- `key`: exact room name as shown on site (for example `Deluxe`, `Executive Suite`)
- `value`: amount (for example `80000` or `₦80,000`)

#### Nearby attractions

- `branch`: `lekki`, `ikate`, or `awka`
- `section`: `attraction`
- `key`: attraction name
- `value`: distance label (for example `5 MIN DRIVE`)
- `extra`: display position (`1`, `2`, `3`...)

#### Footer (global)

- `branch`: `global`
- `section`: `footer`
- `key`: one of:
	- `copyright`
	- `design_text`
	- `design_url`
- `value`: text/url value

### 3) Publish the sheet

In Google Sheets:

1. File -> Share -> Publish to web
2. Publish the tab used by this content
3. Ensure the document can be accessed publicly (view only)

### Notes

- If the sheet is unreachable, the website automatically falls back to hardcoded defaults.
- Changes are loaded at runtime, so content updates do not require a new deployment.
