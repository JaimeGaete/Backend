const fsBase = require('fs');
const fs = fsBase.promises
const express = require('express')
const app = express()
const PORT = 8080
const FILE = "files/productos.txt"

class Contenedor { 
    constructor (nameFile) { 
        this.nameFile = nameFile;
    }

    async getAll() {

        try {
            const data = await fs.readFile(this.nameFile, "utf-8");
            return JSON.parse(data);
        }
        catch (e)
        {
            return "Error: " + e;
        }
    }

    async getById(findId) {

        try {
            const data = await fs.readFile(this.nameFile, "utf-8");
            let arrProductos = JSON.parse(data);
            return arrProductos.find(({id}) => id == findId) || null;
        }
        catch (e)
        {
            return "Error: " + e;
        }
    }
}

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

let contenedor = new Contenedor(FILE);

app.get('/productos', (_req, _res) => {

    contenedor.getAll().then(productos => 
        _res.send({ productos })
    );
 })

 app.get('/productoRandom', (_req, _res) => {

    let aleatorio = Math.ceil(Math.random()*3); 

    contenedor.getById(aleatorio).then(producto => 
        _res.send({ producto })
    );
 })

