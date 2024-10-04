const validateRegisterteSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        return res.status(400).json({error: error.errors.map((error) => error.message), user: null, message: "Request body errors!"})
    }
}

const validateLoginSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        return res.status(400).json({error: error.errors.map((error) => error.message), user: null, message: "Request body errors!"})
    }
}


const validateSendEmailSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({
        error: error.errors.map((error) => error.message),
        response: null,
        message: "Request body errors!",
      });
  }
};

export {validateLoginSchema, validateRegisterteSchema, validateSendEmailSchema}