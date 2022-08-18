class Producto {
    constructor (id, title, price, thumbnail) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

const datosProducto = [];

exports.addProd = function (_id, _title, _price, _thumbnail) {
    return datosProducto.push(new Producto(_id, _title, _price, _thumbnail))
}

exports.getAll = function () {
    return Array.from(datosProducto)
}

exports.getById = function (_findId) {
    return datosProducto.find(({id}) => id == _findId) || {error: 'Producto no encontrado'}
}

exports.lastId = function () {
    let _last = 0
    if (datosProducto.length !== 0) 
    {
        _last = datosProducto[datosProducto.length-1].id
    }
    return _last
}

exports.updProd = function (_index, _title, _price, _thumbnail) {
    datosProducto[_index].title = _title
    datosProducto[_index].price = _price
    datosProducto[_index].thumbnail = _thumbnail
}

exports.delById = function (_index) {
    return datosProducto.splice(_index, 1)
}

exports.exitsProd = function (_findId) {
    return datosProducto.findIndex((obj) => { return obj.id == _findId})
}
