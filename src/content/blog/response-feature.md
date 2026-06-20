---
title: "AI Form Builder [DEVLOG] - Response feature"
date: 2026-06-09
draft: false
---

Responses were super easy to work on, for the model, I had already done the hard work figuring out the `TypeDecorator` while working on the question column for the forms model, this time I just need to use the same custom type I created.

I made a public endpoint for submitting responses and private endpoints for response management

the fun part was implementing answer validation, I needed to validate that the answers in a submitted response actuall match the questions of the form being submitted to.

I also went over the Pydantic schemas for `FormQuestion` and `ResponseAnswer` to add some validation there too.

Usually, I would use the `Field()` class for adding some constraints to a single field, then I learned how to use the `@model_validator(mode='after')` to handle cross-field validation.
Pretty useful when you want to a certain field's constraints to depend on what happens in another field.
