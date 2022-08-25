const express = require('express')

const Productos = require('./api/productos.js')
const _productos = new Productos()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('views', './views');
app.set('view engine', 'ejs');

app.post('/productos', (req, res) => {
    const producto = req.body
    _productos.addPrd(producto)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    const prods = _productos.getAll()

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
