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

  editing = false;
  editingId: number;
  flash = {
    question: '',
    answer: ''
  }

  flashs: IFlash[] = [
    {
      question: 'Question 1',
      answer: 'Answer 1',
      show: false,
      id: getRandomNumber()
    },
    {
      question: 'Question 2',
      answer: 'Answer 2',
      show: false,
      id: getRandomNumber()
    },
    {
      question: 'Question 3',
      answer: 'Answer 3',
      show: false,
      id: getRandomNumber()
    },
    {
      question: 'Question 4',
      answer: 'Answer 4',
      show: false,
      id: getRandomNumber()
    }
  ];

  trackByFlashId(index, flash) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    const flash = this.flashs.find(f => f.id === id);
    flash.show = !flash.show;
  }

  handleDelete(id: number) {
    console.log(id);
    const flash = this.flashs.filter(f => f.id === id)[0];
    const flashId = this.flashs.indexOf(flash);
    this.flashs.splice(flashId, 1);
  }

  handleEdit(id: number) {
    this.editing = true;
    this.editingId = id;
    //TODO
  }

  handleRememberedChange({ id, flag }) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.remembered = flag;
  }

  handleSubmit(): void {
  
    this.handleClear();
  }

  handleClear() {
    this.flash = {
      question: '',
      answer: ''
    };
    
    this.flashForm.reset();
  }

  private generatedId(): number{
    return getRandomNumber();
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 1000);
}
