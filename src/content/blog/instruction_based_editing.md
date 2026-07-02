---
title: "AI Form Builder [DEVLOG] - Instruction based editing"
description: "Creating and editing forms with a series of instructions, not one shot generation"
date: 2026-07-02
draft: false
---

When the user sends a prompt, the client also sends the current state of the form (what the user sees in the UI), the LLM generates a new form state and sends it back to the client, even for minor edits like "remove the third question" the LLM would regenerate the entire form with the requested change. That was inefficient and it also caused a few bugs during testing, in one case the LLM sent an empty form back to the client, clearing everything that was already created. In another case, the LLM sent a form state with only the requested edit instead of applying the edit to the current form state that it received.

I figured a better solution was to give the LLM a set of operations and tell it to create a form using these operations. Now the LLM isn't generating the form, it is generating a list of instructions for creating the form, then the backend takes these instructions and deterministically creates or modifies the current form state. This way for a basic instruction like "add a new field", the LLM only needs to generate an instruction to do that instead of regenerating the entire form.

First, I had to define what kind of operations the LLM can do on the form state i.e edit title, edit description, add question, edit question, remove question. After defining these in a schema, I would set the schema as the structured output format for the LLM, this way it only responds in a list of these instructions. Once the backend receives these instructions, they are passed through an instruction engine that applies them to the current state, then the result is what gets sent to the client.

The benefits of this are that I save output tokens for basic requests, and because the LLM doesn't edit the state directly, there is no risk of it sending an empty or broken form state that causes problems. For now, the LLM integration part of the project seems to be stable. I can move on to working on other features.
