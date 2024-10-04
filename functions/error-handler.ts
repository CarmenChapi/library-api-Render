exports.errorHandler = (err: any, res: any, next: any) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};
