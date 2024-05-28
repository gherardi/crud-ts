[Diagramma](https://excalidraw.com/#json=mgVrMVDTconKdsLV46sX-,HX6Z7AZ0P1y7EIzvvj0Fbg)
# Typescript RESTful API

Questo progetto è un'API robusta e scalabile scritta interamente sfruttando tutti i vantaggi di Typescript per garantire un codice pulito e affidabile.
Sfrutta al massimo le capacità di Typescript per migliorare la manutenibilità e la chiarezza del codice, consentendo una più facile gestione e espansione del progetto nel tempo.
## Tech Stack

**Server:** Node.js, Express, Typescript (ts-node), JWT (Json Web Token) for auth, Zod (schema validator), Supabase (DB)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SUPABASE_URL`

`SUPABASE_KEY`

`JWT_SECRET`

`JWT_EXPIRES_IN`
## Run Locally

Clone the project

```bash
  git clone https://github.com/gherardi/ts-restful-api
```

Go to the project directory

```bash
  cd ts-restful-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Deployment

To deploy this project run

```bash
  npm run build
```
