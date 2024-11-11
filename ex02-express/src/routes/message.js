import { Router } from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

const router = Router();

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

const checkScopes = requiredScopes(process.env.READ_MESSAGES_SCOPE);

router.get("/", checkScopes, async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.send(messages);
});

router.get("/:messageId", async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId
  );
  return res.send(message);
});

router.post("/", async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(message);
});

router.delete("/:messageId", async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });

  console.log("delete result: ", result);

  return res.send(true);
});

export default router;
