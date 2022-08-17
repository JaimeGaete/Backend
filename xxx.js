const Producto = require("./clases/productos")

const express = require('express')
const { Router } = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productos = Router()

const prd = []

let id;

// Devuelve todos los productos
productos.get('/', (_req, _res) => {
    _res.send(prd)
})
 
// Recibe y agrega un producto, y lo devuelve con su ID asignado
productos.post('/', (_req, _res) => {
    const data = _req.body

    if (!data) {
        _res.sendStatus(400)
    }

    // recuperar ID anterior y sumarle 1


    prd.push(new Producto(1, data.title, data.price, data.thumbnail))
    
    _res.send("Producto agregado con ID = " + id)
})
 

// Devuelve un producto segun su ID
productos.get('/:id', (_req, _res) => {

    id = _req.params.id

    if (!id) {
        _res.sendStatus(400).send("Debe enviar el ID del producto")
    } 

    _res.send('get con ID ok')
})
 


// Recibe y actualiza un producto segun su ID
productos.put('/:id', (_req, _res) => {

    id = _req.params.id

    if (!id) {
        _res.sendStatus(400).send("Debe enviar el ID del producto")
    } 

    _res.send('put con ID ok')
})

// Elimina un producto segun su ID
productos.delete('/:id', (_req, _res) => {

    id = _req.params.id

    if (!id) {
        _res.sendStatus(400).send("Debe enviar el ID del producto")
    } 


    _res.send('delete con ID ok')
})

app.use('/api/productos', productos)



app.listen(8080, () => {
    console.log('server on')
})
