const express = require("express");
const axios = require("axios");
const redis = require("redis");
const app = express();

const redisPort = 6379
const client = redis.createClient(redisPort);

client.on("error", (err) => {
    console.log(err);
})

app.get("/jobs", (req, res) => {
    const searchTerm = req.query.search;
    try {
        client.get(searchTerm, async (err, jobs) => {
            if (err) throw err;
    
            if (jobs) {
                res.status(200).send({
                    jobs: JSON.parse(jobs),
                    message: "data retrieved from the cache"
                });
            }
            else {
                const jobs = await axios.get(`https://jobs.github.com/positions.json?search=${searchTerm}`);
                client.setex(searchTerm, 600, JSON.stringify(jobs.data));
                res.status(200).send({
                    jobs: jobs.data,
                    message: "cache miss"
                });
            }
        });
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Node server started");
});