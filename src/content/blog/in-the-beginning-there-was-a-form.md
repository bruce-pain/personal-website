---
title: "In the beginning there was a form"
date: 2026-06-07
draft: false
---

I started the project by creating a github repo using my [FastAPI Boilerplate](https://github.com/bruce-pain/FastAPI-boilerplate) template repository, I use it as a starting point for most of my projects now, just so I don't have to set everything up from scratch.

I decided to start working on the model for the form feature.

I could have simply defined the questions column as a JSONB column, but I learned how to use SQLAlchemy's `TypeDecorator` for augmenting existing types, like the JSONB type.

```python
import sqlalchemy as sa
from pydantic import BaseModel

class PydanticType(sa.types.TypeDecorator["BaseModel"]):
    pass
```

The `TypeDecorator` class in SQLAlchemy is used when you need to add some specific data marshalling behaviour to specific types.
Like in my case, I want to use Pydantic to validate the JSON objects on insertion and retrieval
Insertion: I give a pydantic object, SQLAlchemy converts it to JSONB and stores it.
Retrieval: SQLAlchemy gets the JSONB, converts it to a Pydantic object and returns it

> **Data Marshalling** - The process of transforming the memory representation of an object to a data format suitable for storage or transmission to another part of a system, when data must be moved between different parts of a computer program or from one program to another. In terms of SQLAlchemy, we often need to "marshal" data into a format appropriate for passing into the relational database.

some useful resources that helped me:

- [Official SQLAlchemy docs: Custom Types](https://docs.sqlalchemy.org/en/20/core/custom_types.html)
- [sqlalchemy_with_pydantic_v2.py (Github gist)](https://gist.github.com/pdmtt/a6dc62f051c5597a8cdeeb8271c1e079)

I faced some issues with migration (Alembic autogeneration) after adding the TypeDecorator to the model. The generated migration file tried creating the questions column like this:

```python
sa.Column('questions', path.to.types.PydanticType(astext_type=Text()), nullable=True),
```

That caused some errors when I tried to run `alembic upgrade`.

The fix was to apply a custom rendering for my custom type in the `alembic/env.py` file,

```python
def render_item(type_, obj, autogen_context):
    """Apply custom rendering for PydanticType."""
    if type_ == "type" and isinstance(obj, PydanticType):
        autogen_context.imports.add("from sqlalchemy.dialects.postgresql import JSONB")
        return "JSONB()"
    return False

def run_migrations_online() -> None:
    ---
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            render_item=render_item,
        )
```

running migration again would genererate this instead:

```python
sa.Column('questions', JSONB(), nullable=True),
```

problem solved

useful resources:

- [Autogenerate renders TypeDecorator... (Github Issue on Alembic's Github repo)](https://github.com/sqlalchemy/alembic/issues/1386)
- [Alembic documentation: Autogenerate](https://alembic.sqlalchemy.org/en/latest/autogenerate.html#auto-generating-migrations)
