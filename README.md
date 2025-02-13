# Spaceflights Example App

A simple app that retrieves articles from the space flight API, based on [Remix](https://remix.run).

Deployed version: https://spaceflights-nu.vercel.app/

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server:

```sh
npm run dev
```

Open up [http://localhost:5173](http://localhost:5173)

## Test

The app uses vitest for unit and component testing:

```sh
npm run test
```

or

```sh
npm run coverage
```

## Api types

Since Space flight api provides a swagger file, the types were extracted to TS definitions by [swagger-typescript-api](https://www.npmjs.com/package/swagger-typescript-api).

To regenerate type definitions, place the latest swagger file into this repository and run

```sh
npx swagger-typescript-api -p ./api.yaml -o ./app/types -n api.ts
```
