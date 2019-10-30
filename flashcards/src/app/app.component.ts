import { IFlash } from './flash.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flashcards';

  editing: boolean: f;
  editingId: number;

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
      question: 'Question 3',
      answer: 'Answer 3',
      show: false,
      id: getRandomNumber()
    }
  ];

  trackByFlashId(index, flash) {
    console.log(flash);
    return flash.id;
  }

  handleToggleCard(id: number) {
    const flash = this.flashs.find(f => f.id === id);
    flash.show = !flash.show;
  }

  handleDelete(id: number) {
    const flash = this.flashs.filter(f => f.id === id)[0];
    const flashId = this.flashs.indexOf(flash);
    this.flashs.splice(flashId, 1);
  }

  handleEdit(id: number){
    this.editing = true;
    this.editingId = id;
    //TODO
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 1000);
}
