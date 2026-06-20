---
title: "Frontend prototype"
date: 2026-06-16
draft: false
---

Before I get started with the LLM integration, I thought I should quickly cook up a working frontend to test the existing functionality.
I know a bit of NextJS so I let opencode do most of the coding for me, so it was pretty quick, the frontend is mostly vibe-coded, but I'm being pretty careful with it.

The frontend stack remains mostly the same, NextJS and Tailwind, I also added `next-auth`. Since, I'm not exactly a proper frontend developer and I don't exactly plan on diving deep into that anytime soon, I asked Claude to walk me through how it would start a new NextJS project, and that was how it introduced me to `next-auth`

here is what I have done so far

- Auth (login, signup)
- Dashboard
- Form overview
- Form creation (`/forms/new`)
- Form editor (`/forms/[id]/edit`)
- Form response page (`/forms/public/[id]`)
- Responses list (`/forms/[id]/responses`)
- Response detail (`/forms/[id]/responses/[response_id]`)

For now, everything is just crude, the next big milestone is wiring up the AI prompt bar to an actual LLM service
