import Tone from 'tone';
import template from './synth.html';
import styles from './synth.scss';

export default {
    template,
    bindings: {
        currentUser: '=',
        userPatches: '<',
        favPatches: '<',
        loadedPatch: '<'
    },
    controller
};

controller.$inject = ['patchService', 'sequenceService', 'userService', '$window'];

function controller(patchService, sequenceService, userService, $window) {
    const doc = $window.document;

    this.$onInit = () => {
        this.loginPrompt = false;
        this.saveFeedback = false;
    
        if(this.loadedPatch) {
            this.favorited = false;
            this.patch = this.loadedPatch;
            this.setSynth();
            this.patchSaved = true;
            this.loadSequence(this.patch._id);
            if (this.currentUser) {
                userService.getUserById(this.currentUser.id)
                    .then(user => {
                        user.favoriteId.forEach(obj => {
                            if(obj._id === this.patch._id) {
                                this.favorited = true;
                            }
                        });
                    });
            }
        }

        doc.addEventListener('keydown', this.keyDownHandler);
        doc.addEventListener('keyup', this.keyUpHandler);
    };
  
    //destroys key events so they don't repeat each time component reused
    this.$onDestroy = () => {
        doc.removeEventListener('keydown', this.keyDownHandler);
        doc.removeEventListener('keyup', this.keyUpHandler);
        this.stopLoop();
    };
     
    this.upVoted = false;
    this.patchSaved = false;
    //load default patch if patch not resolved in state
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
            portamento: 0
        },
    };

    this.setSynth = () => {
        this.synth.set({
            oscillator: {type: this.patch.settings.wave},
            envelope: {
                attack: this.patch.settings.envelope.attack,
                decay: this.patch.settings.envelope.decay,
                sustain: this.patch.settings.envelope.sustain,
                release: this.patch.settings.envelope.release
            },
            portamento: this.patch.settings.portamento
        });
    };

    this.savePatch = () => {
        this.favorited = false;
        if(!this.currentUser) {
            this.loginPrompt = true;
            return;
        }
        if(this.patch._id) {
            delete this.patch._id;
        }
        this.patch.userId = this.currentUser.id;
        patchService.add(this.patch)
            .then(res => {
                this.patch._id = res._id;
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
            })
            .then(() => userService.getUserById(this.currentUser.id))
            .then(user => {
                user.patchId.push(this.patch._id);
                return user;
            })
            .then(user => userService.updateUser(user._id, user));

        this.saveFeedback = true;
        this.patchSaved = true;
        document.getElementById('save').reset(); //eslint-disable-line
    };
    
    this.vote = (number) => {
        if(this.upVoted === false) this.upVoted = true;
        else this.upVoted = false;
        if(!this.patch.votes) this.patch.votes = 0;
        this.patch.votes += number;
        patchService.update(this.patch._id, this.patch)
            // .then(res => console.log(res))
            .catch(error => console.log('error at upvoting', error));
    };

    this.favorite = () => {
        this.favorited = true;
        if(!this.patch.favorites) this.patch.favorites = 0;
        this.patch.favorites += 1;
        patchService.update(this.patch._id, this.patch)
            .then(res => {
                this.favPatches.push(res);
                userService.getUserById(this.currentUser.id)
                    .then(user => {
                        user.favoriteId.push(this.patch._id);
                        userService.updateUser(this.currentUser.id, user);
                    });
            });
    };

    this.unfavorite = () => {
        this.favorited = false;
        this.patch.favorites += -1;
        patchService.update(this.patch._id, this.patch)
            .then(() => {
                userService.getUserById(this.currentUser.id)
                    .then(user => {
                        user.favoriteId.forEach((obj, index) => {
                            if(obj._id === this.patch._id) {
                                user.favoriteId.splice(index, 1);
                            }
                        });
                        userService.updateUser(this.currentUser.id, user);
                    });

            });
    };

    this.loadSequence = patchId => {
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
   
    this.filter = new Tone.Filter().toMaster();
    this.combFilter = new Tone.FeedbackCombFilter(0, 0).toMaster();

    this.synth = new Tone.PolySynth(6, Tone.Synth, {
        'oscillator': {
            'partials': [0, 2, 3, 4],
            'type': 'sawtooth'
        }
    });

    this.synth.chain(this.filter, this.combFilter, Tone.Master);

    this.updateMatrix = function(col, row) {
        if(this.sequenceMatrix[col][row] === 1) this.sequenceMatrix[col][row] = 0;
        else this.sequenceMatrix[col][row] = 1;
    };

    this.sequenceMatrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];

    const notes = ['F#3', 'E3', 'C#3', 'A3'];

    let loop = new Tone.Sequence((time, col) => {
        this.synth.releaseAll();
        let column = this.sequenceMatrix[col];
        for(let i = 0; i < column.length; i++) {
            if(column[i] === 1) {
                let vel = Math.random() * 0.5 + 0.5;
                this.synth.triggerAttack(notes[i], time, vel);
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
        this.synth.triggerAttack(note);
    };

    this.noteOff = function(note) {
        this.synth.triggerRelease(note);
    };

    this.setFilter = function(freq, type) {
        const filter = new Tone.Filter(freq, type);
        this.synth['filter'] = filter;
    };

    this.unFocus = function($event) {
        $event.target.blur();
    };

    const fired = {};

    this.keyDown = function($event) {
        const target = $event.target;
        if (target.tagName.toLowerCase() === 'input' && target.type === 'text') return;
        if (target.tagName.toLowerCase() === 'input' && target.type === 'password') return;
        if ($event.altKey || $event.ctrlKey || $event.metaKey) return;
        if (!fired[$event.keyCode]) {
            fired[$event.keyCode] = true;
            $event.preventDefault();
            const note = this.notes.find(n => n.keyCode === $event.keyCode);
            if(note) this.noteOn(note.note);
        }
    };

    this.keyUp = function($event) {
        if (($event.keyCode === 91) || ($event.keyCode === 18) || ($event.keyCode === 17) || ($event.keyCode === 93)) return;
        fired[$event.keyCode] = false;
        $event.preventDefault();
        //following line works
        const note = this.notes.find(n => n.keyCode === $event.keyCode);
        if(note) this.noteOff(note.note);
    };

    this.keyDownHandler = this.keyDown.bind(this);
    this.keyUpHandler = this.keyUp.bind(this);
}
