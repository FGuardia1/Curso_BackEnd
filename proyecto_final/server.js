import express from "express";
import routerProduct from "./routes/products.router";
import {} from routerProduct
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.use('/api/productos',routerProduct)

app.use('/api/cart',()=>{

})

app.use('*',()=>{
    res.send( { error :  -1, descripcion: "ruta 'x' método 'y' no autorizada" })
})

const server = app.listen(PORT, () => console.log(`Servidor corriendo en puerto: ${PORT}`));
server.on('error', err => console.log(err));