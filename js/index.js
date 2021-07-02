const db = firebase.firestore()
let produtos = []
let currentUser = {}

function getUser() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser.uid = user.uid
            readProdutos()
            let userLabel = document.getElementById('navbarDropdown')
            userLabel.innerText = user.email
        } else {
            swal.fire({
                icon: 'success',
                title: 'Redirecionando para a tela de autenticação',
            }).then(() => {
                setTimeout(() => {
                    window.location.replace('login.html')
                }, 1000)
            })
        }
    })
}

function createDelButton(produto) {
    const newButton = document.createElement('button')
    newButton.setAttribute('class', 'botao')
    newButton.setAttribute('id', 'red')
    newButton.appendChild(document.createTextNode('Deletar'))
    return newButton
}

function renderProdutos() {
    let itemList = document.getElementById('itemList')
    itemList.innerHTML = ''
    for (let produto of produtos) {
        const newProduto = document.createElement('li')
        newProduto.setAttribute('class', "list-group-item d-flex justify-content-between")
        newProduto.appendChild(document.createTextNode(produto.title))
        newProduto.appendChild(createDelButton())
        itemList.appendChild(newProduto)
    }
}


async function readProdutos() {
    produtos = []
    const logProdutos = await db.collection("produtos").where("owner", "==", currentUser.uid).get()
    for (doc of logProdutos.docs) {
        produtos.push({
            id: doc.id,
            title: doc.data().title,
        })
    }
    renderProdutos()
}

async function addProduto() {
    const title = document.getElementById('newItem').value
    await db.collection('produtos').add({
        title: title,
        owner: currentUser.uid,
    })
    readProdutos()
}

window.onload = function () {
    getUser()
}