import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../modal-config.model';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styles: [],
})
export class BaseModalComponent implements OnInit {
  @Input() config: ModalConfig = new ModalConfig();

  @Input() title: string;
  @Input() message: string;

  @Output() confirmEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() denyEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancleEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') private modal;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open() {
    this.modalService.open(this.modal);
  }
}
