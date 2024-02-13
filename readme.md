Rate limiting.

1. Spin up a redis container using Docker in port 6379.
2. Clone the project.
3. npm install inside the src folder.
4. node app.js to run server on port 3000.
5. Hit the API from Postman
   a) localhost:3000/redis_token -> token bucket algo rate limiting
   b) localhost:3000/redis_sortedset -> sliding window algo rate limiting.
