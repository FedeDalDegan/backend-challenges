import cartModel from "../models/cart.js"
import { Router } from "express"

const cartRouter = Router()

// Creamos un nuevo carrito
cartRouter.post("/", async (req, res) =>{
    try{
        const mensaje = await cartModel.create({products: []})
        res.status(201).send(mensaje)
    }catch(e){
        res.status(500).send(`Error al crear carrito ${e}`)
    }
})

// Obtenemos carrito mediante ID
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({_id: cartId}).populate("products.id_prod") // Con findOne especificamos el atributo por el que estamos buscando. (En este caso _id. Atributo de MONGODB)
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
})

// Añadimos productos al carrito
cartRouter.post("/:cid/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        let {quantity} = req.body

        if(quantity === undefined){
            quantity = 1
        }

        const updatedCart = await cartModel.findOneAndUpdate(
            {_id: cartId, "products.id_prod" : productId},
            {$inc: {"products.$.quantity": quantity}},
            {new: true}
        )
        
        if(!updatedCart){
            const cart = await cartModel.findByIdAndUpdate(
                cartId,
                {$push: {products: {id_prod: productId, quantity: quantity}}},
                {new: true}
            )
            res.status(200).send(cart)
        }else{
            res.status(200).send(updatedCart)
        }
    }catch(e){
        res.status(500).send("Error al obtener productos: " + e)
    }
})

// Actualizamos productos de un carrito
cartRouter.put("/cid:", async (req, res) => {
    try{
        const cartId = req.params.cid
        const newProducts = req.body
        const updatedCart = await cartModel.findOneAndUpdate(
            {_id: cartId},
            {$set: {products: newProducts}},
            {new: true}
        )
        if(!updatedCart){
            return res.status(404).send("Carrito no encontrado")
        }else{
            res.status(200).send(updatedCart)
        }
    }catch(e){
        res.status(500).send("Error al actualizar los productos del carrito: " + e)
    }
})

// Eliminamos un producto del carrito
cartRouter.delete("/:cid/products:/pid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid

        const updatedCart = await cartModel.findOneAndUpdate(
            {id: cartId},
            {$pull: {products: {id_prod: productId}}},
            {new: true}
        )
        
        if(updatedCart){
            res.status(200).send(updatedCart)
        }else{
            res.status(404).send("Carrito no encontrado")
        }
    }catch(e){
        res.status(500).send("Error al eliminar producto del carrito: " + e)
    }
})

// Vaciar carrito
cartRouter.delete("/:cid", async (req, res) => {
    try{
        const cartId = req.params.cid

        const updatedCart = await cartModel.findOneAndUpdate(
            cartId,
            {products: []},
            {new: true}
        )

        if(!updatedCart){
            return res.status(404).send("Carrito no encontrado")
        }else{
            res.status(200).send("Removido con exito")
        }
    }catch(e){
        res.status(500).send("Ha ocurrido un error: " + e)
    }
})

export default cartRouter