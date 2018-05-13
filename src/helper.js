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

// async function getById(id){
//     try{

//     } catch({ message }){
//         console.log(message)
//     }
// }

async function getData(id = "") {
    try {
        const data = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'GET',
             mode: 'cors',
             cache: 'default'
        })
        if (data.status === 200) {
            return data.json()
        } 
    } catch ({message}) {
        console.log(message)
    }
}



const helper = {
    getLocalStorage,
    setLocalStorage,
    getData
}