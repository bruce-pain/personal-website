---
title: "Forms feature (continued)"
date: 2026-06-08
draft: false
---

After creating the model, I need to create a repository, service, schemas, and routes.

Generally, this is how I structure my code:

- `models.py`: Define all the tables as SQLAlchemy model classes
- `repository.py`: This is where I keep all the ORM queries, so it's the only part of the feature that talks directly to the database.
- `service.py`: All the logic goes here.
- `schemas.py`: This is where I create Pydantic models for request and response bodies
- `routes.py`: This is where I define all the API endpoints.

This is the easy part, defining all the CRUD endpoints and logic, so I used opencode to speed it up.

at this point I have completed the form management feature.
