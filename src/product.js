class Product{
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
        this.wrapperProduct.classList.add("wrapperProduct")
        this.wrapperProduct.addEventListener("click", ({ target }) => {
            if(target.tagName !== "BUTTON"){
                container.dispatchEvent(new CustomEvent("toIcon", {
                    detail: {
                        id: el.id
                    }
                }))
            }
        })
        this.img = new Image()
        this.img.src = el.url
        this.info = this.createEl("div")
        this.info.classList.add("info")
        this.title = this.createEl("div")
        this.title.innerText = `Product:  ${el.title}`
        this.span = this.createEl("span")
        this.span.innerText = `Price: ${el.price} $`
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
    }
}