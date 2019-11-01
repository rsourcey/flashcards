import { IFlash } from './../flash.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}

@Injectable({
    providedIn: 'root'
})

export class FlashService {

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

    flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);

    addFlash(flash: IFlash) {
        this.flashs.push({
            ...flash,
            show: false,
            id: getRandomNumber()
        });
    }

    toggleFlash(id: number) {
        const index = this.flashs.findIndex(flash => flash.id === id);
        this.flashs = [
            ...this.flashs.slice(0, index),
            {
                ...this.flashs[index],
                show: !this.flashs[index].show
            },
            ...this.flashs.slice(index + 1)
        ];
        this.flashs$.next(this.flashs);
    }

    deleteFlash(id: number) {
        const index = this.flashs.findIndex(flash => flash.id === id);
        this.flashs = [
            ...this.flashs.slice(0, index),

            ...this.flashs.slice(index + 1)
        ];
        this.flashs$.next(this.flashs);
    }

    rememberedChange(id: number, flag: 'correct' | 'incorrect') {
        const index = this.flashs.findIndex(
            f => f.id === id
        );
        this.flashs = [
            ...this.flashs.slice(0, index),
            {
                ...this.flashs[index],
                remembered: flag
            },
            ...this.flashs.slice(index + 1)
        ];

        this.flashs$.next(this.flashs);
    }

    updateFlash(id, flash: { question: string, answer: string }) {
        const index = this.flashs.findIndex(f => f.id === id);
        this.flashs = [
            ...this.flashs.slice(0, index),
            {
                ...this.flashs[index],
                ...flash
            },
            ...this.flashs.slice(index + 1)
        ];
        this.flashs$.next(this.flashs);

    }

    getFlash(id: number) {
        const index = this.flashs.findIndex(flash => flash.id === id);
        return this.flashs[index];
    }
}