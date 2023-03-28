

import express from 'express' 

//initialisation de l'application express

const app = express()

//création d'une route avec la methode http Get donc le chemin est '/'

app.get('/', function(httpRequest, httpResponse) {
    //log de la requete entrante
    console.log('objet request: ',httpRequest)
    //envoie de la reponse http
    httpResponse.send('Wsh le sang')
})


app.listen('3003') // aller sur http://127.0.0.1:3003 et le message se log

