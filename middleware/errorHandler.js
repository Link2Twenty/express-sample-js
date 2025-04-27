// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, _req, res, _next) {
  const status = err?.cause?.status || 500;
  const error = status === 500 ? 'Internal Server Error' : err?.message || 'Internal Server Error';

  if (status === 500) console.error(err.stack);

  res.status(status).json({ data: null, error });
}
