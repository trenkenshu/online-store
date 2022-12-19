import { IProduct, IProducts } from "../interfaces/products";

export default class DBhandler {
  db: IProduct[];
  ready: boolean;
  constructor() {
  }
  public async load(url: URL): Promise<any>{
    let ansData: Promise<IProduct[]>;
    try{
      const ans =  await fetch(url);
      const json = await ans.json();
      ansData = json.products;
    }catch (error){
      throw new Error('Cound not fetch from ' + url);
     }

      return ansData;
  }
  private errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
          console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
  }
    return res;
  }

}