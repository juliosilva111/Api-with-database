import {
    pgTable,
    integer,
    varchar
} from "drizzle-orm/pg-core";

export const usuarios = pgTable("usuarios", {
    id: integer()
        .primaryKey()
        .generatedAlwaysAsIdentity(),

    nome: varchar({ length: 100 })
        .notNull(),

    email: varchar({ length: 150 })
        .notNull()
        .unique(),

    idade: integer()
});