class Fullscreen {
    constructor() {
        this.el = document.getElementById("app");
    }
    default () {    }
    go() {
        if (this.el.requestFullscreen) {
            this.el.requestFullscreen();
        } else if (this.el.mozRequestFullScreen) {
            this.el.mozRequestFullScreen();
            console.info('Go fullscreen');
        } else if (this.el.webkitRequestFullscreen) {
            console.info('Go fullscreen');
            this.el.webkitRequestFullscreen();
        } else if (this.el.msRequestFullscreen) {
            this.el.msRequestFullscreen();
        }
        // Don't work when exit. Still shows true.
        // store.ui.fullscreen = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
    }
    exit() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            console.info('Exit fullscreen');
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            console.info('Exit fullscreen');
        }
    }
}

exports = module.exports = Fullscreen;
