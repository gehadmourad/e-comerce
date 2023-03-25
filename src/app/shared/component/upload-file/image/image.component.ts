import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { uploadedFile } from './../../../enum/uploadedFile.enum';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  staticUrl = environment.staticUrl;

  @Input() isUploadForm: boolean = true;
  @Input()
  isProgress!: boolean;
  @Input() allowDelete: boolean = true;
  @Input()
  progress!: number;
  @Input()
  acceptFileValue!: string;
  @Input()
  filePath!: string;

  @Output() uploadFileEvent :EventEmitter<File>;
  @Output() deleteFileEvent: EventEmitter<string>;
  constructor() {
    this.uploadFileEvent = new EventEmitter<File>();
    this.deleteFileEvent = new EventEmitter<string>();
      }

  ngOnInit(): void {}

  uploadFile(e: Event) {
     
  //let file = ((e.target as HTMLInputElement).files[0])!;
    let file: any = (e.target as any).files[0]; 
    this.uploadFileEvent.emit(file);
  }

  DeleteFile(e: Event){
    let file: any = (e.target as any).filePath; 

    this.deleteFileEvent.emit(file);
    //this.deleteFileEvent.complete();
  }
 
}
