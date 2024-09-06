import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpModalService {

  private modalSubject = new Subject<any>();

  openModal(type: string) {
    this.modalSubject.next(true);
  }

  getModalStatus() {
    return this.modalSubject.asObservable();
  }
}
