export interface IFlash {
    question: string;
    answer: string;
    show: boolean;
    id: number;
    //// this used with ngClass where it creates a style class
    remembered?: 'correct' | 'incorrect';
}
