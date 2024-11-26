import "dotenv/config";
import cors from "cors";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

import models, { sequelize } from "./models";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("rwieruch"),
  };
  next();
});

const checkJwt = auth({
  audience: process.env.AUDIENCE, 
  issuerBaseURL: process.env.ISSUER_BASE_URL, 
  tokenSigningAlg: process.env.TOKEN_ALG, 
});
app.use(checkJwt);

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";
const port = process.env.PORT || 3000;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@rwieruch.com",
      messages: [
        {
          text: "Published the Road to learn React",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );

  await models.User.create(
    {
      username: "ddavids",
      email: "ddavids@ddavids.com",
      messages: [
        {
          text: "Happy to release ...",
        },
        {
          text: "Published a complete ...",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );
};

module.exports = app;
