module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await hendler(req, res, next);
    } catch (ex) {
      next(ex);
    }
  };
};
