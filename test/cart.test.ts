import CartClass from "../src/api/cart";

const cart = new CartClass();

    const addProducts = [ {
            product: {
            id: 7,
            title :"Samsung Galaxy Book",
            description:"Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
            price:1499,
            discountPercentage:4.15,
            rating:4.25,
            stock:50,
            brand:"Samsung",
            category:"laptops",
            thumbnail: new URL("https://i.dummyjson.com/data/products/7/thumbnail.jpg"),
            images:[new URL("https://i.dummyjson.com/data/products/7/1.jpg"),
                new URL("https://i.dummyjson.com/data/products/7/2.jpg"),
                new URL("https://i.dummyjson.com/data/products/7/3.jpg"),
                new URL("https://i.dummyjson.com/data/products/7/thumbnail.jpg")]
            },
            amount: 2
        },{
            product: {
                id: 17,
            title :"Samsung Galaxy S10",
            description:"Samsung Galaxy S10 (2018)",
            price:999,
            discountPercentage:2.5,
            rating:4.85,
            stock:70,
            brand:"Samsung",
            category:"phones",
            thumbnail: new URL("https://i.dummyjson.com/data/products/17/thumbnail.jpg"),
            images:[new URL("https://i.dummyjson.com/data/products/7/1.jpg"),
            new URL("https://i.dummyjson.com/data/products/7/2.jpg"),
                new URL("https://i.dummyjson.com/data/products/7/3.jpg")]
    },
    amount: 5
}]

test('Cart add test', () => {
expect(cart.add(addProducts[0])).toEqual([addProducts[0]]);
});

test('Cart add test 2', () => {
    expect(cart.add(addProducts[1])).toEqual([addProducts[0], addProducts[1]]);
    });

test('Cart calculateTotalSum test', () => {
    expect(cart.calculateTotalSum()).toEqual(7993);
});

test('Cart getTotalProducts test', () => {
    expect(cart.getTotalProducts()).toEqual(7);
});