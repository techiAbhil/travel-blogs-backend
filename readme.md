# Travel Blog Backend

Its an travel blog posting app. Its an testing purpose app

## Node module installation

Install node libraries (Note: this is only needed first time)
`npm install`

## Start up app in dev mode

`npm run dev`

### Start up app in production mode

`npm run start`

### Database setup (MySQL)

You will need to create an database with the name as `travel-diaries-2026` and first you will have to create database schema.
To create database schema go to `prisma/migrations` directory and copy and paste the `sql`.
After the database has been setup run `npm run db:sync` in terminal so that it will generate required prisma files in `generated/prisma` directory.

### Extra info about project

Apart from this there are multiple commands, just go through package.json `scripts` object. Needless to say they did not need any special explanation. There is another `frontend` app design to connect this api's you can clone it from `[Frontend app](https://github.com/techiAbhil/travel-blogs-frontend)`. If you dont wish to use the frontend app there are `Postman.json`(if using postman) and `RQ.json`(if using requestly) collection files already created in root directory - simply use them.
