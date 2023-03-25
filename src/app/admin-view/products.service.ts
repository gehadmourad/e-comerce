import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MainResponse } from "../shared/models/MainResponse.model";
import { environment } from "../../../src/environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import {Product} from '../shared/models/product.model'

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url=environment.baseUrl+ 'products'
     }


    getUrl(): string {
        return this.url;
    }
GetAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.getUrl()}`)
        .pipe();

}
addProduct(product:Product): Observable<Product> {
    return this.http.post<Product>(`${this.getUrl()}`,product)
        .pipe();
}
 getProductById(productId:number): Observable<Product> {
    return this.http.get<Product>(`${this.getUrl()}/${productId}`)
        .pipe();

}
updateProduct(product:Product,productId:number): Observable<Product> {
    return this.http.put<Product>(`${this.getUrl()}/${productId}`,product)
        .pipe();
}
deleteCategory(productId:number): Observable<Product> {
    return this.http.delete<Product>(`${this.getUrl()}/${productId}`)
        .pipe();
}
getallCategories(){
    return this.http.get<[]>(`${this.getUrl()}/categories`)
    .pipe();
}
getallProductCategories(category:string){
    return this.http.get<[]>(`${this.getUrl()}/category/${category}`)
    .pipe();
}
}