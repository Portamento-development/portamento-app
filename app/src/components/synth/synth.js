import Tone from 'tone';
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
        }
    ];

    this.synth = new Tone.PolySynth(6, Tone.Synth, {
        'oscillator': {
            'partials': [0, 2, 3, 4],
        }
    }).toMaster();

    this.noteOn = function(note) {
        this.synth.triggerAttack(note);
    };

    this.noteOff = function(note) {
        this.synth.triggerRelease(note);
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
