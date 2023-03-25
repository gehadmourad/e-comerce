import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { MainResponse } from '../../../shared/models/MainResponse.model';
import { environment } from '../../../../environments/environment';
import { uploadedFile } from '../../enum/uploadedFile.enum';
import { FileService } from '../../service/file-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['upload-file.componet.css']
})
export class UploadFileComponent implements OnInit {

  loading!: boolean;
  filePath!: string;
  isUploadForm: boolean = true;

  staticUrl = environment.staticUrl;
  count: number = 0;
  @Input() fileType: uploadedFile = uploadedFile.image;
  @Input()
  pathLocation!: string;
  @Input() fileTypePreview: uploadedFile = uploadedFile.text;

  @Input()
  imageWidth!: number;
  @Input()
  imageHeight!: number;

  @Output() doFile: EventEmitter<string> = new EventEmitter<string>();
  @Output() doDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() doDelete1: EventEmitter<string> = new EventEmitter<string>();
  @Output() doDelete2: EventEmitter<string> = new EventEmitter<string>();

  progress!: number;
  isProgress!: boolean;

  filePathDisplay!: string;
  imageIsNotValid!: boolean;
  soundIsNotValid!: boolean;
  videoIsNotValid!: boolean;
  acceptFileValue!: string;
  accetany = [];
  @ViewChild('fileElement', { static: false })
  fileElement!: ElementRef;

  private readonly fileDisplayPath: number = 20;
  allowDelete: boolean = true;
  svgIsNotValid!: boolean;
  zipIsNotValid!: boolean;
  pdfIsNotValid!: boolean;

  subsVar!: Subscription;

  constructor(
    private FileService: FileService,
    private translate: TranslatePipe,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.acceptFile(this.fileType);

  }


  @Input() set FilePath(path: string) {
    // alert(path);
    //  ;

    if (path !== null && path !== undefined && path !== '') {
      this.isUploadForm = false;
      this.filePath = path;
      let split = this.filePath.split('/');
      this.filePathDisplay = split[split.length - 1];
      this.filePathDisplay = this.filePathDisplay?.substring(this.filePathDisplay.length - this.fileDisplayPath);
    } else {
      this.clear();
    }

  }

  clear(): void {
    this.isUploadForm = true;
    this.filePath = '';
    this.filePathDisplay = '';
  }

  @Input() set AllowDelete(allowDelete: boolean) {
    this.allowDelete = allowDelete;
  }

  uploadFile(file: File) {

    this.clearValidation();

    // if (!file.type.includes(uploadedFile[this.fileType])) {
    // this.validationType(this.fileType);
    // this.fileElement.nativeElement.value = '';
    // return;
    //}
    // else if(file.type.includes(uploadedFile[this.fileType]){

    // }

    this.progress = 0;
    this.isProgress = true;

    this.FileService.upload(file, this.pathLocation, this.imageWidth, this.imageHeight)
      .subscribe((event: HttpEvent<any>) => {
        // let event.total
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / 1 * 100);
            break;
          case HttpEventType.Response:
            this.processFinalRequest(event.body);
            break;
        }
      });
  }


  processFinalRequest(data: MainResponse<string[]>) {
    this.progress = 0;

    this.isUploadForm = false;
    this.isProgress = false;

    this.filePath = data.data[0];
    if (this.filePath.includes('undefined')) {
      //this.toastrService.error(this.translate.transform('Plugins.tryUploadImage'));
      this.filePath = null as any;
      return;
    }
    let split = this.filePath.split('/');
    this.filePathDisplay = split[split.length - 1];
    this.filePathDisplay = this.filePathDisplay?.substring(this.filePathDisplay.length - this.fileDisplayPath);
    this.doFile.emit(this.filePath);
  }


  DeleteFile(filePath: string) {
    let message = 'Shared.confirmUnActive';
    this.confirmationService.confirm({
      message: this.translate.transform(message),
      header: this.translate.transform('Shared.confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;


        this.FileService.delete([filePath])
          .subscribe((data: MainResponse<string[]>) => {
            this.loading = false;
            this.isUploadForm = true;
            this.doDelete.emit(filePath);
          }, err => {
            this.loading = false;
          });
      }
    });


  }

  DeleteFile1(filePath: string) {
     
    let message = 'Shared.confirmUnActive';
    this.confirmationService.confirm({
      message: this.translate.transform(message),
      header: this.translate.transform('Shared.confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.loading = true;

        this.FileService.delete([filePath])
          .subscribe((data: MainResponse<string[]>) => {
            this.loading = false;
            this.isUploadForm = true;
            this.doDelete1.emit(filePath);
          }, err => {
            this.loading = false;
          });
      }
    });


  }

  DeleteFile2(filePath: string) {
    ;
    let message = 'Shared.confirmUnActive';
    this.confirmationService.confirm({
      message: this.translate.transform(message),
      header: this.translate.transform('Shared.confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;

        this.FileService.delete([filePath])
          .subscribe((data: MainResponse<string[]>) => {
            this.loading = false;
            this.isUploadForm = true;
            this.doDelete2.emit(filePath);
          }, err => {
            this.loading = false;
          });
      }
    });

  }

  validationType(fileType: uploadedFile) {

    switch (fileType) {
      case uploadedFile.image:
        this.imageIsNotValid = true;
        break;
      case uploadedFile.audio:
        this.soundIsNotValid = true;
        break;
      case uploadedFile.video:
        this.videoIsNotValid = true;
        break;
      // case uploadedFile.svg:
      //   this.svgIsNotValid = true;
      // case uploadedFile.zip:
      //     this.zipIsNotValid = true;
      case uploadedFile.pdf:
        this.pdfIsNotValid = true;

    }
  }


  clearValidation() {
    this.imageIsNotValid = false;
    this.soundIsNotValid = false;
    this.videoIsNotValid = false;
    this.svgIsNotValid = false;
    this.zipIsNotValid = false;
    this.pdfIsNotValid = false;
  }

  acceptFile(fileType: uploadedFile) {
    switch (fileType) {
      case uploadedFile.image:
        this.acceptFileValue = 'image/*';
        break;
      case uploadedFile.audio:
        this.acceptFileValue = 'audio/*';
        break;
      case uploadedFile.video:
        this.acceptFileValue = 'video/*';
        break;
      // case uploadedFile.svg:
      //   this.acceptFileValue = 'image/svg+xml';
      //   case uploadedFile.zip:
      //     this.acceptFileValue = 'zip';
      case uploadedFile.pdf:
        this.acceptFileValue = 'pdf';
    }
  }

  isText(): boolean {

    return this.fileTypePreview == uploadedFile.text;
  }

  isImage(): boolean {

    return this.fileTypePreview == uploadedFile.image;
  }

  isAudio(): boolean {
    return this.fileTypePreview == uploadedFile.audio;
  }

  isVideo(): boolean {
    return this.fileTypePreview == uploadedFile.video;
  }
  isZip(): boolean {
    return this.fileTypePreview == uploadedFile.zip;
  }
  isPdf(): boolean {
    return this.fileTypePreview == uploadedFile.pdf;
  }

  ngOnDestroy() {
    if (this.subsVar) {
      this.subsVar.unsubscribe()
    }
  }
}
