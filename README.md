# Favorite Movies API

A small NestJS API for keeping a personal list of favorite movies. Data is stored in a local SQL.js database; TypeORM runs the included migration on startup. Each movie has a generated ID, title, director, release year, genre, 0–10 rating, notes, and creation timestamp. The title is required; the other movie details are optional.

Copy `.env.example` to `.env`, set a private `API_TOKEN`, and run `npm install` followed by `npm run start:dev`. The five CRUD routes are:

| Action | Method | URL |
|---|---|---|
| List all movies | GET | `/movies` |
| Get one movie | GET | `/movies/:id` |
| Create a movie | POST | `/movies` |
| Update a movie | PATCH | `/movies/:id` |
| Delete a movie | DELETE | `/movies/:id` |

Creating a movie requires `Authorization: Bearer <API_TOKEN>`; other CRUD routes are public for this class project. Invalid input returns 400, unauthenticated creation returns 401, and unknown movie IDs return 404. Import `postman/Favorite-Movies.postman_collection.json` to try the requests. Run `npm run test`, `npm run test:e2e`, and `npm run build` to validate the project. Build and run the container with `docker build -t favorite-movies-api .` and `docker run -p 3000:3000 -e API_TOKEN=your-token -v movies-data:/app -e MOVIES_DB_PATH=/app/movies.db favorite-movies-api`.

## Reflection

The hardest part was wiring the database migration and the API behavior together so the tests exercise real persistence rather than a mock. I also had to make authentication easy to demonstrate without adding another public endpoint. With more time, I would add user accounts so each person can manage a private movie list.
