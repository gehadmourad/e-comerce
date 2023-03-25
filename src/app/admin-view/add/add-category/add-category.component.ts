import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/service/language.service';
import { ProductsService } from '../../products.service';
import { uploadedFile } from '../../../shared/enum/uploadedFile.enum';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  // controls
  ProductForm!: FormGroup;

  // strings
  lang!: string;
  imgPath!: string;
  Image = uploadedFile.image;

  // booleans
  isthumbnail: boolean = false;


  // numbers



  constructor(private router: Router,
    private productService: ProductsService,
    private languageService: LanguageService,
   ) {
  }
  ngOnInit(): void {
    this.lang = this.languageService.setDefaultLanguage();
    this.initForm();
    this.loadData();
  }
  initForm(): void {
    this.ProductForm = new FormGroup({
      title: new FormControl('', [Validators.required,]),
      price: new FormControl('', [Validators.required,]),
      category: new FormControl('', [Validators.required,]),
      description: new FormControl('', [Validators.required,]),
      image: new FormControl('', [Validators.required])
    });
  }
  uploadFileimage(e: any) {

    this.imgPath = e;
    console.log('e', e);
    this.isthumbnail = false;
    this.ProductForm.controls['image'].setValue(this.imgPath);
    
  }





  getDataFromForm(): Product {
    let Product = Object.assign({}, this.ProductForm.value) as Product;
    Product.image = this.imgPath;
 
    console.log('ProductForm', Product);
    return Product;
  }
  checkFormValidation(): boolean {
    if (!this.ProductForm.invalid) {
      return true;
    }
    else {
      const controls = this.ProductForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          controls[name].markAsTouched();
        }
      }
      return false;
    }
  }


  save(): void {
    if (this.checkFormValidation()) {
      let Product = this.getDataFromForm();
      this.productService.addProduct(Product)
        .subscribe((data) => {
          if (data) {
            console.log("sssss")
            this.navigateToProductAdminList();
          }
        })
    }
  }
  loadData(): void {

  }

 


  navigateToProductAdminList() {
    this.router.navigateByUrl("/adminview");
  }

  cancel() {
    this.navigateToProductAdminList();
  }
}
