# Recipeasy

Team members <br/>
Kevin Derksen - 123kevyd <br/>
Edmund Wong - wonge1 <br/>
Xian Mardiros - RightMakesMight <br/>
Vinh Tran - vinhtrann <br/>
Sebastian Araneda - sebaraneda <br/>

Core Features
- Recipe Selector
- Meal Planner
- Recipe Ratings
- User Recipes
- Can respond to 100 users with 1000 requests per minute concurrently

Tech
- planning to use react for front end
- planning to use node js for backend
- planning to scrape websites for recipes
- planning to use github action for ci

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Commands Section

Sync tables with database by running:
```bash
npm run migrate
```

Roll back from previous migration:
```bash
npm run down
```

Testing Backend: 
```bash
npm run testBackend
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


##NextJS

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## pgAdmin

To install the dockerized pgAdmin:
`docker pull dpage/pgadmin4`
To run the pgAdmin container:
`
docker run -p 80:80 \
	-e 'PGADMIN_DEFAULT_EMAIL=user@domain.com' \
	-e 'PGADMIN_DEFAULT_PASSWORD=SuperSecret' \
	-d dpage/pgadmin4`
For copy-pasting:
docker run -p 80:80 -e 'PGADMIN_DEFAULT_EMAIL=user@domain.com' -e 'PGADMIN_DEFAULT_PASSWORD=SuperSecret' -d dpage/pgadmin4`
It may be necessary to use a different port.
Then access localhost:80/ in a web browser and enter the credentials used while running the container.
Create a new server with the following info in the connection tab:

Host name: database-1.cg8ib7yp5ium.us-east-1.rds.amazonaws.com
Port: 5432
username: postgres
password: comp4350

## Known issues

If running this code in development on a windows machine and you encounter this error:
`Unsupported platform for @next/swc-linux-x64-gnu@12.1.0`

First, ensure you are using at least version 17.0.0 or above of node and 8.5.x of npm

Second, delete package-lock.json and remove the @next/swc-linux-x64-gnu@12.1.0 from the package.json dependencies.

Finally, you should be able to run npm install with no issues
