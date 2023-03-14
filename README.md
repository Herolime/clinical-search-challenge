## Description

Software Engineer Challenge developed using [Nest](https://github.com/nestjs/nest) framework

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

Once ran, call the POST endpoint with the folowing url [http://localhost:4444/search] and use the following object in the request body:
```typescript
{
    "clinicName": string,
    "state": string, 
    "availability": {
        "from": string,
        "to": string
}
```
*All properties for request object are optional, try it!

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
