
const express = require('express')
const { Router } = express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cProducto = require('./clases/productos')
const rProductos = Router()

let id

// Devuelve todos los productos
rProductos.get('/', (_req, _res) => {
    _res.send(cProducto.getAll())
})

rProductos.get('/:id', (_req, _res) => {
    _res.send(cProducto.getById(_req.params.id))
})


// Recibe y agrega un producto, y lo devuelve con su ID asignado
rProductos.post('/', (_req, _res) => {
    const data = _req.body

    if (!data) {
        _res.sendStatus(400)
    }

    // recuperar ID anterior y sumarle 1
    id = cProducto.lastId() + 1

    cProducto.addProduct(id, data.title, data.price, data.thumbnail)
    
    _res.send("Producto agregado con ID = " + id)
})


app.use('/api/productos', rProductos)

app.listen(8080, () => {
    console.log('server on')
})
