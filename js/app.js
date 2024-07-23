export default class App
{
    //nombres de balises articles
    nbrArticles;

    constructor() {
        this.initElements()
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
    }

    /**
     * Initialise et handle le chronomètre
     */
    initChrono()
    {
        const start = new Date();

        setInterval(()=>{
            const now = new Date();
            const diff = this.getDateDiff(now, start)

            this.chrono.textContent = diff.minutes + ":" + diff.secods
        }, 10)
        
        setTimeout(()=>{
            this.chrono.style.color = "#f00"
        }, 10 * 60 *1000) // 10 mins
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