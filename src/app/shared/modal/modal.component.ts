import { Component, OnDestroy, OnInit, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HelpModalService } from '../../services/help-modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit, OnDestroy {

  modalStatus: boolean = false;
  subscription!: Subscription;

  @Input() helpModalType!: string;

  constructor(private HelpModalService: HelpModalService) { }
  
  ngOnInit(): void {
    this.subscription = this.HelpModalService.getModalStatus().subscribe((status) => {
      this.modalStatus = status;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
