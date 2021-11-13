import state from "../model/state";
import {TimeQuiz} from "../model/timeQuiz";
import './TimeQuizComponent.scss';



export default class TimeQuizComponent extends HTMLElement {
    private answerGroup: HTMLCollectionOf<HTMLElement>;
    private questionGroup: HTMLCollectionOf<HTMLElement>;

    constructor() {
        super();
    }
    connectedCallback() {
        const mainTemplate = require('./TimeQuizComponent.ejs');
        this.innerHTML = mainTemplate();

        this.ownerDocument.getElementById("showAnswer").addEventListener('click', this.showAnswer);
        this.ownerDocument.getElementById("nextQuestion").addEventListener('click', this.nextQuestion);
        this.answerGroup = this.ownerDocument.getElementsByClassName("answer") as HTMLCollectionOf<HTMLElement>;
        this.questionGroup = this.ownerDocument.getElementsByClassName("question") as HTMLCollectionOf<HTMLElement>;

        this.initTimeQuiz();
    }

    showAnswer = (e: MouseEvent) => {
        this.setDisplay(this.answerGroup, 'block');
        this.setDisplay(this.questionGroup, 'none');
    }
    nextQuestion = (e: MouseEvent) => {
        this.initTimeQuiz();
    }

    setDisplay(elements: HTMLCollectionOf<HTMLElement>, displayValue: string) {
        for (let element of elements) {
            element.style.display = displayValue;
        }
    }
    initTimeQuiz = () => {
        state.time = new TimeQuiz();

        this.getElementsByClassName("timequizquestion").item(0)
            .setAttribute('value', state.time.question);
       this.getElementsByClassName("timequizanswer").item(0)
           .setAttribute('value', state.time.answer);

        this.setDisplay(this.answerGroup, 'none');
        this.setDisplay(this.questionGroup, 'block');
    }
}
