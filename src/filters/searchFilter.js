const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
    var index = elasticlunr(function () {
        this.addField("nombre");
        this.addField("nombreDeInstitucion");
        this.addField("institution");
    });

    // loop through each page and add it to the index
    collection.forEach(item => {

        if (item.data.ministerio) {
            index.addDoc({
                id: item.url,
                nombreDeInstitucion: item.data.ministerio.nombreDeInstitucion,
            });
        } else {
            console.log(item.data.autoridad.institution);
            index.addDoc({
                id: item.url,
                nombre: item.data.autoridad.nombre,
                institution: item.data.autoridad.institution,
            });
        }
    });

    return index.toJSON();
};