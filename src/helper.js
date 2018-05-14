function getLocalStorage(){
    try{
        let data = localStorage.getItem("product")
        let parsedData = data && JSON.parse(data) || []
        return parsedData
    } catch({ message }){
        console.error(message)
    }
}

function setLocalStorage(arr){
    try{
        localStorage.setItem("product", JSON.stringify(arr))
    } catch({ message }){
        console.error(message)
    }
}


async function getData(id = "") {
    try {
        const data = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        })
        if (data.status === 200) {
            console.log(data)
            return data.json()
        }
    } catch ({message}) {
        console.log(message)
    }
}

async function handelPagination(){
    try {
        const data = await fetch("http://localhost:3000/products?_page=10&_limit=18", {
            method: 'GET',
            //  mode: 'cors',
            //  cache: 'default'
        })
        console.log(data)
        if (data.status === 200) {
            return data.json()
        }
    } catch ({message}) {
        console.log(message)
    }
}

async function getByParam(str, sort, order){
    console.log(sort)
    try {
        const data = await fetch(`http://localhost:3000/products?_sort=${sort}&_order=${order}&${str}`, {
            method: 'GET'
        })
        console.log(data)
        if (data.status === 200) {
            return data.json()
        }
    } catch({ message }){
        console.error(message)
    }
}



const helper = {
    getLocalStorage,
    setLocalStorage,
    getData,
    handelPagination,
    getByParam
}