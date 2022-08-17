const express = require('express')
const { Router } = express

const app = express()
const productos = Router()

productos.get('/', (_req, _res) => {
    _res.send('get ok')
})
 
productos.get('/:id', (_req, _res) => {
    _res.send('get con ID ok')
})
 
productos.post('/', (_req, _res) => {
    _res.send('post ok')
})
 
productos.put('/:id', (_req, _res) => {
    _res.send('put con ID ok')
})

productos.delete('/:id', (_req, _res) => {
    _res.send('delete con ID ok')
})

app.use('/api/productos', productos)

app.listen(8080, () => {
    console.log('server on')
})
