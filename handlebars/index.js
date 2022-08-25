const express = require('express')
const { engine  } = require('express-handlebars')

const app = express()

const ProductosApi = require('./api/productos.js')
const productosApi = new ProductosApi()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Handlebars 
app.engine( "hbs", engine ({ extname: ".hbs", defaultLayout: 'index.hbs' }));
app.set("view engine", "hbs");
app.set("views", "./views");

// Crear
app.post('/api/productos', (req, res) => {
    const producto = req.body
    productosApi.addPrd(producto)
    res.redirect('/')
})

// Listar
app.get('/api/productos', (req, res) => {
    const prods = productosApi.getAll()

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
