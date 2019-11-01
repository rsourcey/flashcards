import { FlashService } from './flash/flash.service';
import { IFlash } from './flash.model';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('flashForm', { static: true }) flashForm: NgForm;
  title = 'flashcards';

  flashs;

  editing = false;
  editingId: number;
  flash: IFlash;

  constructor(
    private flashService: FlashService
  ) {
    this.flashs = this.flashService.flashs;
  }


  trackByFlashId(index, flash) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    this.flashService.toggleFlash(id);
  }

  handleDelete(id: number) {
  this.flashService.deleteFlash(id);
  }

  handleEdit(id: number) {
    this.flashService.getFlash(id);
    this.editing = true;
    this.editingId = id;
  }

  handleUpdate() {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }

  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

  handleRememberedChange({ id, flag }) {
    this.flashService.rememberedChange(id, flag);
  }

  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
    this.handleClear();
  }

  handleClear() {
    this.flash.question = '';
    this.flash.answer = '';
    this.flashForm.reset();
  }

}


