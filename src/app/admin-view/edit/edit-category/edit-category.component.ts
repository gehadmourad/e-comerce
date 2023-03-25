import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/service/language.service';
import { ProductsService } from '../../products.service';
import { uploadedFile } from '../../../shared/enum/uploadedFile.enum';
import { Product } from '../../../shared/models/product.model';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
  ProductForm!: FormGroup;

  // strings
  lang!: string;
  imgPath!: string;
  Image = uploadedFile.image;

  // booleans
  isthumbnail: boolean = false;
  id!: string;


  // numbers



  constructor(private router: Router,
    private productService: ProductsService,
    private languageService: LanguageService,
    private activatedRoute: ActivatedRoute,

   ) {
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id") || '{}';

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
  getSelectedProduct(id: number) {
    this.productService
      .getProductById(id)
      .subscribe((data) => {
        if (data) {
          this.setDataToForm(data);
        }
      })
  }
  setDataToForm(product: Product) {
    this.ProductForm.patchValue({
      title: product.title,
      category: product.category,
      price: product.price,
      image: product.image,
      description:product.description
    });
    this.imgPath = product.image;
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
      this.productService.updateProduct(Product,+this.id)
        .subscribe((data) => {
          if (data) {
            console.log(data)
            console.log("update")
            this.navigateToProductAdminList();
          }
        })
    }
  }
  loadData(): void {
    debugger
this.getSelectedProduct(+this.id);
  }

 


  navigateToProductAdminList() {
    this.router.navigateByUrl("/adminview");
  }

  cancel() {
    this.navigateToProductAdminList();
  }
}
