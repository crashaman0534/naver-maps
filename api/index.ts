const express = require("express");
const axios = require("axios");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/get-directions", async (req, res) => {
    const { start, goal, option } = req.query;

    console.log("Query Params: ", { start, goal, option });

    const url = 'https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving';
    const headers = {
        'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': process.env.NAVER_CLIENT_SECRET
    };

    console.log("Request URL: ", url);
    console.log("Request Headers: ", headers);

    try {
        const response = await axios.get(
            url,
            {
                headers,
                params: {
                    start,
                    goal,
                    option
                }
            }
        );

        console.log("Respones status: ", response.status);
        console.log("Response data: ", response.data);

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error: ", error);
        if (error.response) {
            console.error("Error Response Data: ", error.response.data);
        }
        res.status(error.response ? error.response.status : 500).json({
            error: error.message,
            detail: error.response ? error.response.data : null,
        });
    }
});

// For local development
if (process.env.NODE_ENV === "development") {
    const PORT = process.env.PORT || 0; // This will choose	the port that Vercel provides
    const server = app.listen(PORT, () =>
        console.log(`Server running on port ${server.address().port}`)
                             );
}

module.exports = app;
