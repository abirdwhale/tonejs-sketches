console.clear();

const synth = new Tone.Synth();
synth.oscillator.type = "sine";
const gain = new Tone.Gain(0.2);
synth.connect(gain);
gain.toDestination();

const notes = [
  'C4', 'E4', 'G4',
  'C5', 'E5', 'G5'
];

let index = 0;

Tone.Transport.scheduleRepeat(time => {
  repeat(time);
}, '8n');

// Tone.Transport.bpm.value = 120;

function repeat(time) {

  let note = notes[index % notes.length];
  synth.triggerAttackRelease(note, '8n', time);
  index++;
}

document.getElementById("play-button").addEventListener("click", function () {
  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
});

// setTimeout(() => {
//   Tone.Transport.stop();
// }, 5000)