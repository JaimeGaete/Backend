const express = require('express')
const { engine  } = require('express-handlebars')

const app = express()

const Productos = require('./api/productos.js')
const _productos = new Productos()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Handlebars 
app.engine( "hbs", engine ({ extname: ".hbs", defaultLayout: 'index.hbs' }));
app.set("view engine", "hbs");
app.set("views", "./views");

// Crear
app.post('/productos', (req, res) => {
    const data = req.body
    _productos.addPrd(data)
    res.redirect('/')
})

// Listar
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
