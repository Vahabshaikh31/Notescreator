require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const app = express();
app.use(cors());

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

app.get("/", (req, res) => {
  res.send("Public API - No authentication required");
});

app.get("/protected", checkJwt, (req, res) => {
  res.send("Protected API - You are authenticated");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
