
export function ping(req, res, next): void {
  res.status(200).send({ detail: 'ok' });
  next();
}
