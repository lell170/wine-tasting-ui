import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div #modalDiv id="myModal" [style.display]=modalCssDisplay class="modal" (click)="closeModalDiv()">
      <img #modalImg class="modal-content" alt="#" src="#">
    </div>
  `,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  modalCssDisplay = 'none';

  @ViewChild('modalDiv') modalDiv: ElementRef;
  @ViewChild('modalImg') modalImg: ElementRef;

  constructor() {
  }

  /**
   * this method sets css attribute display for modal window to none
   */
  closeModalDiv(): void {
    this.modalCssDisplay = 'none';
  }

  ngOnInit(): void {
  }

}
