import {promises as fs} from "fs"

export class CartManager {
    constructor(path){
        this.products = path // Los productos apuntan a la ruta (cart.json)
    }

    getCart = async() => {
        const cart = JSON.parse(await fs.readFile(this.products, "utf-8")) // Siempre leer lo que hay en cart
        return cart
    }

    addProductToCart = async(idProducto, quantity) => {
        const cart = JSON.parse(await fs.readFile(this.products, "utf-8"))

        const indice = cart.findIndex(product => product.id === idProducto) // Que traiga un producto cuyo ID sea igual al ID que llega como parametro
        if(indice != -1){ // Si da DISTINTO de -1. Existe
            cart[indice].quantity += quantity // En la posicion del indice de cart, le modifico la cantidad en caso de que el ID sea encontrado.
        }else{
            const prod = {id: idProducto, quantity: quantity} // En caso de no existir, lo creo con su ID y su CANTIDAD
            cart.push(prod)
        }
        await fs.writeFile(this.products, JSON.stringify(cart))  // Sea cual sea el caso, se vuelve a reescribir el archivo
        return "Producto cargado correctamente"
    }
}