
function login() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut()
    }
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Login realizado com sucesso, redirecionando para a página principal',
        }).then(() => {
            setTimeout(() => {
                window.location.replace('index.html')
            }, 1000)
        })
    })
        .catch((error) => {
            const erroCode = error.code
            switch (erroCode) {
                case "auth/wrong-password":
                    swal.fire({
                        icon: 'error',
                        title: 'Senha não encontrada para o E-mail inserido',
                    })
                    break
                case "auth/invalid-email":
                    swal.fire({
                        icon: 'error',
                        title: 'E-mail não encontrado ou inválido'
                    })
                case "auth/user-not-found":
                    swal.fire({
                        icon: 'warning',
                        title: 'Este cadastro não existe',
                        text: 'Deseja criar um usário vinculado a este E-mail?',
                        showCancelButton: true,
                        cancelButtonText: 'Não',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sim',
                        confirmButtonColor: '#3085d6',
                    }).then((result) => {
                        if (result.value) {
                            signUp(email, password)
                        }
                    })
            }
        })
}

function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        swal.fire({
            icon: 'success',
            title: 'Cadastro feito com sucesso, redirecionando para a página principal',
        }).then(() => {
            setTimeout(() => {
                window.location.replace('index.html')
            }, 1000)
        })
        switch (errorCode) {
            case "auth/weak-passowrd":
                swal.fire({
                    icon: 'error',
                    title: 'Senha muito fraca',
                })
                break
            default:
                swal.fire({
                    icon: 'error',
                    title: error.message,
                })
        }
    })
}

function logOut() {
    firebase.auth().signOut()
}