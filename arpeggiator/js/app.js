// Followed Tone.js & CodePen Part 03 - An Arpeggiator https://youtu.be/IT64QQo3jrM

console.clear();

const $inputs = document.querySelectorAll('input'),
      chords = [
        'A4 C5 E5', 'F4 A4 C5', 'G4 B4 D5',
        'D4 F4 A4', 'E4 G4 B4' 
      ].map(strong => strong.split(' '));
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
      note = chord[step % 3];
      
      synth.triggerAttackRelease(note, '8n', time);
      step++
}


document.getElementById("play-button").addEventListener("click", function () {
  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
});