import knex from "knex";

export abstract class BaseDatabase {
  private connectionData = {
    host: "ec2-54-87-26-5.compute-1.amazonaws.com",
    port: 3306,
    user: "patricia",
    password: "paty",
    database: "semana20"
  };

  protected connection = knex({
    client: "mysql",
    connection: this.connectionData
  });
}
