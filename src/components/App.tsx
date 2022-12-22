import React, { useEffect, useState } from 'react';
import Footer from './Footer/Footer';
import Header from './Header';
import Catalog from '../pages/Сatalog';
import DBhandler from './api/database';
import { IProduct } from './interfaces/products';
import '../scss/App.scss'

const db = new DBhandler();
const data :Promise<IProduct[]> = db.load(new URL('https://dummyjson.com/products?limit=100'));

const obj:IProduct={
  id: 5,
  title: 'Name name',
  description: "stringstringstringstringstringstringstringstringstringstringstringstring",
  price: 4444,
  discountPercentage: 555,
  rating: 2.42,
  stock: 100,
  brand: 'brand',
  category: 'category',
  thumbnail: new URL('https://dummyjson.com/'),
  images: [new URL('https://dummyjson.com/')],
}
const App = () => {
  const [catData, setCatData] = useState<IProduct[]>([])
  useEffect( () => {
    data
      .then((readyArray) => {
        setCatData(readyArray)
      })
  },[]);
  console.log('data',catData)
  return (
    <>
       <Header/>
       <Catalog products={catData}/>
       {/* <ProductDescriptionPage {...obj}/> */}
       {/* <DualSlider min={0} max={100}/> */}
       <Footer/>
    </>
  );
}

export default App;
