import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainResponse } from '../../shared/models/MainResponse.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  //private url = environment.baseUrl_questionBank + 'File'
  private url = environment.baseUrl + 'File'

  constructor(private http : HttpClient) { }

  upload(fileToUpload: File, path: string, width?:number,height?:number) {

    const formData = new FormData();
    //const image: File = new File([fileToUpload], 'pictureName');
   // formData.append("files", image, 'pictureName');
    formData.append("files", fileToUpload, fileToUpload.name);
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
    return this.http
      .put(this.url + `/UploadFiles/${path}/${width}/${height}`, formData, {
        reportProgress: true,
        observe: "events",
        headers: headers
      });
  }

  delete(filePath: string[]){
    return this.http.put<MainResponse<string[]>>(this.url + `/DeleteFiles`, filePath);
  }

  archive(filePath: string[]){
    return this.http.put<MainResponse<string[]>>(this.url + `/ArchiveFiles`, filePath);
  }

}
