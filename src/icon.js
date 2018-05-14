class Icon{
    constructor(){
    }

    createEl(elNode){
        return document.createElement(elNode)
    }

    render(data, icon){
        console.log(data)
        if(this.wrapper){
            this.wrapper.innerHTML = ""
        } else {
            this.wrapper = this.createEl("div")
        }
        this.wrapper.classList.add("wrapperItem")
        this.img = new Image()
        this.img.classList.add("imgItem")
        this.img.src = data.url
        this.title = this.createEl("div")
        this.title.classList.add("titleItem")
        this.title.innerText = data.title

        this.price = this.createEl("div")
        this.price.innerText = ` ${data.price} $`

        this.desc = this.createEl("div")
        this.desc.classList.add("descItem")
        this.desc.innerText = data.desc


        this.wrapper.appendChild(this.img)
        this.wrapper.appendChild(this.title)
        this.wrapper.appendChild(this.desc)
        this.wrapper.appendChild(this.price)

        icon.appendChild(this.wrapper)

    }
}
