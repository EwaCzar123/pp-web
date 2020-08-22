import { Area } from "../interfaces/area";
import { User } from "./user";

export interface Response {
  areas: Area[];
  userDetails: User;
}