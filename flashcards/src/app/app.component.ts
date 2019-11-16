import { FlashService } from './flash/flash.service';
import { IFlash } from './flash.model';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('flashForm', { static: true }) flashForm: NgForm;
  title = 'flashcards';


  editing = false;
  editingId: number;

  flash: IFlash = {
    question: '',
    answer: '',
    show: false,
    id: 9,
  };

  flash$: Observable<IFlash[]>;

  subscription: Subscription;

  constructor(
    private flashService: FlashService
  ) {
    // this.flashs = this.flashService.flashs;

  }

  ngOnInit() {
    // this.subscription = this.flashService.flashs$.subscribe(f => {
    //   this.flashs = f;
    // });
    this.flash$ = this.flashService.flashs$;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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


