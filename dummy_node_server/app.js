const Hapi = require('hapi');

// asynce is needed for all functions with asynchronous calls
async function init_server() {
    let conn = {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3003,
        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['token']
            }
        }
    };

    // initialize server
    const server = new Hapi.server(conn);

    // get all server routes
    await require('./routes')(server);

    // Start the server
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

init_server();

process.on('unhandledRejection', e => {
    console.log(e);
});
