---
title: "AI Form Builder [DEVLOG] - Refining form generation"
description: "Implementing a multi turn conversational flow for refining forms by prompting + support for manual edits"
date: 2026-06-29
draft: false
---

<!--toc:start-->

- [Why I ditched Redis](#why-i-ditched-redis)
- [Some other cool stuff I did](#some-other-cool-stuff-i-did)
  <!--toc:end-->

In the last entry, I made a very simple LLM integration, all it did was return a form based on the prompt in one shot, basically stateless. That's fine if the LLM manages to generate what you want on the first try, but what if you wanted to make a few changes? That's a problem, because LLMs are stateless, they can only receive your prompt and generate a response from it, if you tried to give a second prompt referring to something it generated or something from your previous prompt, it wouldn't work because the LLM has no way of remembering stuff on its own.

To fix this we have to help the LLM remember stuff by giving it "memory". Memory in this case is basically just adding the stuff you want it to remember to the prompt you're sending, giving it full context.

Looking back on the [project overview](https://franklin-ikeh.vercel.app/writing/building-an-ai-form-builder#llm-integration) where I described the plan for LLM integration, I have made a few changes. The first major change was ditching Redis for Postgres.

## Why I ditched Redis

Why would I use Postgres over Redis? Well, Redis does sound like the perfect tool for this use case, and in fact, I did use Redis (check the [commit history](https://github.com/bruce-pain/AI-form-builder-be/commit/03e66f7548b96d6c814381e437dd37cabb1bcd2f)), but I changed my mind mid way. Here's why: I chose Redis because I wanted an ephemeral storage for the conversation context, it's not something that needs to be lying around once a conversation is finished, and with Redis's TTL feature it's easy to set an expiry for the data, but I gave it a second thought when I realized that it might be overkill for my use case.

Here is what I am sending to the LLM on each turn, `user_prompt + current_form_state + previous_user_prompts`, because the LLM can only respond in structured output which is the generated form, we only store the user prompt to give the LLM an idea of what the user has requested, it receives the current form state directly instead of guessing what the form currently looks like. The only thing Redis would be storing here is the list of previous user prompts. So I thought, maybe there is another way to handle this instead of setting up a whole Redis server just for that.

While, I was doing research, I came across `pg_cron`, which lets you achieve the same results but just with postgres, with `pg_cron` I could automatically schedule queries to delete expired conversations.

Then it hit me, maybe my definition of ephemerality in this case needs to be reviewed, and I came up with a different idea, persist the data in the database, no expiry, and only delete the conversation when the form can no longer be edited, which can happen in 3 cases, when the form is published, when it's deleted, or when the form creation is aborted mid session.

This greatly simplifies things, and I no longer have to worry about automatically clearing the conversation after an expiry period, and that explains why I removed Redis from the plan.

## Some other cool stuff I did

I also wanted to make it possible for the user to manually edit the form during the conversation and those edits could be tracked in the LLM context, so that it knows when the user makes changes.

When you send a prompt and the LLM generates a form, that form gets stored in the frontend state, when the user tries to send another prompt, the current state is compared with the last LLM-generated state to track the changes, these changes are baked into the prompt and is added to the context

I also modified the prompt and schema to recognize these edits and also generate title and description with the form
