const { io } = require('../index');

//mensaje por sockets
io.on('connection', client => {

    console.log('Cliente Conectado');

    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log(payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' }); //emitir mensaje a todos
    });
});