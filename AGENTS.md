# Project Guidance

## User Preferences

[No preferences yet]

## Verified Commands

**Frontend** (run from `src/frontend/`):

- **install**: `pnpm install --prefer-offline`
- **typecheck**: `pnpm typecheck`
- **lint fix**: `pnpm fix`
- **build**: `pnpm build`

**Backend** (run from `src/backend/`):

- **install**: `mops install`
- **typecheck**: `mops check --fix`
- **build**: `mops build`

**Backend and frontend integration** (run from root):

- **generate bindings**: `pnpm bindgen` This step is necessary to ensure the frontend can call the backend methods.

## Learnings

- Lambda predicates passed to `List.find()` and `List.filter()` require an explicit `: Bool` return type annotation (e.g., `func(b : T) : Bool { b.id == id }`), otherwise Motoko infers the block returns `()`.
- `List.map<T, R>()` requires BOTH type parameters explicitly when called via dot notation — `list.map<BookInternal, Book>(func(b) { ... })`.
- Array `.map()` only needs one type parameter (the output): `arr.map<In, Out>(f)` not `arr.map<Out>(f)`.
- Mixin parameters are immutable — cannot assign to a `var Nat` param. Use a `Counter` record `{ var value : Nat }` passed by reference so the mixin can mutate the counter via `.value :=`.
