import test from "node:test";
import assert from "node:assert/strict";
import appFactory from "../src/app.js";

function createDatabase({ error, users = [] } = {}) {
    const insertedValues = [];

    return {
        insertedValues,
        select: () => ({
            from: async () => users
        }),
        insert: () => ({
            values: (value) => {
                insertedValues.push(value);
                return {
                    returning: async () => {
                        if (error) {
                            throw error;
                        }

                        return [{ id: 1, ...value }];
                    }
                };
            }
        })
    };
}

async function request(baseUrl, path, options = {}) {
    return fetch(`${baseUrl}${path}`, options);
}

async function withServer(database, callback) {
    const app = appFactory(database);
    const server = app.listen(0);
    const { port } = server.address();

    try {
        await callback(`http://127.0.0.1:${port}`);
    } finally {
        await new Promise((resolve) => server.close(resolve));
    }
}

test("GET /health retorna status e headers de segurança", async () => {
    await withServer(createDatabase(), async (baseUrl) => {
        const response = await request(baseUrl, "/health");

        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { status: "ok" });
        assert.equal(response.headers.get("x-content-type-options"), "nosniff");
        assert.equal(response.headers.get("x-powered-by"), null);
    });
});

test("GET /usuarios retorna os usuários do banco", async () => {
    const users = [{ id: 1, nome: "Maria Silva", email: "maria@exemplo.com", idade: 30 }];

    await withServer(createDatabase({ users }), async (baseUrl) => {
        const response = await request(baseUrl, "/usuarios");

        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), users);
    });
});

test("POST /usuarios rejeita dados inválidos antes do banco", async () => {
    const database = createDatabase();

    await withServer(database, async (baseUrl) => {
        const response = await request(baseUrl, "/usuarios", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ nome: "A", email: "invalido", idade: 200 })
        });

        assert.equal(response.status, 400);
        assert.equal(database.insertedValues.length, 0);
    });
});

test("POST /usuarios rejeita cada regra de validação", async () => {
    const casos = [
        { body: [], mensagem: "O corpo da requisição deve ser um objeto JSON" },
        { body: { email: "maria@exemplo.com" }, mensagem: "nome deve ser um texto entre 2 e 100 caracteres" },
        { body: { nome: "Maria", email: "invalido" }, mensagem: "email deve ser um endereço válido com até 150 caracteres" },
        { body: { nome: "Maria", email: "maria@exemplo.com", idade: 1.5 }, mensagem: "idade deve ser um número inteiro entre 0 e 150" },
        { body: { nome: "Maria", email: "maria@exemplo.com", idade: -1 }, mensagem: "idade deve ser um número inteiro entre 0 e 150" },
        { body: { nome: "Maria", email: "maria@exemplo.com", idade: 151 }, mensagem: "idade deve ser um número inteiro entre 0 e 150" }
    ];

    for (const caso of casos) {
        const database = createDatabase();

        await withServer(database, async (baseUrl) => {
            const response = await request(baseUrl, "/usuarios", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(caso.body)
            });

            assert.equal(response.status, 400);
            assert.deepEqual(await response.json(), { erro: caso.mensagem });
            assert.equal(database.insertedValues.length, 0);
        });
    }
});

test("POST /usuarios normaliza dados válidos", async () => {
    const database = createDatabase();

    await withServer(database, async (baseUrl) => {
        const response = await request(baseUrl, "/usuarios", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ nome: "  Maria Silva ", email: " MARIA@EXEMPLO.COM ", idade: 30 })
        });

        assert.equal(response.status, 201);
        assert.deepEqual(database.insertedValues[0], {
            nome: "Maria Silva",
            email: "maria@exemplo.com",
            idade: 30
        });
    });
});

test("POST /usuarios retorna conflito para e-mail repetido", async () => {
    const database = createDatabase({ error: { code: "23505" } });

    await withServer(database, async (baseUrl) => {
        const response = await request(baseUrl, "/usuarios", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ nome: "Maria Silva", email: "maria@exemplo.com" })
        });

        assert.equal(response.status, 409);
        assert.deepEqual(await response.json(), { erro: "email já cadastrado" });
    });
});

test("retorna 400 para JSON inválido", async () => {
    await withServer(createDatabase(), async (baseUrl) => {
        const response = await request(baseUrl, "/usuarios", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: "{\"nome\":"
        });

        assert.equal(response.status, 400);
        assert.deepEqual(await response.json(), { erro: "JSON inválido" });
    });
});

test("retorna 413 para corpo maior que o limite", async () => {
    await withServer(createDatabase(), async (baseUrl) => {
        const response = await request(baseUrl, "/usuarios", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ nome: "M".repeat(11000), email: "maria@exemplo.com" })
        });

        assert.equal(response.status, 413);
        assert.deepEqual(await response.json(), { erro: "corpo da requisição excede o limite de 10 KB" });
    });
});

test("retorna 404 para rota inexistente", async () => {
    await withServer(createDatabase(), async (baseUrl) => {
        const response = await request(baseUrl, "/rota-inexistente");

        assert.equal(response.status, 404);
        assert.deepEqual(await response.json(), { erro: "Rota não encontrada" });
    });
});

test("retorna 500 quando o banco falha", async () => {
    const database = {
        select: () => ({
            from: async () => {
                throw new Error("falha simulada");
            }
        })
    };

    await withServer(database, async (baseUrl) => {
        const response = await request(baseUrl, "/usuarios");

        assert.equal(response.status, 500);
        assert.deepEqual(await response.json(), { erro: "Erro interno do servidor" });
    });
});

test("bloqueia requisições após o limite por IP", async () => {
    await withServer(createDatabase(), async (baseUrl) => {
        for (let tentativa = 1; tentativa <= 100; tentativa += 1) {
            const response = await request(baseUrl, "/health");
            assert.equal(response.status, 200);
        }

        const response = await request(baseUrl, "/health");
        assert.equal(response.status, 429);
    });
});
