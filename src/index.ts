import 'bootstrap';

import './style/frame.scss';

import state from "./model/state";
import TimeQuizComponent from "./component/TimeQuizComponent";

const clear = () => {
    const socket = document.getElementsByTagName("socket")[0];

    while (socket.firstChild) {
        socket.removeChild(socket.firstChild);
    }
}

const showTimeQuiz = () => {
    clear();
    const socket = document.getElementsByTagName("socket")[0];
    const stateValue = encodeURIComponent(JSON.stringify(state));
    const quizElement = document.createElement('time-quiz');
    quizElement.setAttribute('state', stateValue);
    socket.appendChild(quizElement);

    console.debug('showing time quiz!');
}

const initComponents = () => {
    // for (let a in hsk1.words) {
    //     console.debug(a);
    // }

    customElements.define('time-quiz', TimeQuizComponent);
}

export { initComponents, showTimeQuiz };
