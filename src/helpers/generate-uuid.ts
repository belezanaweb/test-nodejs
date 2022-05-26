import { v4 as uuidv4 } from "uuid";

export function generate(): string {
  return uuidv4();
}
