const JsonNodeNormalizer = require('json-node-normalizer');
const camelcaseKeys = require('camelcase-keys');
const fs = require('fs');

let ministerios = require('./src/_data/json/institucion.json');
let ministros = require('./src/_data/json/perfiles.json');

const jsonSchema = {
    idInstitucion: {
        type: 'number'
    },
    nombreDeInstitucion: {
        type: 'string'
    },
    siglas: {
        type: 'string'
    },
    sector: {
        type: 'string'
    },
    descripcion: {
        type: 'string'
    },
    horario: {
        type: 'string'
    },
    diasAtencion: {
        type: 'string'
    },
    mision: {
        type: 'string'
    },
    vision: {
        type: 'string'
    },
    enlaceAccesoInformacion: {
        type: 'string'
    },
    direccion: {
        type: 'string'
    },
    web: {
        type: 'string'
    },
    telefono: {
        type: 'number'
    },
    fb: {
        type: 'string'
    },
    tw: {
        type: 'string'
    },
    fotoUrl: {
        type: 'string'
    },
    ministros: {
        type: 'array'
    }
}

promises = ministerios.map(function (ministerio) {
    // Ministros
    ministerio.ministros = ministros.filter((ministro) => {
        return ministro.institution.trim() === ministerio.nombreDeInstitucion.trim();
    });

    ministerio = camelcaseKeys(ministerio, { deep: true });

    try {
        return JsonNodeNormalizer.normalize(ministerio, jsonSchema);
    } catch (error) {
        console.error(error);
    }
});

// Wait for all Promises to complete
Promise.all(promises)
    .then(results => {
        fs.writeFile('./src/_data/ministeriosData.json', JSON.stringify(results), function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log('Success data build');
            }
        });

        fs.writeFile('./src/_data/ministerioData.json', JSON.stringify(results[0]), function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log('Success data build');
            }
        });
    })
    .catch(e => {
        console.error(e);
    });