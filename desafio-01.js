// https://docs.google.com/document/d/1RUkOh3sNySZWtLnj4sI6uy1Ecu7q0WfpySXRvgi5kn4/edit#
// Realizar una clase llamada ProductManager
// El conjunto de productos se debe crear con un constructor

/*
Cada producto que gestione debe contar con las propiedades:

title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)
*/

/* 
Aspectos a incluir

Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
Validar que no se repita el campo “code” y que todos los campos sean obligatorios
Al agregarlo, debe crearse con un id autoincrementable
Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
En caso de no coincidir ningún id, mostrar en consola un error “Not found”
*/

class ProductManager{
    constructor(){
        this.products = []
        this.productId = 1
    }

    // Añadir un producto requiriendo estos campos.
    addProduct(product){
        if(!product.title, !product.desc, !product.price, !product.thumbnail, !product.code, !product.stock){
            console.error("Los campos son obligatorios.")
            return
        }

        // Verificacion de codigo existente.
        if(this.products.some(existingProduct => existingProduct.code === product.code)){
            console.error("Ya existe un producto con el mismo codigo.")
            return
        }

        product.id = this.productId++ // ID Autoincrementable.
        this.products.push(product) // Añadir producto al ARRAY
        console.log(`Producto agregado correctamente: ${product.title}`)
    }

    // Mostrar el ARRAY de productos.
    getProducts(){
        return this.products
    }

    // Buscamos un producto que coincida con el ID
    getProductById(id){
        const Product = this.products.find(existingProduct => existingProduct.id === id) 

        if(!Product){
            console.error("Producto no encontrado")
        }else{
            return Product
        }
    }
}

// Uso.
const ProductManagerInstance = new ProductManager()

// Creamos los productos con los campos requeridos
const Product1 = {
    title: "Producto 1",
    desc: "Prod1 Description",
    price: 1000,
    thumbnail: "./products/product-1.jpg",
    code: 1,
    stock: 50
}

const Product2 = {
    title: "Producto 2",
    desc: "Prod2 Description",
    price: 500,
    thumbnail: "./products/product-2.jpg",
    code: 2,
    stock: 10
}

const Product3 = {
    title: "Producto 3",
    desc: "Prod3 Description",
    price: 2500,
    thumbnail: "./products/product-3.jpg",
    code: 3,
    stock: 5
}

// Instanciamos cada uno de los productos y los añadimos con addProduct()
ProductManagerInstance.addProduct(Product1)
ProductManagerInstance.addProduct(Product2)
ProductManagerInstance.addProduct(Product3)

// Lista de todos los productos añadidos
console.log("Todos los productos: ", ProductManagerInstance.getProducts())

// Buscamos el ID de algun producto
const FindProductId = 4
const FoundProduct = ProductManagerInstance.getProductById(FindProductId)
console.log(`Producto con ID: ${FindProductId}`, FoundProduct)