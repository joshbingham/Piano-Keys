// The keys and notes variables store the piano keys
const keys = ['c-key', 'd-key', 'e-key', 'f-key', 'g-key', 'a-key', 'b-key', 'high-c-key', 'high-d-key', 'c-sharp-key', 'd-sharp-key', 'f-sharp-key', 'g-sharp-key', 'a-sharp-key', 'high-c-sharp-key'];
const notes = [];
keys.forEach(function(key){
  notes.push(document.getElementById(key));
});

// Track sequence of notes
let targetSequences = [
    {
        notes: ['g-key', 'g-key', 'a-key', 'g-key', 'high-c-key', 'b-key'],
        action: () => showNextLineOne()
    },
    {
        notes: ['g-key', 'g-key', 'a-key', 'g-key', 'high-d-key', 'c-key'],
        action: () => showNextLineTwo()
    },
    {
        notes: ['g-key', 'g-key', 'g-key', 'e-key', 'c-key', 'b-key', 'a-key'],
        action: () => showNextLineThree()
    }
];

let userSequence = [];

// Track which line the user is on
let currentLine = 0;

// Write named functions that change the color of the keys below
const keyPlay = (event) => {
    const key = event.target;
    if (key.className === 'key') {
        key.style.boxShadow = '1px 2px';
    }
    

    // Track user sequence
    userSequence.push(key.id);

    // Get active target sequences based on current line
    const activeSequence = targetSequences[currentLine];
    const { notes, action } = activeSequence;

    // Check if current user input matches the target sequence so far
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== notes[i]) { 
            userSequence = [];
            event.target.style.backgroundColor = 'red';
            event.target.style.transform = 'translateY(3px)';
            return; // Mismatch found, exit early
        } 
    
            // If user sequence matches target sequence length, trigger action
        if (userSequence.length === notes.length) {
                action();
                userSequence = [];
                currentLine++; // Move to next line
            }
        }

    // Loop through target sequences to check for matches
    targetSequences.forEach((sequence) => {
        if (userSequence.length === sequence.notes.length) {
            if (userSequence.every((note, index) => note === sequence.notes[index])) {
                sequence.action();
                userSequence = [];
            }   
        }   
    });
};
    

const keyReturn = (event) => {
    const key = event.target;
    if (key.className === 'key') {
        key.style.boxShadow = '2px 5px';
    }
    event.target.style.backgroundColor = '';
    event.target.style.transform = 'translateY(0px)';
};

// Write a named function with event handler properties
const eventAssignment = (note) => {
    note.onmousedown = keyPlay;
    note.onmouseup = keyReturn;
};

// Write a loop that runs the array elements through the function
notes.forEach(eventAssignment);

// These variables store the buttons that progress the user through the lyrics
let nextOne = document.getElementById('first-next-line');
let nextTwo = document.getElementById('second-next-line');
let nextThree = document.getElementById('third-next-line');
let startOver = document.getElementById('fourth-next-line');

// This variable stores the '-END' lyric element
let lastLyric = document.getElementById('column-optional');

// These statements are "hiding" all the progress buttons, but the first one
nextTwo.hidden = true;
nextThree.hidden = true;
startOver.hidden= true;

// Write anonymous event handler property and function for the first progress button
const showNextLineOne = () => {
    nextTwo.hidden = false;
    nextOne.hidden = true;
    document.getElementById('letter-note-five').innerHTML = 'D';
    document.getElementById('letter-note-six').innerHTML = 'C';
};

// Write anonymous event handler property and function for the second progress button
const showNextLineTwo = () => {
    nextThree.hidden = false;
    nextTwo.hidden = true;
    document.getElementById('word-five').innerHTML = 'DEAR';
    document.getElementById('word-six').innerHTML = 'FRI-';
    lastLyric.style.display = 'inline-block';
    document.getElementById('letter-note-three').innerHTML = 'G';
    document.getElementById('letter-note-four').innerHTML = 'E';
    document.getElementById('letter-note-five').innerHTML = 'C';
    document.getElementById('letter-note-six').innerHTML = 'B';
};

// Write anonymous event handler property and function for the third progress button
const showNextLineThree = () => {
    startOver.hidden = false;
    nextThree.hidden = true;
    document.getElementById('word-one').innerHTML = 'HAP-';
    document.getElementById('word-two').innerHTML = 'PY';
    document.getElementById('word-three').innerHTML = 'BIRTH-';
    document.getElementById('word-four').innerHTML = 'DAY';
    document.getElementById('word-five').innerHTML = 'TO';
    document.getElementById('word-six').innerHTML = 'YOU!';
    document.getElementById('letter-note-one').innerHTML = 'F';
    document.getElementById('letter-note-two').innerHTML = 'F';
    document.getElementById('letter-note-three').innerHTML = 'E';
    document.getElementById('letter-note-four').innerHTML = 'C';
    document.getElementById('letter-note-five').innerHTML = 'D';
    document.getElementById('letter-note-six').innerHTML = 'C';
    lastLyric.style.display = 'none';
};

// This is the event handler property and function for the startOver button
startOver.onclick = function() {
  nextOne.hidden = false;
  startOver.hidden = true;
  document.getElementById('word-one').innerHTML = 'HAP-';
  document.getElementById('letter-note-one').innerHTML = 'G';
  document.getElementById('word-two').innerHTML = 'PY';
  document.getElementById('letter-note-two').innerHTML = 'G';
  document.getElementById('word-three').innerHTML = 'BIRTH-';
  document.getElementById('letter-note-three').innerHTML = 'A';
  document.getElementById('word-four').innerHTML = 'DAY';
  document.getElementById('letter-note-four').innerHTML = 'G';
  document.getElementById('word-five').innerHTML = 'TO';
  document.getElementById('letter-note-five').innerHTML = 'C';
  document.getElementById('word-six').innerHTML = 'YOU!';
  document.getElementById('letter-note-six').innerHTML = 'B';
};