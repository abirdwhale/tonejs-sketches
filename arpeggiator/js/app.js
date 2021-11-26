// Followed Tone.js & CodePen Part 03 - An Arpeggiator https://youtu.be/IT64QQo3jrM

console.clear();

const $inputs = document.querySelectorAll('input'),
  chords = [
    'A0 C1 E1', 'F0 A0 C1', 'G0 B0 D1',
    'D0 F0 A0', 'E0 G0 B0'
  ].map(formatChords);
console.log(chords);
let chordIdx = 0,
  step = 0;

const synth = new Tone.Synth(),
  gain = new Tone.Gain(0.2);
synth.oscillator.type = 'sine';
gain.toDestination();
synth.connect(gain);

// console.log(chords);

Array.from($inputs).forEach($input => {
  $input.addEventListener('change', () => {
    if ($input.checked) handleChord($input.value);
  })
});

function handleChord(valueString) {
  chordIdx = parseInt(valueString) - 1;
  console.log(chordIdx);
}


Tone.Transport.scheduleRepeat(onRepeat, '8n');
Tone.Transport.start();

function onRepeat(time) {
  let chord = chords[chordIdx],
    note = chord[step % chord.length];

  synth.triggerAttackRelease(note, '8n', time);
  step++
}

// DOWN THE LINE THIS WILL MAKE THINGS EASIER
function formatChords(chordString) {
  let chord = chordString.split(' ');
  let arr = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < chord.length; j++) {
      let noteOct = chord[j].split(''),
        note = noteOct[0];
      let oct = (noteOct[1] === '0') ? i + 4 : i + 5;
      note += oct;
      arr.push(note);
    }
  }
  return arr;
}

document.getElementById("play-button").addEventListener("click", function () {
  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
});