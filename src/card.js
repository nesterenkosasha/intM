// export default 
class Card{
    constructor(){
       this.arr 
    }

    
    createEl(el) {
        return document.createElement(el)
    }

    handelRemoveClick(Id){
        this.updatedProducts = this.boughtProducts.filter(({id}) => Id !== id)
        helper.setLocalStorage(this.updatedProducts)
        this.render()
        console.log("MOUNT", this.mountPlace.parentNode)
        container.dispatchEvent( new CustomEvent("re-renderProducts", {
            detail: {
                id: Id
            }
        }) )
    }
    
    render(){
        this.boughtProducts = helper.getLocalStorage();
        if(!this.wrap){
            this.wrap = this.createEl("div");
            this.wrap.classList.add("cardWrap")

        }
        this.wrap.innerHTML = ""        
        this.boughtProducts.forEach(el => {
        this.item = this.createEl("div")
        this.item.classList.add("itemInCard")
        this.item.addEventListener("click", async() => { 
            const data = await helper.getData(el.id)
            console.log(data)
            container.dispatchEvent( new CustomEvent("open", {
                detail: {
                    data
                }
            }) )
        })
            
            this.del = this.createEl("button")
            this.del.addEventListener("click", () => {
                this.handelRemoveClick(el.id)

              // target.parentNode.remove()
              //  this.removeItem(el.id)
            })
            this.del.innerText = "x"
            
            this.title = this.createEl("div")
            this.title.innerText = el.title
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
        console.log(container)
        container.appendChild(this.wrap)
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


    //const c = new Card()
    // addProductToCard(el){
        //     this.products[el.id] = el;
        //     this.setItem();
        //     // console.log("this.products", this.products)
        //     this.render()
        // }
        // removeItem(id){
            //     this.products = this.products.filter(el => el.id != id)
            //     this.setItem()
            //     this.render()
            // }



            
            // for(let r in this.products){
            //     console.log("product", this.products[r])
            //     this.item = this.createEl("div")
            //     this.item.classList.add("itemInCard")
    
            //     this.del = this.createEl("button")
            //     this.del.addEventListener("click", ({ target }) => {
            //         console.log(";;;;", target.parentNode)
            //         target.parentNode.remove()
            //         this.removeItem(this.products[r].id)
            //     })
            //     this.del.innerText = "x"
                
            //     this.title = this.createEl("div")
            //     this.title.innerText = this.products[r].title
            //     this.price = this.createEl("div")
            //     this.price.innerText = this.products[r].price
            //     this.amount = this.createEl("input")
            //     this.amount.type = "number"
            //     this.item.appendChild(this.del)
            //     this.item.appendChild(this.title)
            //     this.item.appendChild(this.price)
            //     this.item.appendChild(this.amount)
                