import Tone from 'tone';
import nx from 'nexusui';
import template from './synth.html';
import styles from './synth.scss';

export default {
    template,
    controller
};

controller.$inject = ['$window'];

function controller() {
    this.styles = styles;

    this.notes = [
        {
            note: 'C3',
            keyCode: 65
        },
        {
            note: 'D3',
            keyCode: 83
        },
        {
            note: 'E3',
            keyCode: 68
        },
        {
            note: 'F3',
            keyCode: 70
        },
        {
            note: 'G3',
            keyCode: 71
        },
        {
            note: 'A3',
            keyCode: 72
        },
        {
            note: 'B3',
            keyCode: 74
        },
        {
            note: 'C4',
            keyCode: 75
        }
    ];

    this.synth = new Tone.PolySynth(6, Tone.Synth, {
        'oscillator': {
            'partials': [0, 2, 3, 4],
        }
    }).toMaster();

    // const notes = ['E3', 'D3', 'C3', 'D3', 'E3', 'E3', 'E3'];
    // var counter = 0;

    // this.sequence = new Tone.Sequence(function(notes) {
    //     // if ( prevNote) this.synth.triggerRelease(prevNote);
    //     console.log(notes[counter]);
    //     counter++;
    //     // this.synth.triggerAttack(note);
    //     // const prevNote = note;
    // }, notes, '4n');

    // Tone.Transport.start();
    // this.sequence.start();
    // this.sequence.loop = 8;
    // this.sequence.loopEnd = '10s';

    nx.onload = function(){
        nx.colorize('#f5871f');
        var matrix1 = angular.element('#matrix');
        matrix1.col = 16;
        matrix1.row = 4;
        matrix1.init();
        matrix1.draw();
    };

    // var noteNames = ['F#', 'E', 'C#', 'A'];

    // var loop = new Tone.Sequence(function(time, col){
    //     var column = 
    // });

    this.noteOn = function(note) {
        console.log(this.synth);
        this.synth.triggerAttack(note);
    };

    this.noteOff = function(note) {
        this.synth.triggerRelease(note);
    };

    this.setFilter = function(freq, type) {
        const filter = new Tone.Filter(freq, type);
        this.synth['filter'] = filter;
    };

    this.keyDown = function($event) {
        $event.preventDefault();
        const note = this.notes.find(n => n.keyCode === $event.keyCode);
        this.noteOn(note.note);
    };

    this.keyUp = function($event) {
        $event.preventDefault();
        const note = this.notes.find(n => n.keyCode === $event.keyCode);
        this.noteOff(note.note);
    };

}
