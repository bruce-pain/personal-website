---
title: "AI Form Builder [DEVLOG] - Minimal LLM integration"
description: "starting with a very basic implementation of the llm integration feature"
date: 2026-06-20
draft: false
---

Today, I managed to cook up a very minimal version of the LLM integration, all it does for now is receive a prompt and generate a structured output. It's just a starting point, and I have already wired it up to the frontend just so I can test what it would look like.

I have also made a change to the original plan, which was to use langchain for building the LLM service. During my simple custom agent sidequest, I learned that the LLM provider's SDK (Groq, in this case), is actually sufficient enough for my basic needs, and using langchain would be overkill.

So, I'll be using the Groq SDK directly, instead of langchain.
