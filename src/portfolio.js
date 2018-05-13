class Portfolio{
    constructor(place, el){
        this.place = place
        this.el = el
        this.render()
    }

    createEl(elNode){
        return document.createElement(elNode)
    }

    render(){
        console.log(this.el)
        this.wrapper = this.createEl("div")
        this.wrapper.classList.add("wrapperItem")
        this.img = new Image()
        this.img.classList.add("imgItem")
        this.img.src = this.el.url
            //------------------------
        this.title = this.createEl("div")
        this.title.classList.add("titleItem")
        this.title.innerText = this.el.title
    
            //----------
        this.price = this.createEl("div")
        this.price.innerText = ` ${this.el.price} $`

        this.desc = this.createEl("div")
        this.desc.classList.add("descItem")
        this.desc.innerText = this.el.desc

    
        this.wrapper.appendChild(this.img)
        this.wrapper.appendChild(this.title)
        this.wrapper.appendChild(this.desc)
        this.wrapper.appendChild(this.price)

            this.place.appendChild(this.wrapper)
    
    }
}