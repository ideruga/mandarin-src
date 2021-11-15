export class TimeQuiz {
    private readonly _question: string;
    private readonly _answer: string;
    private _showAnswer: boolean = false;

    constructor() {
        [this._question, this._answer] = this.initQuiz();
    }

    public flip() {
        this._showAnswer = true;
    }

    public get question() {
        return this._question;
    }

    public get answer() {
        return this._answer;
    }

    public get showAnswer() {
        return this._showAnswer;
    }

    private initQuiz() {

        const time = Time.generate();

        return [time.toTimeString(), time.toChineseString()];
    }
}

const numerals = '一二三四五六七八九十'

class Time {

    public static generate(): Time {
        return new Time(Math.floor(Math.random()*24), Math.floor(Math.random()*60));
    }

    private constructor(private hour: number, private minute: number) {};

    public toTimeString(): string {

        return '[' + pad(this.hour) + ':' + pad(this.minute) + ']';
    }

    public toChineseString(): string {
        return this.prefix(this.hour) + this.encodeHours(this.hour) + '点' + this.encodeMinutes(this.minute) + '分';

    }
    private encodeHours(hours) {
        const encoded = this.encode(hours);
        return encoded === '二'? '两': encoded;
    }
    private encodeMinutes(minutes) {
        const encoded = this.encode(minutes);
        return minutes < 10? '零' + encoded: encoded;

    }

    private prefix(hours) {
        if (hours < 1) {
            return '半夜';
        } else if (hours < 5) {
            return '凌晨';
        } else if (hours < 9) {
            return '早上';
        } else if (hours < 12) {
            return '上午';
        } else if (hours < 13) {
            return '中午';
        } else if (hours < 17) {
            return '下午';
        } else if (hours < 19) {
            return '傍晚';
        } else {
            return '晚上';
        }
    }

    private encode(num) {
        const second = num%10;
        const first = Math.floor(num/10);

        return this.resolveChar(first, '十') + this.resolveChar(second, '');
    }

    private resolveChar(position, suffix) {
        if (position <= 0 || position > numerals.length) {
            return '';
        }
        if (position === 1 && suffix !== '') {
            return suffix;
        }
        return numerals[position-1] + suffix;
    }
}
const pad = (num) => {
    return num < 10? '0' + num: '' + num;
}
