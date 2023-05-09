## warehouse-service

I basically ran out of time I'm afraid.

I started out with a expressjs app that I've added functionality to.

First lining, I think it's cheap and keeps a few bugs away

Add dotenv and create specific file for config and refacor into a MVC structure.

Add the product functionality

Add tests, I generally do not TDD but like to have 100% test coverage

Add data validation

Add CI configuration

I started on OpenAPI documentation but didn't have time to finish the implementation. There exists a branch if anyone is interested.

If I were to do this again I would definitely use nestjs as that would give much more structure. I generally don't like solutions that are as "enterprise" but when running the application in a much larger system where OpenAPI docs, integrated validation, etc.

I started with a nestjs app here: https://github.com/triptec/warehouse-api

### Things I've thought about and would be happy to talk about

* Lint
* Unittests
* Error handling
* Application structure
* CD/CI(github actions)
* Configuration dotenv
* Typevalidation (zod)
* OpenAPI(tsoa)
* API versioning
* Integrationtests
* Pagination and filtering
* Logging(winston/morgan)
* Instrumentation(sentry)
* Dockerize
* Database(TypeORM)
* DTOs Together with the schemas
* Authentication(for services even for internal systems)
* Ratelimiting(depending on authorization so we can limit bad behaved clients)
* Perhaps look into idempotency and/or only have increment/decrement for the stock, depending on how it's used.