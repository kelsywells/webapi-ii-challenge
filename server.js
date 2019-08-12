
module.exports = server;
server.use(express.json());
server.use('/api/posts', PostsRouter);



