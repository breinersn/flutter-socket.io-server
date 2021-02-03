const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Los pericos'));
bands.addBand(new Band('Los cafres'));
bands.addBand(new Band('Gonwana'));
bands.addBand(new Band('Zona ganja'));

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('bandas-activas', bands.getBands()); //emitir todas las bandas

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje', payload);

    //     io.emit('mensaje', { admin: 'Nuevo mensaje' });

    // });

});