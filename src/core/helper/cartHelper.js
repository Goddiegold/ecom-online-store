
const shirtStoreCart = "shirtStoreCart"

export const returnItemInLocalStorage = (key) => localStorage.getItem(key)
export const setLocalStorage = (key, item) => localStorage.setItem(key, JSON.stringify(item))

export const addItemToCart = (item, next) => {
    let cart = []

    if (typeof window !== "undefined") {
        if (returnItemInLocalStorage(shirtStoreCart)) {
            cart = JSON.parse(returnItemInLocalStorage(shirtStoreCart))
        }

        cart.push({ ...item })

        setLocalStorage(shirtStoreCart,cart)
        next()
    }
}

export const loadCart = () => {
    if (typeof window !== "undefined") {
        if (returnItemInLocalStorage(shirtStoreCart)) {
            return JSON.parse(returnItemInLocalStorage(shirtStoreCart))
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []
    if (typeof window !== "undefined") {
        const cartItems = returnItemInLocalStorage(shirtStoreCart)
        if (cartItems) {
            cart = JSON.parse(cartItems)
        }
        cart = cart.filter(item => item.id !== productId)
        setLocalStorage(shirtStoreCart,cart)
    }
    return cart
}


export const cartEmpty = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(shirtStoreCart)
        let carts = []
        setLocalStorage(shirtStoreCart,[])
    }
}