const { HttpError } = require("../helpers");

const validateVerifyBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.entries(req.body).length === 0) {
      res.status(400);
      res.json({
        message: "Missing required field email",
      });
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};
module.exports = validateVerifyBody;
