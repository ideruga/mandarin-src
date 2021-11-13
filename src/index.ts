import 'bootstrap';

import './style/frame.scss';

import hsk1 from './data/hsk1.json';
import state from "./model/state";
import {TimeQuiz} from "./model/timeQuiz";
import TimeQuizComponent from "./component/TimeQuizComponent";
// import '@webcomponents/custom-elements';



export const initComponents = () => {
    // for (let a in hsk1.words) {
    //     console.debug(a);
    // }

    customElements.define('time-quiz', TimeQuizComponent);
}
