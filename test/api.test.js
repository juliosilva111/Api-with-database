import test from "node:test";
import assert from "node:assert/strict";
import appFactory from "../src/app.js";

function createDatabase({ error } = {}) {
    const insertedValues = [];

    return {
        insertedValues,
        select: () => ({
            from: async () => []
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
        const response = await fetch(`${baseUrl}/health`);

        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { status: "ok" });
        assert.equal(response.headers.get("x-content-type-options"), "nosniff");
        assert.equal(response.headers.get("x-powered-by"), null);
    });
});

test("GET /api/v1/health retorna status e CORS", async () => {
    await withServer(createDatabase(), async (baseUrl) => {
        const response = await fetch(`${baseUrl}/api/v1/health`);

        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { status: "ok" });
        assert.equal(response.headers.get("access-control-allow-origin"), "*");
    });
});

test("POST /usuarios rejeita dados inválidos antes do banco", async () => {
    const database = createDatabase();

    await withServer(database, async (baseUrl) => {
        const response = await fetch(`${baseUrl}/usuarios`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ nome: "A", email: "invalido", idade: 200 })
        });

        assert.equal(response.status, 400);
        assert.equal(database.insertedValues.length, 0);
    });
});

test("POST /usuarios normaliza dados válidos", async () => {
    const database = createDatabase();

    await withServer(database, async (baseUrl) => {
        const response = await fetch(`${baseUrl}/usuarios`, {
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
        const response = await fetch(`${baseUrl}/usuarios`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ nome: "Maria Silva", email: "maria@exemplo.com" })
        });

        assert.equal(response.status, 409);
        assert.deepEqual(await response.json(), { erro: "email já cadastrado" });
    });
});
