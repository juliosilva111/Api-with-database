import app from './app.js';

const normalizePort = (value = process.env.PORT ?? '3003') => {
  const port = Number(value);

  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    return 3003;
  }

  return port;
};

const PORT = normalizePort(process.env.PORT ?? '3003');

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Erro: A porta ${PORT} já está sendo usada por outro aplicativo.`);
    process.exit(1);
  }

  console.error('❌ Erro inesperado ao iniciar o servidor:', error);
  process.exit(1);
});

const shutdown = (signal) => {
  server.close(() => {
    console.log(`🛑 Servidor encerrado com segurança (${signal}).`);
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));