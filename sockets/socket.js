const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Los pericos'));
bands.addBand(new Band('Los cafres'));
bands.addBand(new Band('Gonwana'));
bands.addBand(new Band('Zona ganja'));
bands.addBand(new Band('cultura profetica'));

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('bandas-activas', bands.getBands()); //emitir todas las bandas al cliente que se conecte

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('band-votes', (payload) => {   
        bands.voteBand(payload.id); //hacer la votacion
        io.emit('bandas-activas', bands.getBands()); //emitir las bandas a todos los clientes
    });

    client.on('band-name', ( payload) => {
        const newBand = new Band( payload.name );
        bands.addBand(newBand);
        io.emit('bandas-activas', bands.getBands()); //emitir las bandas a todos los clientes
    });

    client.on('band-delete', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('bandas-activas', bands.getBands()); //emitir las bandas a todos los clientes
    });

});