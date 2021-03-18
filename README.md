# Setup of project locally

- clone repo
- npm install
- setup your local Postgres SQL database
  -to create tables use these db-migration commands:
  -create github app to login to the knowledge-checklist
  -create `.env` file and use `.env.example` for reference of configuration

  ### Local db:

  1-for tables use =>`npm run db-migrate`,
  2-to add learning objectives use => `npm run db-loadfixtures`
  -In order to connect the server with local db, add configuration from `.env.example` to `.env` file

## Entry points in the app to get started adding features:

- Client folder ---> src contains all the front-end code.
- Server Folder contains all the back-end code.

# Design considerations or Trade offs

- To keep with Code Your Futures brand colours
- Frontend:-
  - React Hooks - list available in package json
- Backend:-
  - cookiesesseion : used for authorisation and verification
  - nodejs express : Works well with postgre sql
  - Postgres SQL: open source relational database

# Features or things to add/change/remove in the future

- Add a registration policy for mentors (to be be clarified)
- Add a simple user profile with account settings
- Mentors view - Add a class overview of skills
- Add Mongodb and its learning objectives
- Graphical representation of modules covered for each student

# Scripts

Various scripts are provided in the package file, but many are helpers for other scripts; here are the ones you'll
commonly use:

- `dev`: starts the frontend and backend in dev mode, with file watching (note that the backend runs on port 3100, and
  the frontend is proxied to it).
- `lint`: runs ESLint against all the JavaScript in the project.
- `serve`: builds and starts the app in production mode locally.

## Scripts for db staging and production

### Heroku(staging) db:

- `heroku login`: to Login to Heroku db from any terminal
- `npm run db-migrate-staging`: to add tables
- `npm run db-loadfixtures-staging`: to add learning objectives

### Production db:

-For the production there is config file called `config.yml` this will update the db automatically once you push to master branch.

# Debugging

While running the dev mode using `npm run dev`, you can attach the Node debugger to the server process via port 9229.
If you're using VS Code, a debugging configuration is provided for this.

There is also a VS Code debugging configuration for the Chrome debugger, which requires the recommended Chrome
extension, for debugging the client application.

### Troubleshooting

See the guidance in the [wiki].

[babel]: https://babeljs.io/
[cloud foundry]: https://www.cloudfoundry.org/
[collaborators]: https://help.github.com/en/articles/inviting-collaborators-to-a-personal-repository
[docker]: https://www.docker.com
[eslint]: https://eslint.org/
[express]: https://expressjs.com/
[express router]: https://expressjs.com/en/guide/routing.html#express-router
[heroku]: https://www.heroku.com/
[heroku postgres]: https://www.heroku.com/postgres
[node]: https://nodejs.org/en/
[pull request]: https://help.github.com/en/articles/about-pull-requests
[react]: https://reactjs.org/
[webpack]: https://webpack.js.org/
[wiki]: https://github.com/textbook/starter-kit/wiki
