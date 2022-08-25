const express = require('express')

const Productos = require('./api/productos.js')
const _productos = new Productos()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------

app.set('views', './views');
app.set('view engine', 'pug');

app.post('/productos', (req, res) => {
    const producto = req.body
    _productos.guardar(producto)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    const prods = _productos.listarAll()

    res.render("vista", {
        productos: prods,
        hayProductos: prods.length
    });
});

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`server on ${server.address().port}`)
})

server.on("error", error => console.log(`server error:  ${error}`))