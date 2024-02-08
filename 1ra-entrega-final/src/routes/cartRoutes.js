import { Router } from "express"
import { CartManager } from "../config/CartManager.js"

const cartManager = new CartManager("./cart.json")
const cartRouter = Router()

/*
Si bien fue pedido en la entrega, el profesor dijo que no iba a ser tomado en cuenta.

cartRouter.post("/", async (req, res) =>{
    try{
        const id = crypto.randomBytes(10).toString("hex")
        const cartManager = new CartManager("./cart.json", id) // Enviamos la ruta de donde se generara nuestro nuevo cart
        return res.status(200).send(`Producto creado con ID ${id}`)
    }catch(e){
        res.status(500).send(`Error al crear carrito ${e}`)
    }
})
*/

cartRouter.get('/', async (req, res) => {
    try {
        const cart = await cartManager.getCart()
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
})

cartRouter.post('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid
        const { quantity } = req.body // Consulto la cantidad
        const mensaje = await cartManager.addProductToCart(productId, quantity) // Una vez que obtenemos el ID y la CANTIDAD, envio dichos datos
        res.status(400).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

export default cartRouter