let loopBeat;
let bassSynth;

function setup() {
  bassSynth = new Tone.MembraneSynth().toDestination();
  
  loopBeat = new Tone.Loop(song, "4n");
  
  Tone.Transport.bpm.value = 140;
  // Tone.Transport.start();
  loopBeat.start(0);
}

function song(time){
  bassSynth.triggerAttackRelease("c1", "8n", time)
  console.log(time);
}

/* document.getElementById("play-button").addEventListener("click", function () {
  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
}); */

//attach a click listener to a play button
document.querySelector('play-button')?.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})