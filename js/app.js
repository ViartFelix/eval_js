export default class App
{
    //nombres de balises articles
    nbrArticles;

    constructor() {
        this.nbrArticles = document.querySelectorAll("#content article").length
        console.log(this.nbrArticles);
    }
}

document.addEventListener("DOMContentLoaded", (e) => {
    new App()
})