let loopBeat;
let bassSynth;


bassSynth = new Tone.MembraneSynth().toDestination();

loopBeat = new Tone.Loop(song, "16n");

Tone.Transport.bpm.value = 140;
Tone.Transport.start();
loopBeat.start(0);


function song(time) {
  let currentBeat = Tone.Transport.position.split(":");
  if (currentBeat[1] == 0) {
    bassSynth.triggerAttackRelease("c1", "8n", time, 1);
  }
  console.log(currentBeat);
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