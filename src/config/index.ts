import { config } from 'dotenv';

/*
 * Aqui estamos dizendo para o dotenv
 * onde ele deve buscar as variáveis de ambiente
 * NODE_ENV será o stage da nossa aplicação [dev, qa, prod, local, etc...]
 */
const envfile = `.env.${process.env.NODE_ENV}`;
const envdir = process.cwd();

config({ path: `${envdir}/${envfile}` });

export const server = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
}
