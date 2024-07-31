import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

import { InferSelectModel, InferInsertModel } from "drizzle-orm";
export const timer = pgTable("timer", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  tasktext: text("tasktext").notNull(),
  starttime: integer("starttime").default(0),
  stoptime: integer("stoptime").default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

//Exporting the type of the single task(for stopewatch and timer)...
export type Task = InferSelectModel<typeof timer>;
//Infering the type of the task to be added
export type newTask = InferInsertModel<typeof timer>;
// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);
