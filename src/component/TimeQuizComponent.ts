import state from "../model/state";


export default class TimeQuizComponent extends HTMLElement {
    private answerGroup: HTMLElement;
    private questionGroup: HTMLElement;
    constructor() {
        super();
    }
    connectedCallback() {
        var mainTemplate = require('./TimeQuizComponent.ejs');
        this.innerHTML = mainTemplate();
        this.ownerDocument.getElementById("showAnswer").addEventListener('click', this.showAnswer);
        this.ownerDocument.getElementById("nextQuestion").addEventListener('click', this.nextQuestion);
        this.answerGroup = this.ownerDocument.getElementById("answer_group");
        this.questionGroup = this.ownerDocument.getElementById("question_group");
    }

    showAnswer = (e: MouseEvent) => {
        this.answerGroup.style.display = 'block';
        this.questionGroup.style.display = 'none';

    }
    nextQuestion = (e: MouseEvent) => {

    }
}
