---
name: "AI Form Builder"
description: "Create, publish, and manage forms using natural language prompts powered by AI."
date: 2026-06-07
live: false
wip: true
---

## About

Create forms by simply describing them in plain English. An LLM generates the questions, title, and description automatically, and users can refine the result through natural conversation. The LLM emits structured instructions (set title, add/edit/remove/reorder questions) which a deterministic engine applies — no risk of broken or empty form states.

Built as a portfolio project to explore LLM integration beyond basic API wiring.

## Features

- AI-powered form generation via natural language prompts with multi-turn conversational refinement
- Instruction-based editing — LLM generates edit operations, engine applies them deterministically
- Smart edit tracking — manual edits between AI prompts are detected and included in subsequent LLM context
- Form CRUD — create, preview, edit, publish/unpublish, and delete forms
- Multiple question types — text, single-select (radio), and multi-select (checkbox) with per-question required toggles
- Public form submission — published forms get a shareable link for anonymous responses with client-side validation
- Response analytics — aggregate answer summaries and individual response browsing with pagination
- JWT authentication — email/password registration and login with automatic token refresh

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, next-auth
- **Backend:** FastAPI, PostgreSQL, SQLAlchemy, Alembic, Groq API
- **Auth:** JWT (access + refresh tokens)

## Links

- [Frontend Source Code](https://github.com/bruce-pain/ai-form-builder-fe)
- [Backend Source Code](https://github.com/bruce-pain/AI-form-builder-be)
