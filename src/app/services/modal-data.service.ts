import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalDataService {

  private modalResponse = new Subject<any>();

  constructor() { }

  sendModalResponse(response:any) {
    this.modalResponse.next(response);
  }

  getModalResponse(): Observable<any> {
    return this.modalResponse.asObservable();
  }
}
