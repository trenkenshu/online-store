import { FilterItemType } from '../components/FilterItem/FilterItem';
import { IProduct } from '../interfaces/products';

export type MinmaxType = {
    min: number;
    max: number;
};

export type UniqueFiltersType = {
    category?: string;
    brand?: string;
    maxAmount: number;
    currentAmount: number;
}[];

export default class DBhandler {
    public db: IProduct[];
    public categoryCriteria: string[];
    public brandCriteria: string[];
    public searchCriteria: string;
    public sort: string;
    private priceRange: MinmaxType;
    private stock: MinmaxType;

    constructor() {
        this.db = [];
        this.categoryCriteria = [];
        this.brandCriteria = [];
        this.searchCriteria = '';
        this.priceRange = {
            min: 0,
            max: Infinity,
        };
        this.stock = {
            min: 0,
            max: Infinity,
        };
        this.sort = '1';
    }

    //////////////////  LOAD  //////////////////////////

    public async load(url: URL): Promise<IProduct[]> {
        let ansData: Promise<IProduct[]>;
        if (this.db.length === 0) {
            try {
                const ans = await fetch(url);
                const json = (await ans.json());
                ansData = json.products;
                this.db = await ansData;
                this.db.forEach((item) => {
                    item.brand = item.brand.charAt(0).toUpperCase() + item.brand.slice(1).toLowerCase();
                });
            } catch (error) {
                throw new Error('Cound not fetch from ' + url.toString());
            }
        } else {
            ansData = new Promise((resolve) => {
                resolve(this.db);
            });
        }
        return ansData;
    }

    ///////////////// LOAD SINGLE PRODUCT /////////////////

    public async loadOne(url: URL, productId: number): Promise<IProduct> {
        const link = url.toString() + String(productId);
        const ans = fetch(new URL(link));
        return (await ans).json() as Promise<IProduct>;
    }

    ////////  UNIQUE FIELDS FOR FILTERS WITH MAX  //////// TODO type

    public uniqueFilterFields(dataBase: IProduct[], criteria: string): UniqueFiltersType {
        const ans: UniqueFiltersType = [];
        const allByCriteria: string[] = [];
        //const dbUnsorted = this.db.slice(0);
        //dbUnsorted.sort((a, b) => a.id - b.id);

        this.db.forEach((item: IProduct) =>
            allByCriteria.push(
                String(item[criteria]).charAt(0).toUpperCase() + String(item[criteria]).slice(1).toLowerCase()
            )
        );

        [...new Set(allByCriteria)].forEach((item) => {
            ans.push({
                [criteria]: item,
                maxAmount: this.db.filter((i) => String(i[criteria]).toLowerCase() === item.toLowerCase()).length,
                currentAmount: dataBase.filter((i) => String(i[criteria]).toLowerCase() === item.toLowerCase()).length,
            });
        });

        return ans;
    }

    ///////// METHOD TO HANDLE NUMERIC FILTERS RANGES ////////// TODO type

    public minMax(db: IProduct[], priceOrStock: 'price' | 'stock'): MinmaxType {
        const filteredDB: IProduct[] = db.concat([]);
        filteredDB.sort((a, b) => {
            return a[priceOrStock] - b[priceOrStock];
        });

        return filteredDB.length
            ? {
                  min: filteredDB[0][priceOrStock],
                  max: filteredDB[filteredDB.length - 1][priceOrStock],
              }
            : {
                  min: 0,
                  max: 0,
              };
    }
    ////////// METHOD TO ADD SEARCH CRITERIA  ////////// TODO type

    public addFilterField<T>(key: string, value: T): void {
        // console.log('key', key);
        // console.log('value', value);
        // console.log('categoryCriteria', this.categoryCriteria);
        // console.log('brandCriteria', this.brandCriteria);
        if (key === 'category' && !this.categoryCriteria.includes(String(value))) {
            this.categoryCriteria.push(String(value).toLowerCase());
        }
        if (key === 'brand' && !this.brandCriteria.includes(String(value))) {
            this.brandCriteria.push(String(value).toLowerCase());
        }
        if (key === 'search') {
            this.searchCriteria = value as string;
        }
        if (key === 'price') {
            this.priceRange = value as MinmaxType;
        }
        if (key === 'stock') {
            this.stock = value as MinmaxType;
        }
        if (key === 'sort') {
            this.sort = value as string;
        }
    }

    /////////  METHOD TO REMOVE SEARCH CRITERIA  ////////

    public removeFilterField(key: string, value: string): void {
        // console.log(' removed ', key, value, this.categoryCriteria);
        if (key === 'category') {
            const position = this.categoryCriteria.indexOf(value.toLowerCase());
            // console.log(position);
            this.categoryCriteria.splice(position, 1);
        }
        if (key === 'brand') {
            const position = this.brandCriteria.indexOf(value.toLowerCase());
            this.brandCriteria.splice(position, 1);
        }
    }

    ///////////////  APPLY FILTERS  ///////////////////

    public runFilter(): IProduct[] {
        // console.log('runFilter');
        // console.log('thisDb', this.db);
        let filtered: IProduct[] = [];
        filtered = filtered.concat(this.db);
        if (this.categoryCriteria.length) {
            filtered = filtered.filter((item: IProduct) => this.categoryCriteria.includes(item.category));
        }

        if (this.brandCriteria.length) {
            filtered = filtered.filter((item: IProduct) =>
                this.brandCriteria.includes(String(item.brand).toLowerCase())
            );
        }

        if (this.searchCriteria.length) {
            filtered = filtered.filter((item: IProduct) => {
                for (const key in item) {
                    if (
                        item[key].toString().toLowerCase().includes(this.searchCriteria.toLowerCase()) &&
                        !(item[key] instanceof Array) &&
                        key !== 'thumbnail'
                    ) {
                        return true;
                    }
                }
                console.log(this.searchCriteria, filtered);
                return false;
            });
        }

        filtered = filtered.filter((item: IProduct) => this.priceRange.min <= item.price);
        filtered = filtered.filter((item: IProduct) => this.priceRange.max >= item.price);

        filtered = filtered.filter((item: IProduct) => this.stock.min <= item.stock);
        filtered = filtered.filter((item: IProduct) => this.stock.max >= item.stock);

        switch (this.sort) {
            case '2':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case '3':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case '4':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case '5':
                filtered.sort((a, b) => a.rating - b.rating);
                break;
            case '6':
                filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
                break;
            case '7':
                filtered.sort((a, b) => a.discountPercentage - b.discountPercentage);
                break;
            default:
                filtered.sort((a, b) => a.id - b.id);
                break;
        }

        return filtered;
    }

    public hasFilter(whatCriteria: 'category' | 'brand' | 'search', whatValue?: string): boolean {
        let ans = false;
        if (whatCriteria === 'category' && whatValue) {
            ans = this.categoryCriteria.includes(whatValue);
        }
        if (whatCriteria === 'brand' && whatValue) {
            ans = this.brandCriteria.includes(whatValue);
        }
        return ans;
    }

    public resetFilter(): void {
        this.categoryCriteria = [];
        this.brandCriteria = [];
        this.searchCriteria = '';
        this.priceRange = this.minMax(this.db, 'price');
        this.stock = this.minMax(this.db, 'stock');
        //console.log(this.categoryCriteria, this.brandCriteria, this.searchCriteria, this.priceRange, this.stock);
    }
}
