import Tone from 'tone';
import template from './synth.html';
import styles from './synth.scss';

export default {
    template,
    bindings: {
        userPatches: '<'
    },
    controller
};


controller.$inject = ['patchService', 'sequenceService', '$window'];

function controller(patchService, sequenceService, $window) {
    //binds key events
    const doc = $window.document;

    this.$onInit = () => {
        doc.addEventListener('keydown', this.keyDownHandler);
        doc.addEventListener('keyup', this.keyUpHandler);
    };

    this.$onDestroy = () => {
        doc.removeEventListener('keydown', this.keyDownHandler);
        doc.removeEventListener('keyup', this.keyUpHandler);
    };

    // this.mockId = '586d6567c5e57c0e906ad3c9'; //Will's
    // this.mockId = '586bda97f5977d80498b0883'; //Andy's
    this.mockId = '586d98b95a9cca386d70b9aa'; //Tom's'


    this.patch = {
        name: '',
        settings: {
            wave: 'sawtooth',
            envelope: {
                attack: .1,
                decay: .5,
                sustain: 1,
                release: .5
            },
            portamento: .2
        },
    };

    this.savePatch = () => {
        if(this.patch._id) {
            delete this.patch._id;
        }
        this.patch.userId = this.mockId;
        console.log(this.patch);
        patchService.add(this.patch)
            .then(res => {
                this.userPatches.push(res);
                return res;
            })
            .then(res => {
                const currSequence = {
                    sequence: this.sequenceMatrix,
                    tempo: this.bpm,
                    patchId: res._id
                };
                sequenceService.add(currSequence);
            });
    };

    

    this.loadSequence = patchId => {
        console.log('this is what gets passed in', patchId);
        sequenceService.get(patchId)
            .then(res => {
                this.sequenceMatrix = res.sequence;
                this.bpm = res.tempo;
            });
    };
 
    this.styles = styles;

    this.notes = [
        {
            note: 'C3',
            keyCode: 65
        },
        {
            note: 'C#3',
            keyCode: 87
        },
        {
            note: 'D3',
            keyCode: 83
        },
        {
            note: 'D#3',
            keyCode: 69
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
            note: 'F#3',
            keyCode: 84
        },
        {
            note: 'G3',
            keyCode: 71
        },
        {
            note: 'G#3',
            keyCode: 89
        },
        {
            note: 'A3',
            keyCode: 72
        },
        {
            note: 'A#3',
            keyCode: 85
        },
        {
            note: 'B3',
            keyCode: 74
        },
        {
            note: 'C4',
            keyCode: 75
        },
        {
            note: 'C#4',
            keyCode: 79
        },
        {
            note: 'D4',
            keyCode: 76
        },
        {
            note: 'D#4',
            keyCode: 80
        },
        {
            note: 'E4',
            keyCode: 186
        },
        {
            note: 'F4',
            keyCode: 222
        }
    ];

    this.synth = new Tone.PolySynth(6, Tone.Synth, {
        'oscillator': {
            'partials': [0, 2, 3, 4],
            'type': 'sawtooth'
        }
    }).toMaster();

    this.updateMatrix = function(col, row) {
        if(this.sequenceMatrix[col][row] === 1) this.sequenceMatrix[col][row] = 0;
        else this.sequenceMatrix[col][row] = 1;
    };

    this.toggleSelect = function() {
        console.log('hit');
    };

    this.sequenceMatrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];

    const notes = ['F#3', 'E3', 'C#3', 'A3'];
    // let lastNote = null;

    var loop = new Tone.Sequence((time, col) => {
        // if(lastNote) {
        this.synth.releaseAll();
        // }
        let column = this.sequenceMatrix[col];
        for(var i = 0; i < column.length; i++) {
            if(column[i] === 1) {
                var vel = Math.random() * 0.5 + 0.5;
                this.synth.triggerAttack(notes[i], time, vel);
                // lastNote = notes[i];
            }
        }
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n');

    Tone.Transport.start();
    
    this.bpm = 120;

    this.setBpm = function() {
        Tone.Transport.bpm.value = this.bpm;
    };

    this.setBpm();

    this.startLoop = function() {
        loop.start();
    };

    this.stopLoop = function() {
        loop.stop();
        this.synth.releaseAll();
    };

    this.noteOn = function(note) {
        // console.log(this.synth);
        this.synth.triggerAttack(note);
    };

    this.noteOff = function(note) {
        this.synth.triggerRelease(note);
    };

    this.setFilter = function(freq, type) {
        const filter = new Tone.Filter(freq, type);
        this.synth['filter'] = filter;
    };

    let fired = false;
    this.keyDown = function($event) {
        if ($event.target.tagName.toLowerCase() === 'input') return;
        if (!fired) {
            fired = true;
            $event.preventDefault();
            const note = this.notes.find(n => n.keyCode === $event.keyCode);
            this.noteOn(note.note);
        }

    };

    this.keyUp = function($event) {
        fired = false;
        $event.preventDefault();
        //following line works
        const note = this.notes.find(n => n.keyCode === $event.keyCode);
        this.noteOff(note.note);
    };

    this.keyDownHandler = this.keyDown.bind(this);
    this.keyUpHandler = this.keyUp.bind(this);
}
