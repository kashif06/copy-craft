import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * This service provides a way for components to communicate with each other
 * by sharing data through an observable stream. It's particularly useful for
 * scenarios where components don't have a direct parent-child relationship or
 * when data needs to be shared across multiple components in your Ionic application.
 */

@Injectable({
  providedIn: 'root'
})
export class ModalDataService {

  /**
   * A Subject is a special type of Observable that allows both publishing 
   * new values to subscribers and subscribing to those values. We use it 
   * here to act as a central point for sending and receiving data.
   */
  private modalResponse = new Subject<any>();

  constructor() { }

  /**
   * This method takes any type of data (`response`) and publishes it 
   * through the `modalResponse` Subject. Any components subscribed to the 
   * observable will receive this data.
   * 
   * @param response: The data to be sent to subscribing components.
   */
  sendModalResponse(response:any) {
    this.modalResponse.next(response);
  }

  /**
   * This method returns an Observable representation of the `modalResponse` 
   * Subject. Components can subscribe to this observable to receive any 
   * data published through `sendModalResponse`.
   * 
   * @returns Observable<any>: An observable that emits any data sent through
   * `sendModalResponse`.
   */
  getModalResponse(): Observable<any> {
    return this.modalResponse.asObservable();
  }
}
