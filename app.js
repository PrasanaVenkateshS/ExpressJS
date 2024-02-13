const express = require("express");
const redis = require("redis");
var app = express();

let client = redis.createClient(6379);

client.on("error", (err) => {
  console.log(err);
});
client.connect();

app.get("/", (req, res) => {
  res.send("<h1>Hello Welcome to Redis Cache </h1>");
});

app.get("/redis_token", async (req, res) => {
  const count = await client.get("count");
  if (count == null) {
    client.set("count", "4", { EX: 30 });
    res.send("added");
    res.status(200);
  } else if (count == 0) {
    res.send("rate limited");
    res.status(200);
  } else {
    const ttl = await client.ttl("count");
    console.log(ttl);
    client.set("count", count - 1, { EX: ttl });
    res.send("added");
    res.status(200);
  }
});

app.get("/redis_sortedset", async (req, res) => {
  // remove 30 sec before timestamps.
  client.zRemRangeByScore("timestamps", 0, Date.now() - 60 * 1000);

  //   fetch all available timestamps.
  let data = [];
  data = await client.zRange("timestamps", 0, -1);

  // add current timestamp to set.
  client.zAdd("timestamps", {
    score: Date.now().toString(),
    value: Date.now().toString(),
  });
  //   check for frequent requests
  if (Date.now() - Number(data[data.length - 1]) <= 2000) {
    res.send("Frequent requests.");
    res.status(200);
  }
  //   check for too many requests.
  else if (data.length > 5) {
    res.send("Rate limit reached, wait for some time.");
    res.status(200);
  } else {
    res.send("done");
    res.status(200);
  }
});

app.listen(3000, () => {
  console.log("server is live on port 3000");
});
