export default class Card{
    constructor(cardL){
        this.cardL = cardL
        this.products = {}
        // this.setItem()
        // this.getItem()
        this.render()
    }
setItem(){
        this.obj =
        localStorage.setItem("product", JSON.stringify(this.products))
}
getItem(){
      return localStorage.getItem("product")
}


    createEl(el) {
        return document.createElement(el)
    }

    addToCard(el){
        console.log("!!!!!!!!!", el)
        this.products[el.id] = el

         console.log("this.products", this.products)
        // console.log("this.products", [].join.call(...this.products, "---"))
        //this.render()
    }
    removeItem(id){
        this.products = this.products.filter(el => el.id != id)
        this.render()
    }


    render(){
       // this.cardL.innerHTML = ""

        this.wrap = this.createEl("div")
        this.wrap.innerHTML = ""
        for(let r in this.products){
            console.log("this.products", this.products[r])
            this.item = this.createEl("div")
            this.item.classList.add("itemInCard")

            this.del = this.createEl("button")
            this.del.addEventListener("click", ({ target }) => {
                console.log(";;;;", target.parentNode)
                target.parentNode.remove()
                this.removeItem(this.products[r].id)
            })
            this.del.innerText = "x"

            this.title = this.createEl("div")
            this.title.innerText = this.products[r].title
            this.price = this.createEl("div")
            this.price.innerText = this.products[r].price
            this.amount = this.createEl("input")
            this.amount.type = "number"
            this.item.appendChild(this.del)
            this.item.appendChild(this.title)
            this.item.appendChild(this.price)
            this.item.appendChild(this.amount)

            this.wrap = this.wrap.appendChild(this.item)

        }
        // console.log("1111111", this.products)
        // this.products.forEach(el => {
            // this.item = this.createEl("div")
            // this.item.classList.add("itemInCard")
            //
            // this.del = this.createEl("button")
            // this.del.addEventListener("click", ({ target }) => {
            //     console.log(";;;;", target.parentNode)
            //    target.parentNode.remove()
            //     this.removeItem(el.id)
            // })
            // this.del.innerText = "x"
            //
            // this.title = this.createEl("div")
            // this.title.innerText = el.title
            // this.price = this.createEl("div")
            // this.price.innerText = el.price
            // this.amount = this.createEl("input")
            // this.amount.type = "number"
            // this.item.appendChild(this.del)
            // this.item.appendChild(this.title)
            // this.item.appendChild(this.price)
            // this.item.appendChild(this.amount)
            //
            // this.wrap = this.wrap.appendChild(this.item)
       // })
        this.cardL.appendChild(this.wrap)
    }


    sum(){
        this.products.reduce((acc, el) => {
            const one = el.price + this.amount.value
            return acc + one
        }, 0)
    }

}
//const c = new Card()
