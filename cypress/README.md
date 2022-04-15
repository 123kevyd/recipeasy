# Cypress testing

## Seeding the db
Should aim to control db content during testing. Can do this using either cypress tasks or the before:run event, or a [supportFile](https://docs.cypress.io/guides/references/configuration#Folders-Files) in /cypress/support/index.js which runs before everything else.
This would be used with either sequelize transactions or migrations. Migrations will probably be easier, since transactions would (I think) require dependency injection, and a way must be found to rollback the changes after the tests are run.

https://docs.cypress.io/api/plugins/before-run-api
https://sequelize.org/docs/v6/other-topics/migrations/

## Resources

https://timdeschryver.dev/blog/reseed-your-database-with-cypress#creating-the-task


