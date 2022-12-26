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
    private categoryCriteria: string[];
    private brandCriteria: string[];
    private searchCriteria: string;
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
    }

    //////////////////  LOAD  //////////////////////////

    public async load(url: URL): Promise<IProduct[]> {
        let ansData: Promise<IProduct[]>;
        if (this.db.length === 0) {
            try {
                const ans = await fetch(url);
                const json = (await ans.json());
                ansData = json.products ;
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
        console.log('key', key);
        console.log('value', value);
        console.log('categoryCriteria', this.categoryCriteria);
        console.log('brandCriteria', this.brandCriteria);
        if (key === 'category' && !this.categoryCriteria.includes(String(value))) {
            this.categoryCriteria.push(String(value).toLowerCase());
        }
        if (key === 'brand' && !this.brandCriteria.includes(String(value))) {
            this.brandCriteria.push(String(value).toLowerCase());
        }
        if (key === 'search') {
            this.searchCriteria += value;
        }
        if (key === 'price') {
            this.priceRange = value as MinmaxType;
        }
        if (key === 'stock') {
            this.stock = value as MinmaxType;
        }
    }

    /////////  METHOD TO REMOVE SEARCH CRITERIA  ////////

    public removeFilterField(key: string, value: string): void {
        console.log(' removed ', key, value, this.categoryCriteria);
        if (key === 'category') {
            const position = this.categoryCriteria.indexOf(value.toLowerCase());
            console.log(position);
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
