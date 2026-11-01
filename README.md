# VYBE

VYBE is a social discovery app designed around real people, visual discovery, and meaningful connections.

## Current status

This repository contains the initial React + TypeScript + Vite front-end foundation:
- Responsive app shell and navigation
- Home with Visual / Posts view switching
- Discover, Create, Messages, Profile and Settings screens
- Honest empty states; no fabricated users or filler content
- Basic local media selection preview

**Backend services are not connected yet.** Authentication, persistent posts, media uploads, message requests, messaging, notifications, privacy rules and production data must be implemented and tested with Supabase before launch. The Create screen intentionally does not pretend to publish.

## Run locally / in Codespaces

1. Install a current Node.js LTS version.
2. In the project directory, run `npm install`.
3. Run `npm run dev`.
4. Open the local Vite URL shown in the terminal.

## Build

Run `npm run build`.

## Product principles

- No public follower or following counts.
- No popularity or attractiveness rankings.
- Discovery is based on interests and compatibility.
- Message requests give recipients control over their inbox.
- No fake accounts, fake activity, or pretend functionality.
