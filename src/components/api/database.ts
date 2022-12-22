import { it } from "node:test";
import { IProduct } from "../interfaces/products";

export default class DBhandler {
  public db: IProduct[];
  private categoryCriteria: string[];
  private brandCriteria: string[];
  private searchCriteria: string;
  private priceRange: IMinmax;
  private stock: IMinmax;

  constructor() {
    this.db = [];
    this.categoryCriteria = [];
    this.brandCriteria = [];
    this.searchCriteria = '';
    this.priceRange = {
      min: 0,
      max: Infinity,
    }
    this.stock = {
      min: 0,
      max: Infinity,
    }
  }

//////////////////  LOAD  //////////////////////////

  public async load(url: URL): Promise<IProduct[]>{
    let ansData: Promise<IProduct[]>;
    if(this.db.length === 0) {
      try{
      const ans =  await fetch(url);
      const json = await ans.json();
      ansData = json.products;
      this.db = await ansData;
      }catch (error){
        throw new Error('Cound not fetch from ' + url);
      }
    } else {
      ansData = new Promise((resolve) => {
        resolve(this.db);
      });
    }
    return ansData
  }

///////////////// LOAD SINGLE PRODUCT /////////////////

  public async loadOne (url: URL, productId: number): Promise<IProduct> {
    const link = url.toString() + String(productId);
    const ans = fetch(new URL(url))
    return (await ans).json();
  }

////////  UNIQUE FIELDS FOR FILTERS WITH MAX  //////// TODO type

  public uniqueFilterFields(criteria: string): object {
    const ans:{[key: string]: string | number}[] = [];
    let allByCriteria: string[] = [];

    this.db.forEach((item: IProduct) =>
      allByCriteria.push(String(item[criteria]).charAt(0).toUpperCase()
        + String(item[criteria]).slice(1).toLocaleLowerCase()));

    [...new Set(allByCriteria)].forEach((item) => {
      ans.push({
        [criteria]: item,
        maxAmount: this.db.filter(i => String(i[criteria]).toLowerCase() === item.toLocaleLowerCase()).length
      });
    });

    return ans;
  }

///////// METHOD TO HANDLE NUMERIC FILTERS RANGES ////////// TODO type

  public minMax(db: IProduct[], priceOrStock: 'price' | 'stock'): IMinmax {
    const filteredDB: IProduct[] = db.concat([]);
    filteredDB.sort( (a, b) => {
      return a[priceOrStock] - b[priceOrStock]
    });
    return {
      min: filteredDB[0][priceOrStock],
      max: filteredDB[filteredDB.length - 1][priceOrStock]
    }
  }

////////// METHOD TO ADD SEARCH CRITERIA  ////////// TODO type

  public addFilterField<T>(key: string, value: T): void {
    if(key === 'category') {
      this.categoryCriteria.push(value as string);
    }
    if(key === 'brand') {
      this.brandCriteria.push(value as string);
    }
    if(key === 'search') {
      this.searchCriteria += value;
    }
    if(key === 'price') {
      this.priceRange = value as IMinmax;
    }
    if(key === 'stock') {
      this.stock = value as IMinmax;
    }
  }

/////////  METHOD TO REMOVE SEARCH CRITERIA  ////////

  public removeFilterField(key: string, value: string): void {
    if(key === 'category') {
      const position = this.categoryCriteria.indexOf(value);
      this.categoryCriteria.splice(position, 1);
    }
    if(key === 'brand') {
      const position = this.brandCriteria.indexOf(value);
      this.brandCriteria.splice(position, 1);
    }
    console.log(this.categoryCriteria.toString(), this.brandCriteria.toString());
  }

///////////////  APPLY FILTERS  ///////////////////

  public runFilter(): IProduct[] {
    let filtered: IProduct[] = [];
    filtered = filtered.concat(this.db);

    if(this.categoryCriteria.length) {
      filtered = filtered.filter((item: IProduct) => this.categoryCriteria.includes(item.category));
    }

    if(this.brandCriteria.length) {
      filtered = filtered.filter((item: IProduct) =>
        this.brandCriteria.includes(item.brand.charAt(0).toUpperCase()
          + String(item.brand).slice(1).toLocaleLowerCase()));
    }

    if(this.searchCriteria.length) {
      filtered = filtered.filter((item: IProduct) => {
        for(let key in item) {
          if(item[key].toString().toLowerCase().includes(this.searchCriteria.toLowerCase())
            && !(item[key] instanceof Array)
            && key !== 'thumbnail') {

              return true;
          }
        }

        return false;
      });
    }

    filtered = filtered.filter((item: IProduct) => this.priceRange.min <= item.price);
    filtered = filtered.filter((item: IProduct) => this.priceRange.max >= item.price);

    filtered = filtered.filter((item: IProduct) => this.stock.min <= item.stock);
    filtered = filtered.filter((item: IProduct) => this.stock.max >= item.stock);

    return filtered;
  }
}

type IMinmax = {
  min: number;
  max: number;
}