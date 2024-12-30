export class StopWatch {
    constructor(setTimer) {
        this.setTimer = setTimer;
        this.elapsedTime = 0;
        this.timerId = null;
        this.lastUpdate = 0;
        this.updateDisplay();
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        document.addEventListener("visibilitychange", this.handleVisibilityChange);
    }

    start() {
        if (this.timerId) return;
        this.lastUpdate = Date.now();
        this.timerId = setInterval(() => {
            this.elapsedTime += (Date.now() - this.lastUpdate) / 1000;
            this.lastUpdate = Date.now();
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        clearInterval(this.timerId);
        this.timerId = null;
    }

    reset() {
        this.stop();
        this.elapsedTime = 0;
        this.updateDisplay();
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.stop();
        } else {
            this.start();
        }
    }

    updateDisplay() {
        const totalSeconds = Math.floor(this.elapsedTime);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        this.setTimer(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    }
}