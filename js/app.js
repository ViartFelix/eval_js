export default class App
{
    //si la vidéo se joue
    videoPlaying = false;
    //si la vidéo est en plein écran
    videoFullScreen = false;

    keyPresses = [
        38,38,40,40,37,39,37,39,66,65
    ]
    codePos = 0;



    constructor() {
        this.initElements()
        this.initEvents()
        this.displayNbrArticles()
        this.initChrono()
    }

    displayNbrArticles()
    {
        console.log(this.articles.length);
    }

    initElements()
    {
        this.articles = document.querySelectorAll("#content article")
        this.chrono = document.querySelector("#information div:last-child span")
        this.video = document.querySelector("#video")
    }

    /**
     * Initialise et handle le chronomètre
     */
    initChrono()
    {

        const start = localStorage.getItem('chrono_before') !== undefined
            ? new Date(localStorage.getItem("chrono_before"))
            : new Date();

        setInterval(()=>{
            const now = new Date();
            const diff = this.getDateDiff(now, start)

            localStorage.setItem("chrono_before", start)
            localStorage.setItem("chrono_after", now)

            this.chrono.textContent = diff.minutes + ":" + diff.secods
        }, 10)
        
        setTimeout(()=>{
            this.chrono.style.color = "#f00"
        }, 10 * 60 *1000) // 10 mins
    }

    initEvents()
    {
        this.articles.forEach((article) => {
            article
                .querySelector("h2")
                .addEventListener("click", (e) => {
                    this.unselectAll()
                    article.classList.add("expanded")
                })
        })

        this.video.querySelector("#video-play").addEventListener("click",() => {
            this.handleVideoPlay()
            this.updateVideoHtml()
        })

        this.video.querySelector("#video-reset").addEventListener("click",() => {
            this.handleVideoReset()
            this.updateVideoHtml()
        })

        this.video.querySelector("#video-fullscreen").addEventListener("click", () => {
            this.handleVideoFullScreen()
            this.updateVideoHtml()
        })

        this.video.querySelector("#video-progress").addEventListener("click", (e) => {
            this.handleProgressChange(e)
            this.updateVideoHtml()
        })

        window.addEventListener("keydown", (e) => {
            this.handleKonamiCode(e)
        })
    }

    handleKonamiCode(e)
    {
        const expected = this.keyPresses[this.codePos]
    }

    handleProgressChange(e)
    {
        const el = e.target
        const x = e.pageX - el.offsetLeft
        const y = e.pageY - el.offsetTop

        const percent = e.target.value = x * el.max / el.offsetWidth - 42.484;

        el.value=percent
    }

    handleVideoFullScreen()
    {
        this.videoFullScreen = !this.videoFullScreen

        const player = this.video.querySelector("video")

        if(this.videoFullScreen) {
            this.video.style.position = "absolute"
            this.video.style.left = "0px"
            this.video.style.top = "0px"
            this.video.style.width = "100vw"
            this.video.style.height = "100vh"
            this.video.style.zIndex = "99999"
            this.video.style.maxWidth = "100vw"
            player.style.width = "100vw"
            player.style.maxWidth = "100vw"
        } else {
            this.video.attributeStyleMap.clear()
            player.attributeStyleMap.clear()
        }
    }


    handleVideoReset()
    {
        const player = this.video.querySelector("video")
        player.pause();
        player.currentTime = 0;
        player.play();
    }

    handleVideoPlay(e)
    {
        this.videoPlaying = !this.videoPlaying

        if(this.videoPlaying) {
            this.video.querySelector("video").play()
        } else {
            this.video.querySelector("video").pause()
        }
    }

    unselectAll()
    {
        this.articles.forEach((article) => {
            article.classList.remove("expanded")
        })
    }

    handleArticleDeploy(e)
    {
        this.articles.forEach((article) => {
            console.log(article);
        })
    }

    updateVideoHtml()
    {
        const el = this.video.querySelector("#video-play i")

        if(this.videoPlaying === true) {
            el.classList.add("fa-play")
            el.classList.remove("fa-pause")
        } else {
            el.classList.remove("fa-play")
            el.classList.add("fa-pause")
        }
    }

    getDateDiff(dateOne, dateTwo)
    {
        //différence entre les deux dates
        let difference = dateOne.getTime() - dateTwo.getTime();

        //heures
        const hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60
        //minutes
        const minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60
        //secondes
        const secondsDifference = Math.floor(difference/1000);

        return {
            hour: hoursDifference,
            minutes: minutesDifference,
            secods: secondsDifference,
            raw: difference
        }
    }
}

document.addEventListener("DOMContentLoaded", (e) => {
    new App()
})