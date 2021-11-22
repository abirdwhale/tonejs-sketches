console.clear();

const synth = new Tone.Synth();

synth.toDestination();

document.getElementById("play-button").addEventListener("click", function () {
  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
  synth.triggerAttackRelease('C4', '8n');
});