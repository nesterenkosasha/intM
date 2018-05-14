class Card{
    constructor(){
        this.arr
        this.place
    }


    createEl(el) {
        return document.createElement(el)
    }

    handelRemoveClick(Id){
        this.updatedProducts = this.boughtProducts.filter(({id}) => Id !== id)
        helper.setLocalStorage(this.updatedProducts)
        this.render(this.place)
        console.log("RERENDER")
        container.dispatchEvent( new CustomEvent("re-renderProducts", {
            detail: {
                id: Id
            }
        }) )
    }

    render(place){
        this.place = place
        console.log("PLACE", place)
        this.boughtProducts = helper.getLocalStorage();
        if(!this.wrap){
            this.wrap = this.createEl("div");
        }
        this.wrap.innerHTML = ""
        this.boughtProducts.forEach(el => {
            this.item = this.createEl("div")
            this.item.classList.add("itemInCard")
            this.del = this.createEl("button")
            this.del.addEventListener("click", () => {
                this.handelRemoveClick(el.id)
            })
            this.del.innerText = "x"

            this.title = this.createEl("div")
            this.title.innerText = el.title
            this.title.addEventListener("click", () => {
                    container.dispatchEvent( new CustomEvent("toIcon", {
                        detail: {
                            id: el.id
                        }
                    }) )
            })
            this.price = this.createEl("div")
            this.price.innerText = el.price
            this.amount = this.createEl("input")
            this.amount.value = 1
            this.amount.type = "number"
            //this.sum(arr)
            this.amount.addEventListener("input", (e) => {
                this.changeValue(el.id, e.target.value)
                //  this.sum(arr, )
            })
            this.item.appendChild(this.del)
            this.item.appendChild(this.title)
            this.item.appendChild(this.price)
            this.item.appendChild(this.amount)

            this.wrap.appendChild(this.item)
        })
        this.sumPlace = this.createEl("div")
        this.val = this.sum()
        this.renderSum(this.val)

        this.wrap.appendChild(this.sumPlace)
        console.log(this.wrap)
        place.appendChild(this.wrap)
    }
    renderSum(val){
        this.sumPlace.innerText = `To pay: ${val} $`
    }

    sum(){
        this.boughtProducts = helper.getLocalStorage();
        this.arr = this.boughtProducts.map(el => {
            return {
                id: el.id,
                price: el.price,
                value: this.amount.value
            }
        })
        return this.countSum(this.arr)
    }

    changeValue(ID, value){
        if(ID && value){
            this.arr = this.arr.map(el => {
                if(el.id === ID){
                    return {
                        id: el.id,
                        price: el.price,
                        value
                    }
                } else {
                    return el
                }
            })
            this.renderSum(this.countSum(this.arr))
        }
    }

    countSum(arr){
        return arr.reduce((acc, el) => {
            return acc + (el.price * el.value)
        }, 0)
    }
}








