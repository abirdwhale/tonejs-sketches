// Followed Tone.js & CodePen Part 02 - Step Sequencer https://youtu.be/Dxxkma4F-oA

console.clear();

const synths = [
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth()
];

synths[0].oscillator.type = 'triangle';
synths[1].oscillator.type = 'sine';
synths[2].oscillator.type = 'sawtooth';

const gain = new Tone.Gain(0.6);
gain.toDestination();

synths.forEach(synth => synth.connect(gain));

const $rows = document.body.querySelectorAll('div > div'),
      notes = ['G5', 'E4', 'C3'];
let index = 0;

Tone.Transport.scheduleRepeat(repeat, '8n');

function repeat(time) {
  let step = index % 8;
  for (let i = 0; i < $rows.length; i++) {
    let synth = synths[i],
        note = notes[i],
        $row = $rows[i],
        $input = $row.querySelector(`input:nth-child(${step + 1})`);
    if ($input.checked) synth.triggerAttackRelease(note, '8n', time);
  }
  index++;
}

document.getElementById("play-button").addEventListener("click", function () {
  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
});