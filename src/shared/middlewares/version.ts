import * as fs from 'fs';
import * as path from 'path';

const VERSION = fs
  .readFileSync(path.resolve(process.cwd(), './package.json'))
  .toString();

export function version(req, res, next) {
  res.json({ version: JSON.parse(VERSION.trim()).version });
  next();
}
