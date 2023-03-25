import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { Product } from '../shared/models/product.model';
import { LanguageService } from '../shared/service/language.service';
import { ProductsService } from '../admin-view/products.service';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  products!:Product[];
categories=[];
lang!: string;
  activeCategory: any;
  num=4;
  constructor( private productService: ProductsService,
    private languageService: LanguageService,
    private confirmationService: ConfirmationService,
    private translate: TranslatePipe,){    
   
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.lang = this.languageService.setDefaultLanguage();

    this.productService.getallCategories().subscribe((data) => {
      
      if (data) {
     this.categories=data;
     this.getProductByCategory(this.categories[0])
      }
    });
}
getProductByCategory(category:any){
this.productService.getallProductCategories(category).subscribe((data) => {
  
  if (data) {
    this.activeCategory=category;

 this.products=data;
 this.products.map(item=> {
  item.ratenum=item.rating.rate
});
  }
});
}








}