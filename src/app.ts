import express from "express";
import morgan from "morgan";

import "./db";

const app = express();

// Logging all request to the server console
app.use(morgan("dev"));

// Route for testing
app.get("/", (req, res) => {
    res.send(
        "<style>body{display:flex;justify-content:center;align-item:center;}h1{box-sizing:border-box; border-radius:1rem;width:80%;font-size:5rem;text-align:center;text-transform:uppercase;font-family:helvetica;background:rgba(200,200,200, 0.3); padding:4rem;}</style><h1>Welcome to my typscript boilerplate</h1>"
    );
});

export default app;
