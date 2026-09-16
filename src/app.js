import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import db from "./database.js";
import { usuarios } from "./schema.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarUsuario(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return "O corpo da requisição deve ser um objeto JSON";
    }

    const { nome, email, idade } = body;

    if (typeof nome !== "string" || nome.trim().length < 2 || nome.trim().length > 100) {
        return "nome deve ser um texto entre 2 e 100 caracteres";
    }

    if (typeof email !== "string" || email.length > 150 || !emailPattern.test(email.trim())) {
        return "email deve ser um endereço válido com até 150 caracteres";
    }

    if (idade !== undefined && (!Number.isInteger(idade) || idade < 0 || idade > 150)) {
        return "idade deve ser um número inteiro entre 0 e 150";
    }

    return null;
}

export function createApp(database = db) {
    const app = express();

    app.disable("x-powered-by");
    app.use(helmet());
    app.use(express.json({ limit: "10kb" }));
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: "draft-8",
        legacyHeaders: false
    }));

    app.get("/health", (_request, response) => {
        response.json({ status: "ok" });
    });

    app.get("/usuarios", async (_request, response) => {
        const resultado = await database.select().from(usuarios);
        response.json(resultado);
    });

    app.post("/usuarios", async (request, response) => {
        const erro = validarUsuario(request.body);

        if (erro) {
            return response.status(400).json({ erro });
        }

        try {
            const [novoUsuario] = await database
                .insert(usuarios)
                .values({
                    nome: request.body.nome.trim(),
                    email: request.body.email.trim().toLowerCase(),
                    idade: request.body.idade
                })
                .returning();

            return response.status(201).json(novoUsuario);
        } catch (error) {
            if (error?.cause?.code === "23505" || error?.code === "23505") {
                return response.status(409).json({ erro: "email já cadastrado" });
            }

            throw error;
        }
    });

    app.use((_request, response) => {
        response.status(404).json({ erro: "Rota não encontrada" });
    });

    app.use((error, _request, response, _next) => {
        if (error instanceof SyntaxError && "body" in error) {
            return response.status(400).json({ erro: "JSON inválido" });
        }

        console.error(error);
        return response.status(500).json({ erro: "Erro interno do servidor" });
    });

    return app;
}

export default createApp;
