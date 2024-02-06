class Validator {
  static validateCode(req, res, next) {
    const length = req.params.code.length;
    if (length === 3) {
      next();
    } else {
      res
        .status(400)
        .send(
          'Invalid code parameter. Expecting 3 digits, received ' +
            typeof req.params.id
        );
    }
  }
}

module.exports = { Validator };
