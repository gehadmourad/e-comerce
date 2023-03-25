import { Rateing } from "./rate.model";

export class Product  {
  id!: number;
  title!: string;
  price!:string;
  category!:string;
  description!:string;
  image!:string;
  rating!:Rateing;
  ratenum!:number
  
}
