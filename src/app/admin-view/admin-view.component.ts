import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { Product } from '../shared/models/product.model';
import { LanguageService } from '../shared/service/language.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  lang!: string;
 products!:Product[];

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

    this.productService.GetAllProducts().subscribe((data) => {
      debugger
      if (data) {
     this.products=data;
      }
    });

  }
  deleteModel(product:any){
    let message = 'Shared.confirmUnActive';
   
    this.confirmationService.confirm({
      message: this.translate.transform(message),
      header: this.translate.transform('Shared.confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteCategory(product.id).subscribe((data) => {
          debugger
          if (data) {
            console.log("delete")
          }
        });
      }
    });
  }
  goTo(id:string){
    return '/EditCategory/' + id;
  }
}
