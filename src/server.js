import createApp from "./app.js";

const port = Number(process.env.PORT) || 3003;
const app = createApp();

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});