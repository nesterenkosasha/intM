//import MarketPage from "./index.js"

// const c = document.getElementsByClassName('content')
// c.innerText = "GGGGGGGGGGGGGGGGGGGGG";
// console.log(c)
//
// import Card from "./card";
// const card = new Card()


// export default 
class Products {
    constructor(){
        this.createEl = this.createEl.bind(this)
        this.boughtProducts = getLocalStorage()
        this.boughtIds = this.boughtProducts.reduce((acc, el) => {
            return acc.concat(el.id)
        },[])
        console.log(this.boughtIds)
    }

    createEl(el) {
        return document.createElement(el)
    }

    render(el, place){
        this.wrapperProduct = this.createEl("div")
        this.wrapperProduct.setAttribute("id", el.id)
        this.wrapperProduct.dataset.id = el.id
        this.wrapperProduct.classList.add("wrapperProduct")
        //------------
        this.img = new Image()
        this.img.src = el.url
        //------------------------
        this.info = this.createEl("div")
        this.info.classList.add("info")
        this.title = this.createEl("div")
        this.title.innerText = el.title

        //----------
        this.span = this.createEl("span")
        this.span.innerText = ` ${el.price} $`
        this.btn = this.createEl("button")
        
        if(this.boughtIds.includes(el.id)){
            this.btn.innerText = "DELETE"
            this.btn.classList.add("btn", "PRESSED")
        } else {
            this.btn.innerText = "BUY"
            this.btn.classList.add("btn")
        }

        this.info.appendChild(this.span)
        this.info.appendChild(this.btn)
        this.wrapperProduct.appendChild(this.img)
        this.wrapperProduct.appendChild(this.title)
        this.wrapperProduct.appendChild(this.info)
        place.appendChild(this.wrapperProduct)
        console.log("render one product")
    }




}
//const products = new Products().render({id: 105, title: "NOTE", url: "http://placehold.it/150/771796", price: 100})


