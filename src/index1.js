
class MarketPage {
    constructor() {
        this.getData()
        this.createEl = this.createEl.bind(this)
        this.boughtProducts = helper.getLocalStorage()
        this.arr
        this.icon = new Icon()
        this.product = new Product()
        this.card = new Card()
        CARD.addEventListener("click", () => {
            CARD.nextElementSibling.classList.toggle("block")
            this.card.render(CARD.nextElementSibling)
        })
        container.addEventListener("toIcon", ({ detail: {id} }) => this.handelToIconClick(id))
        aside.addEventListener("click", ({ target }) => this.handelSortFilt(target))
        forSort.addEventListener("click", ({ target }) => this.handelSortFilt(target))
        pagination.addEventListener("click", ({ target }) => this.handelPagination(target))
        container.addEventListener("click", ({ target }) => this.handelClickOnProduct(target))
        container.addEventListener("re-renderProducts", ({ detail: { id } }) => {
            const deletedProductFromCard = container.children[id-1].children[2].children[1]
            if(deletedProductFromCard.tagName == "BUTTON"){
                deletedProductFromCard.innerText="BUY"
                deletedProductFromCard.classList.remove("PRESSED")
            }
        })
    }

    async handelToIconClick(id){
        console.log("id", id)
        icon.classList.toggle("block")
        const data = await helper.getData(id)
        console.log("4444", data)
        this.icon.render(data, icon)
    }


    async getData(){
        const data = await helper.getData()
        this.renderProducts(data)
        this.arr = data
    }

    async handelPagination(target){
        const data = await helper.handelPagination(target.id)
        console.log(data, target.id)
        this.renderProducts(data)

    }

    async handelSortFilt(target){
        target.classList.toggle("active")
        const actInputs = aside.querySelectorAll("input.active")
        this.sort;
        this.order;
        if(target.tagName.toLowerCase() == "button"){
            switch(target.id){
                case "highPrice": {
                    console.log(1111)
                    this.sort = "price";
                    this.order = "asc"
                    break
                }
                case "lowPrice": {
                    this.sort = "price";
                    this.order = "desc"
                    break
                }
                case "morePopul": {
                    this.sort = "popul";
                    this.order = "asc"
                    break
                }
                case "lessPopul": {
                    this.sort = "popul";
                    this.order = "desc"
                    break
                }}
        }
        let str = "";
        for(let y of actInputs){
            str += `title=${y.id}&`
        }
        const data = await helper.getByParam(str, this.sort, this.order)
        this.renderProducts(data)
    }


    createEl(el) {
        return document.createElement(el)
    }


    handelClickOnProduct(target){
        target.classList.toggle("active")
        console.log(this.boughtProducts, target.parentNode.parentNode)
        if(target.parentNode.parentNode.getAttribute("class") === "wrapperProduct"){
            const Id = target.parentNode.parentNode.id
            const clickedProduct = this.arr.find(({id}) => {
                if(id == Id) return true
                return false
            })

            if(target.getAttribute("class") === "btn active"){
                console.log("true", target.getAttribute("class"))
                target.innerText = "DELETE"
                this.boughtProducts =  this.boughtProducts.concat(clickedProduct)
            } else {
                console.log("false", target.getAttribute("class"))
                target.innerText = "BUY"
                this.boughtProducts =  this.boughtProducts.filter(el => {
                    return el.id != clickedProduct.id
                })
                console.log(this.boughtProducts)
            }

            console.log(this.boughtProducts)
            helper.setLocalStorage(this.boughtProducts)
            this.card.render(CARD.nextElementSibling)
        }
    }
    changeButton(target){
        target.innerText = "delete"
    }

    renderProducts(arr){
        container.innerHTML = ""
        arr.slice(0, 9).forEach(el => {
           this.product.render(el, container)
        })
    }
}

const market = new MarketPage()








