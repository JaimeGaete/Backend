
const express = require('express')
const bodyParser = require('body-parser');
const { Router } = express
const app = express()

app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cProducto = require('./clases/productos')
const routerProd = Router()

let id
let data
let index

// Devuelve todos los productos
routerProd.get('/', (req, res) => {
    res.send(cProducto.getAll())
})

// Devuelve un producto segun su ID
routerProd.get('/:id', (req, res) => {
    res.send(cProducto.getById(req.params.id))
})

// Recibe y agrega un producto, y lo devuelve con su ID asignado
routerProd.post('/', (req, res) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "Debe enviar el producto a insertar" });
    }

    data = req.body
    // recuperar ID anterior y sumarle 1
    id = cProducto.lastId() + 1
    cProducto.addProd(id, data.title, data.price, data.thumbnail)
    
    res.send(cProducto.getById(id))
})

// Recibe y actualiza un producto segun su ID
routerProd.put('/', (req, res) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "Debe enviar el producto a actualizar" });
    }

    data = req.body
    // valido si el ID existe
    index = cProducto.exitsProd(data.id)
    if (index !== -1)
        cProducto.updProd(index, data.title, data.price, data.thumbnail)

    res.send(cProducto.getById(data.id))
})

// Elimina un producto segun su ID
routerProd.delete('/:id', (req, res) => {
    id = req.params.id
    if (!id) {
        res.sendStatus(400).send({error: 'Debe enviar el ID del producto'})
    } 

    // valido si el ID existe
    index = cProducto.exitsProd(id)
    if (index !== -1) {
        cProducto.delById(index)
        res.send({exito: 'Producto eliminado'})
    }
    else {
        res.send({error: 'Producto no encontrado'})
    }
})

app.use('/api/productos', routerProd)

app.listen(8080, () => {
    console.log('server on')
})
