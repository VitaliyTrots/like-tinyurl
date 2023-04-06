# Like TinyURL full-stack project

Test full-stack project.

## Contents
- [Like TinyURL](#tinyURL)
  - [Contents](#contents)
  - [Installation](#installation)
    - [Back-end](#backend)
    - [Front-end](#frontend)
  - [Development](#development)
    - [Running the backend](#running-the-backend)
    - [Running the frontends](#running-the-frontends)

## Installation

With node@16.14.2 and npm installed. You also need PostgreSQL installed.

### Back-end

1. In directory `backend` install project and package dependencies `npm install`.
2. Duplicate `.env.example` to `.env` and populate it with needed values. You should set `NODE_ENV`, `PORT`, `DB_HOST`, `DB_NAME`, `DB_USER` and `DB_PASSWORD`.
3. All migrations run automatically every time you start the application (if needed), so you don't have to run them manually.

### Front-end

1. In directory `frontend` install project and package dependencies `npm install`.
2. Duplicate `.env.example` to `.env` and populate it with needed values. You should set `REACT_APP_BACKEND_HOST`.

## Development

Development may require running one or both components. If you want to run a single component, go to the appropriate folder and run `npm start`. If you are working with the frontend and you need to test requests to the backend, run both components in parallel tabs of the terminal.

### Running the backend

Having installed and built things, as described above, you can run the backend like this:

```sh
# Normal app launch
npm start

# Launch with file watching
npm run dev
```

### Running the frontend

Run the react app with this command:

```sh
npm start
```

The browser will automatically open and the app will automatically reload upon changes.
