let loopBeat;
let bassSynth, cymbalSynth;
let counter;
let amSynth;
let fmSymth;
let pluckSynth;

function setup() {
  counter = 0;

  pluckSynth = new Tone.PluckSynth().toDestination();

  amSynth = new Tone.AMSynth({
    harmonicity: 1.04, //3/1
    detune: 0,
    oscillator: {
      type: "sine", //cariier signal
    },
    envelope: {
      attack: 0.0001,
      decay: 0.01,
      sustain: 1,
      release: 0.5,
    },
    modulation: {
      type: "square", //modulation signal
    },
    modulationEnvelope: {
      attack: 0.5,
      decay: 0,
      sustain: 1,
      release: 0.5,
    },
  }).toDestination();

  fmSynth = new Tone.FMSynth({
    harmonicity: 1.04, // modulation synth / carrier synth
    modulationIndex: 10,
    detune: 0,
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.01,
      decay: 0.01,
      sustain: 1,
      release: 0.5,
    },
    modulation: {
      type: "square",
    },
    modulationEnvelope: {
      attack: 0.5,
      decay: 0,
      sustain: 1,
      release: 0.5,
    },
  }).toDestination();

  bassSynth = new Tone.MembraneSynth().toDestination();
  cymbalSynth = new Tone.MetalSynth({
    frequency: 250,
    envelope: {
      attack: 0.001,
      decay: 0.1,
      release: 0.01,
    },
    harmonicity: 3.1,
    modulationIndex: 16,
    resonance: 4000,
    octaves: 0.5,
  }).toDestination();

  loopBeat = new Tone.Loop(song, "16n").start(0);;
  Tone.Transport.start().bpm.value = 140;
}

function song(time) {
  if (counter % 4 === 0) {
    bassSynth.triggerAttackRelease("c1", "8n", time, 1);
  }

  if (counter % 4 !== 1) {
    if (counter === 3 || counter === 12) {
      cymbalSynth.envelope.decay = 0.5;
    } else {
      cymbalSynth.envelope.decay = 0.01;
    }
    cymbalSynth.triggerAttackRelease("c1", "32n", time, 0.3);
  }

  if (counter === 0) {
    amSynth.triggerAttackRelease("a2", "16n", time, 1);
  }

  if (counter === 10) {
    amSynth.triggerAttackRelease("Bb1", "16n", time, 1);
  }

  if (counter === 0) {
    fmSynth.triggerAttackRelease("a2", "16n", time, 1);
  }

  if (counter === 10) {
    fmSynth.triggerAttackRelease("Bb1", "16n", time, 1);
  }

  if (counter % 2 === 0) {
    pluckSynth.triggerAttackRelease("B6", "16n", time, 0.4);
  } else {
    pluckSynth.triggerAttackRelease("g#6", "16n", time, 0.4);
  }

  counter = (counter + 1) % 16;
  // console.log(counter);
  // console.log(pluckSynth.get());
}

document.getElementById("play-button").addEventListener("click", function () {
  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
});

//below does not work and i don't know why...
//attach a click listener to a play button
/* document.querySelector('button')?.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
}) */