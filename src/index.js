/ import constants from "./constants.js";
// import helper from "./helper.js";

// import './style.css'
// import Products from "./products";
// import Card from "./card";

const product = new Products()
//const card = new Card()

class MarketPage {
    constructor() {
        this.getData()
        this.createEl = this.createEl.bind(this)
        this.render()
        this.boughtProducts = helper.getLocalStorage()
        this.arr
        this.card = new Card(this.cardLayout)
        this.card.render()

        this.wrapper.addEventListener("click", ({ target }) => this.handelEvents(target), true)
        this.wrapper.addEventListener("re-renderProducts", ({ detail: { id } }) => {
            //console.log(id, this.wrapper.children[1].children[1].children[1])
            const deletedProductFromCard = this.wrapper.children[2].children[1].children[1].children[id-1].children[2].children[1]
            deletedProductFromCard.innerText="BUY"
            deletedProductFromCard.classList.remove("PRESSED")
        })

        this.wrapper.addEventListener("open", ({ detail: { data } }) => {
            this.portfol.classList.add("block")
            new Portfolio(this.portfol, data)})
    }



    async getData(){
        const data = await helper.getData()
        this.renderProducts(data)
        this.arr = data
    }


    createEl(el) {
        return document.createElement(el)
    }

    render() {
        this.wrapper = this.createEl("div")
        this.wrapper.classList.add("wrapper")

        this.portfol = this.createEl("div")
        this.portfol.classList.add("portfol")

        this.cardLayout = this.createEl("div")
        this.cardLayout.classList.add("cardLayout")

        this.header = this.createEl("div")
        this.header.classList.add("header")
        this.header.innerText = "SITE"
        this.card = this.createEl("button")
        this.card.classList.add("cardBtn")
        this.card.innerText = "CARD"
        this.card.setAttribute("id", "CARD")
        this.header.appendChild(this.card)
        this.content = this.createEl("div")
        this.content.classList.add("content")

        this.aside = this.createEl("div")
        this.aside.classList.add("aside")

        this.p = this.createEl("p")
        this.p.innerText = "Filters"

        this.aside.appendChild(this.p)
        this.labelSams = this.createEl("label")
        this.checkbox = this.createEl("input")
        this.checkbox.setAttribute("type", "checkbox")
        this.checkbox.setAttribute("id", "SAMSUNG")
        this.checkbox.dataset.checkB = "Sams"
        this.labelSams = this.createEl("label")
        this.labelSams.innerText = "Samsung"
        this.labelSams.appendChild(this.checkbox)
        this.labelLenovo = this.createEl("label")
        this.checkbox = this.createEl("input")
        this.checkbox.setAttribute("type", "checkbox")
        this.checkbox.setAttribute("id", "LENOVO")
        this.checkbox.dataset.checkB = "lenovo"
        this.labelLenovo = this.createEl("label")
        this.labelLenovo.innerText = "Lenovo"
        this.labelLenovo.appendChild(this.checkbox)
        this.labelAsus = this.createEl("label")
        this.checkbox = this.createEl("input")
        this.checkbox.setAttribute("type", "checkbox")
        this.checkbox.setAttribute("id", "ASUS")
        this.checkbox.dataset.checkB = "asus"
        this.labelAsus = this.createEl("label")
        this.labelAsus.innerText = "Asus"
        this.labelAsus.appendChild(this.checkbox)

        this.aside.appendChild(this.labelSams)
        this.aside.appendChild(this.labelLenovo)
        this.aside.appendChild(this.labelAsus)

        this.nav = this.createEl("div")
        this.nav.classList.add("nav")
        this.upPrice = this.createEl("button")
        this.upPrice.setAttribute("id", "upPrice")

        this.downPrice = this.createEl("button")
        this.downPrice.setAttribute("id", "downPrice")

        this.upPopul = this.createEl("button")
        this.upPopul.setAttribute("id", "upPopul")

        this.downPopul = this.createEl("button")
        this.downPopul.setAttribute("id", "downPopul")

        this.upPrice.innerText = constants.uPprice
        this.downPrice.innerText = constants.downPrice
        this.upPopul.innerText = constants.upPopul
        this.downPopul.innerText = constants.downPopul
        this.nav.appendChild(this.upPrice)
        this.nav.appendChild(this.downPrice)
        this.nav.appendChild(this.upPopul)
        this.nav.appendChild(this.downPopul)

        this.container = this.createEl("div")
        this.container.classList.add("container")
        this.container.addEventListener("click", ({ target }) => this.handelClickOnProduct( target ))
        this.content.appendChild(this.aside)
        this.main = this.createEl("div")
        this.main.classList.add("main")
        this.content.appendChild(this.main)

        this.main.appendChild(this.nav)

        this.main.appendChild(this.container)

        this.footer = this.createEl("div")
        this.footer.classList.add("footer")
        this.footer.innerText = "@copyrite"

        this.wrapper.appendChild(this.portfol)
        this.wrapper.appendChild(this.header)
        this.wrapper.appendChild(this.content)
        this.wrapper.appendChild(this.footer)
        this.wrapper.appendChild(this.cardLayout)
        document.body.appendChild(this.wrapper)
    }

    handelClickOnProduct(target){
        console.log(this.boughtProducts)
        if(target.parentNode.parentNode.getAttribute("class") === "wrapperProduct"){
            const Id = target.parentNode.parentNode.dataset.id
            const clickedProduct = this.arr.find(({id}) => {
                if(id == Id) return true
                return false
            })

            if(target.getAttribute("class") === "btn PRESSED"){
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
            this.card.render()
        }
    }
    changeButton(target){
        target.innerText = "delete"
    }

    renderProducts(arr){
        arr.forEach(el => {
            product.render(el, this.container)
        })
        return this.container
    }

    queryRequest(){
        const e = document.querySelectorAll('input.PRESSED');
        let str = "";
        for(let y of e){
            str += `title=${y.id}&`
        }
        try {
            fetch(`http://localhost:3000/products?${str}`)
                .then(data => data.json())
                .then(data => {
                    this.container.innerText = ""
                    this.currentArr = data
                    // console.log(this.currentArr)
                    this.renderProducts(data)
                })
        } catch({ message }){
            console.error(message)}
    }

    handelEvents(target){
        console.log("HANDEL EVENTS", target)
        target.classList.toggle("PRESSED")
        switch (target.id){
            case "CARD": {
                this.cardLayout.classList.toggle("block")
                if(target.getAttribute("class") === "PRESSED"){
                    console.log("OPEN")
                } else {
                    console.log("CD")
                }
                break
            }
            case "ASUS":{
                this.queryRequest()
                break
            };
            case "LENOVO": {
                this.queryRequest()
                break
            };
            case "SAMSUNG": {
                this.queryRequest()
                break
            };
            case "downPrice": {
                const sorted = this.currentArr.sort(function (a, b) {
                    return a.price - b.price;
                })
                this.container.innerText = ""
                this.renderProducts(sorted)
                break
            };
            case "upPrice": {
                const sorted = this.currentArr.sort(function (a, b) {
                    return b.price - a.price;
                })
                this.container.innerText = ""
                this.renderProducts(sorted)
                break
            };
            case "upPopul": {
                const sorted = this.currentArr.sort(function (a, b) {
                    return b.popul - a.popul;
                })
                this.container.innerText = ""
                this.renderProducts(sorted)
                break
            };
            case "downPopul": {
                const sorted = this.currentArr.sort(function (a, b) {
                    return a.popul - b.popul;
                })
                this.container.innerText = ""
                this.renderProducts(sorted)
                break
            }
        }}
}
const market = new MarketPage()


// sortedHelper(arr, a, b){
//     return arr.sort(function (a, b) {
//         return b - a.popul;
// })
// }
//

//
// function helperCheckBox(param){
//     if(target.checked){
//         console.log("TARGET CHECKED")
//         try {
//             fetch("http://localhost:3000/products?title=param")
//                 .then(data => data.json())
//                 .then(data => {
//                     console.log(data)
//                     this.container.innerText = ""
//                     this.currentArr = data
//                     console.log(this.currentArr)
//                     this.renderProducts(data)
//                 })
//
//
//         } catch({ message }){
//             console.error(message)}
//     } else {
//         this.renderProducts(this.arr)
//     }
// }

// case "asus":{
//               //  target.classList.toggle("PRESSED")
//                 if(target.checked){
//                     try {
//                         fetch("http://localhost:3000/products?title=ASUS")
//                             .then(data => data.json())
//                             .then(data => {
//                                 console.log(data)
//                                 this.container.innerText = ""
//                                 this.currentArr = data
//                                 console.log(this.currentArr)
//                                 this.renderProducts(data)
//                             })
//
//
//                     } catch({ message }){
//                         console.error(message)}
//                 } else {
//                     this.renderProducts(this.arr)
//                 }
//
//                 break
//             };




















// async getData() {
//     try {
//         await fetch("http://localhost:3000/products", {
//             method: 'GET',
//             mode: 'cors',
//             cache: 'default'
//         })
//             .then(data => {
//                 if (data.status === 200) {
//                     return data.json()
//                 }
//             })
//             .then(data => {
//                 this.arr = data
//                 this.renderProducts(data)
//             })

//     } catch ({message}) {
//         console.log(message)
//     }
// }

// // import constants from "./constants.js";
// // import helper from "./helper.js";
//
// // import './style.css'
// // import Products from "./products";
// // import Card from "./card";
//
// const product = new Products()
// //const card = new Card()
//
// class MarketPage {
//     constructor() {
//         this.getData()
//         this.createEl = this.createEl.bind(this)
//         this.render()
//         this.boughtProducts = helper.getLocalStorage()
//         this.arr
//         this.card = new Card(this.cardLayout)
//         this.card.render()
//
//         this.wrapper.addEventListener("click", ({ target }) => this.handelEvents(target), true)
//         this.wrapper.addEventListener("re-renderProducts", ({ detail: { id } }) => {
//             //console.log(id, this.wrapper.children[1].children[1].children[1])
//             const deletedProductFromCard = this.wrapper.children[2].children[1].children[1].children[id-1].children[2].children[1]
//             deletedProductFromCard.innerText="BUY"
//             deletedProductFromCard.classList.remove("PRESSED")
//         })
//
//         this.wrapper.addEventListener("open", ({ detail: { data } }) => {
//         this.portfol.classList.add("block")
//         new Portfolio(this.portfol, data)})
//     }
//
//
//
//     async getData(){
//         const data = await helper.getData()
//             this.renderProducts(data)
//             this.arr = data
//     }
//
//
//     createEl(el) {
//         return document.createElement(el)
//     }
//
//     render() {
//         this.wrapper = this.createEl("div")
//         this.wrapper.classList.add("wrapper")
//
//         this.portfol = this.createEl("div")
//         this.portfol.classList.add("portfol")
//
//         this.cardLayout = this.createEl("div")
//         this.cardLayout.classList.add("cardLayout")
//
//         this.header = this.createEl("div")
//         this.header.classList.add("header")
//         this.header.innerText = "SITE"
//         this.card = this.createEl("button")
//         this.card.classList.add("cardBtn")
//         this.card.innerText = "CARD"
//         this.card.setAttribute("id", "CARD")
//         this.header.appendChild(this.card)
//         this.content = this.createEl("div")
//         this.content.classList.add("content")
//
//         this.aside = this.createEl("div")
//         this.aside.classList.add("aside")
//
//         this.p = this.createEl("p")
//         this.p.innerText = "Filters"
//
//         this.aside.appendChild(this.p)
//         this.labelSams = this.createEl("label")
//         this.checkbox = this.createEl("input")
//         this.checkbox.setAttribute("type", "checkbox")
//         this.checkbox.setAttribute("id", "SAMSUNG")
//         this.checkbox.dataset.checkB = "Sams"
//         this.labelSams = this.createEl("label")
//         this.labelSams.innerText = "Samsung"
//         this.labelSams.appendChild(this.checkbox)
//         this.labelLenovo = this.createEl("label")
//         this.checkbox = this.createEl("input")
//         this.checkbox.setAttribute("type", "checkbox")
//         this.checkbox.setAttribute("id", "LENOVO")
//         this.checkbox.dataset.checkB = "lenovo"
//         this.labelLenovo = this.createEl("label")
//         this.labelLenovo.innerText = "Lenovo"
//         this.labelLenovo.appendChild(this.checkbox)
//         this.labelAsus = this.createEl("label")
//         this.checkbox = this.createEl("input")
//         this.checkbox.setAttribute("type", "checkbox")
//         this.checkbox.setAttribute("id", "ASUS")
//         this.checkbox.dataset.checkB = "asus"
//         this.labelAsus = this.createEl("label")
//         this.labelAsus.innerText = "Asus"
//         this.labelAsus.appendChild(this.checkbox)
//
//         this.aside.appendChild(this.labelSams)
//         this.aside.appendChild(this.labelLenovo)
//         this.aside.appendChild(this.labelAsus)
//
//         this.nav = this.createEl("div")
//         this.nav.classList.add("nav")
//         this.upPrice = this.createEl("button")
//         this.upPrice.setAttribute("id", "upPrice")
//
//         this.downPrice = this.createEl("button")
//         this.downPrice.setAttribute("id", "downPrice")
//
//         this.upPopul = this.createEl("button")
//         this.upPopul.setAttribute("id", "upPopul")
//
//         this.downPopul = this.createEl("button")
//         this.downPopul.setAttribute("id", "downPopul")
//
//         this.upPrice.innerText = constants.uPprice
//         this.downPrice.innerText = constants.downPrice
//         this.upPopul.innerText = constants.upPopul
//         this.downPopul.innerText = constants.downPopul
//         this.nav.appendChild(this.upPrice)
//         this.nav.appendChild(this.downPrice)
//         this.nav.appendChild(this.upPopul)
//         this.nav.appendChild(this.downPopul)
//
//         this.container = this.createEl("div")
//         this.container.classList.add("container")
//         this.container.addEventListener("click", ({ target }) => this.handelClickOnProduct( target ))
//         this.content.appendChild(this.aside)
//         this.main = this.createEl("div")
//         this.main.classList.add("main")
//         this.content.appendChild(this.main)
//
//         this.main.appendChild(this.nav)
//
//         this.main.appendChild(this.container)
//
//         this.footer = this.createEl("div")
//         this.footer.classList.add("footer")
//         this.footer.innerText = "@copyrite"
//
//         this.wrapper.appendChild(this.portfol)
//         this.wrapper.appendChild(this.header)
//         this.wrapper.appendChild(this.content)
//         this.wrapper.appendChild(this.footer)
//         this.wrapper.appendChild(this.cardLayout)
//         document.body.appendChild(this.wrapper)
//     }
//
//     handelClickOnProduct(target){
//         console.log(this.boughtProducts)
//         if(target.parentNode.parentNode.getAttribute("class") === "wrapperProduct"){
//             const Id = target.parentNode.parentNode.dataset.id
//             const clickedProduct = this.arr.find(({id}) => {
//                 if(id == Id) return true
//                 return false
//             })
//
//             if(target.getAttribute("class") === "btn PRESSED"){
//                 console.log("true", target.getAttribute("class"))
//                 target.innerText = "DELETE"
//                 this.boughtProducts =  this.boughtProducts.concat(clickedProduct)
//             } else {
//                 console.log("false", target.getAttribute("class"))
//                 target.innerText = "BUY"
//                 this.boughtProducts =  this.boughtProducts.filter(el => {
//                     return el.id != clickedProduct.id
//                 })
//                 console.log(this.boughtProducts)
//             }
//
//             console.log(this.boughtProducts)
//             helper.setLocalStorage(this.boughtProducts)
//             this.card.render()
//           }
//     }
//     changeButton(target){
//         target.innerText = "delete"
//     }
//
//     renderProducts(arr){
//         arr.forEach(el => {
//             product.render(el, this.container)
//         })
//         return this.container
//     }
//
//     queryRequest(){
//         const e = document.querySelectorAll('input.PRESSED');
//         let str = "";
//         for(let y of e){
//             str += `title=${y.id}&`
//         }
//         try {
//             fetch(`http://localhost:3000/products?${str}`)
//             .then(data => data.json())
//             .then(data => {
//                 this.container.innerText = ""
//                     this.currentArr = data
//                     // console.log(this.currentArr)
//                     this.renderProducts(data)
//                 })
//             } catch({ message }){
//             console.error(message)}
//         }
//
//         handelEvents(target){
//         console.log("HANDEL EVENTS", target)
//         target.classList.toggle("PRESSED")
//         switch (target.id){
//             case "CARD": {
//                 this.cardLayout.classList.toggle("block")
//                 if(target.getAttribute("class") === "PRESSED"){
//                     console.log("OPEN")
//                 } else {
//                     console.log("CD")
//                 }
//                 break
//             }
//             case "ASUS":{
//                 this.queryRequest()
//                 break
//             };
//             case "LENOVO": {
//                  this.queryRequest()
//                  break
//             };
//             case "SAMSUNG": {
//                 this.queryRequest()
//                 break
//             };
//             case "downPrice": {
//                 const sorted = this.currentArr.sort(function (a, b) {
//                     return a.price - b.price;
//                 })
//                 this.container.innerText = ""
//                 this.renderProducts(sorted)
//                 break
//             };
//             case "upPrice": {
//                 const sorted = this.currentArr.sort(function (a, b) {
//                     return b.price - a.price;
//                 })
//                 this.container.innerText = ""
//                 this.renderProducts(sorted)
//                 break
//             };
//             case "upPopul": {
//                 const sorted = this.currentArr.sort(function (a, b) {
//                     return b.popul - a.popul;
//                 })
//                 this.container.innerText = ""
//                 this.renderProducts(sorted)
//                 break
//             };
//             case "downPopul": {
//                 const sorted = this.currentArr.sort(function (a, b) {
//                     return a.popul - b.popul;
//                 })
//                 this.container.innerText = ""
//                 this.renderProducts(sorted)
//                 break
//             }
//         }}
// }
// const market = new MarketPage()
//
//
// // sortedHelper(arr, a, b){
// //     return arr.sort(function (a, b) {
//     //         return b - a.popul;
//     // })
// // }
// //
//
// //
// // function helperCheckBox(param){
// //     if(target.checked){
//     //         console.log("TARGET CHECKED")
// //         try {
//     //             fetch("http://localhost:3000/products?title=param")
// //                 .then(data => data.json())
// //                 .then(data => {
// //                     console.log(data)
// //                     this.container.innerText = ""
// //                     this.currentArr = data
// //                     console.log(this.currentArr)
// //                     this.renderProducts(data)
// //                 })
// //
// //
// //         } catch({ message }){
//     //             console.error(message)}
// //     } else {
// //         this.renderProducts(this.arr)
// //     }
// // }
//
// // case "asus":{
// //               //  target.classList.toggle("PRESSED")
// //                 if(target.checked){
//     //                     try {
// //                         fetch("http://localhost:3000/products?title=ASUS")
// //                             .then(data => data.json())
// //                             .then(data => {
// //                                 console.log(data)
// //                                 this.container.innerText = ""
// //                                 this.currentArr = data
// //                                 console.log(this.currentArr)
// //                                 this.renderProducts(data)
// //                             })
// //
// //
// //                     } catch({ message }){
//     //                         console.error(message)}
// //                 } else {
// //                     this.renderProducts(this.arr)
// //                 }
// //
// //                 break
// //             };
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // async getData() {
// //     try {
// //         await fetch("http://localhost:3000/products", {
// //             method: 'GET',
// //             mode: 'cors',
// //             cache: 'default'
// //         })
// //             .then(data => {
// //                 if (data.status === 200) {
// //                     return data.json()
// //                 }
// //             })
// //             .then(data => {
// //                 this.arr = data
// //                 this.renderProducts(data)
// //             })
//
// //     } catch ({message}) {
// //         console.log(message)
// //     }
// // }
//
