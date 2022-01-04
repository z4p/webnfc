class SoundManager {
    playSound(frequency, duration) {
        let audioContext = new (window.AudioContext || window.webkitAudioContext)();

        let mainGainNode = audioContext.createGain();
        mainGainNode.connect(audioContext.destination);

        let osc = audioContext.createOscillator();
        osc.connect(mainGainNode);
        osc.type = 'triangle';
        osc.frequency.value = frequency;
        osc.start();

        setTimeout(() => {
            osc.stop();
        }, duration);
    };
}
