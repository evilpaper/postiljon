# Positiljon

A light, light, lightweight email service.

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

To test endpoints:

```sh
curl -X POST http://localhost:3000/send-email \
-H "Content-Type: application/json" \
-d '{"name":"John Doe","email":"john@example.com","message":"Hello there!"}'
```
