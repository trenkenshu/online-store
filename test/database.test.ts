import DBhandler from '../src/api/database';
import { IProduct } from '../src/interfaces/products';

const db = new DBhandler();

test('DB loadOne test', () => {
    return db.loadOne(new URL('https://dummyjson.com/products/'), 1).then(data => {
        expect(data).toEqual({
            brand: 'Apple',
            category: 'smartphones',
            description: 'An apple mobile which is nothing like apple',
            discountPercentage: 12.96,
            id: 1,
            images: ['https://i.dummyjson.com/data/products/1/1.jpg',
                'https://i.dummyjson.com/data/products/1/2.jpg',
                'https://i.dummyjson.com/data/products/1/3.jpg',
                'https://i.dummyjson.com/data/products/1/4.jpg',
                'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
            price: 549,
            rating: 4.69,
            stock: 94,
            thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
            title: 'iPhone 9'
        });
    });
  });

db.db= [{
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
    },{
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
    }]

test('DB minMax test', () => {
        expect(db.minMax(db.db, 'price')).toEqual({min: 999, max: 1499});
});

test('DB unique categories test', () => {
        expect(db.uniqueFilterFields(db.db, 'category'))
            .toEqual(
                [{
                    category:'Laptops',
                    maxAmount: 1,
                    currentAmount: 1,
                }, {
                    category: 'Phones',
                    maxAmount: 1,
                    currentAmount: 1,
                }]);
});

test('DB unique brands test', () => {
    expect(db.uniqueFilterFields(db.db, 'brand'))
        .toEqual(
            [{
                brand:'Samsung',
                maxAmount: 2,
                currentAmount: 2,
            }]);
});

db.addFilterField('category', 'Laptops');

test('DB hasFilter test', () => {
    expect(db.hasFilter('category', 'laptops'))
        .toBe(true);
});

test('DB runFilter test', () => {
    expect(db.runFilter())
        .toEqual(
            [{
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
                }]);
});

test('DB hasFilter test', () => {
    expect(db.removeFilterField('category', 'phones'))
        .toEqual([]);
});
