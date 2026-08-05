---
name: "Formbrew"
description: "Create, publish, and manage forms using natural language prompts powered by AI."
date: 2026-06-07
live: true
wip: true
---

## About

Formbrew is a full-stack form builder: describe a form in plain English, and an LLM generates the questions, title, and description automatically, ready to refine through natural conversation. The LLM emits structured instructions (set title, add/edit/remove/reorder questions) which a deterministic engine applies: no risk of broken or empty form states. A landing page with a live demo walks through the whole experience.

Built as a portfolio project to explore LLM integration beyond basic API wiring.

## Features

- AI-powered form generation via natural language prompts with multi-turn conversational refinement
- Instruction-based editing: LLM generates edit operations, engine applies them deterministically
- Smart edit tracking: manual edits between AI prompts are detected and included in subsequent LLM context; AI-added questions are badged as New in the editor
- Form CRUD with autosave: create, preview, edit, publish/unpublish, and delete forms, auto-saved after every AI generation
- Multiple question types: text, single-select (radio), and multi-select (checkbox) with per-question required toggles and inline-editable, draggable options
- Drag-and-drop reordering: rearrange questions by dragging
- Public form submission: published forms get a shareable link for anonymous responses with client-side validation and inline required errors
- Response analytics: aggregate answer summaries per question (including select distributions with counts and percentages) and individual response browsing with prev/next and go-to navigation
- JWT authentication: email/password registration and login with automatic token refresh
- Landing page with live demo: showcase of the builder, how-it-works, and FAQ
- Coffee-and-cream theming: dark/light themes with next-themes
- Dynamic social previews: custom OG cards rendered per form

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, next-auth, next-themes
- **Backend:** FastAPI, PostgreSQL, SQLAlchemy, Alembic, Groq API
- **Auth:** JWT (access + refresh tokens)

## Links

- [Live Site](https://formbrew.vercel.app/)
- [API Docs](https://ai-form-builder-be.onrender.com/v1/docs)
- [Frontend Source Code](https://github.com/bruce-pain/formbrew-fe)
- [Backend Source Code](https://github.com/bruce-pain/formbrew-be)
