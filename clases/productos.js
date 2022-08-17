class Producto {
    constructor (id, title, price, thumbnail) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

const datosProducto = [];

exports.addProduct = function (_id, _title, _price, _thumbnail) {
    datosProducto.push(new Producto(_id, _title, _price, _thumbnail))
    return datosProducto.length
}

exports.getAll = function () {
    return Array.from(datosProducto)
}

exports.getById = function (findId) {
    return datosProducto.find(({id}) => id == findId) || {error: 'producto no encontrado'};
}

exports.lastId = function () {
    let _last = 0
    if (datosProducto.length !== 0) 
    {
        _last = datosProducto[datosProducto.length-1].id
    }
    return _last
}
