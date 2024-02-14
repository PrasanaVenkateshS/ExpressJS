Rate limiting.

1. Spin up a redis container using Docker in port 6379. (https://sunitc.dev/2018/04/12/redis-basics-installation-datastructures/)
2. Clone the project.
3. npm install inside the src folder.
4. node app.js to run server on port 3000.
5. Hit the API from Postman <br/>
   a) localhost:3000/redis_token -> token bucket algo rate limiting <br/>
   b) localhost:3000/redis_sortedset -> sliding window algo rate limiting.
