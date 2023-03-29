
import express from 'express'  // npm install express
import ejs from 'ejs' // npm install ejs
import bodyParser from 'body-parser'
import mysql from 'mysql2'



const app = express()  //initialisation de l'application express

const connexion = mysql.createConnection({  //on cré une connexion à la base de données
    host:"localhost",
    user:"root",
    password:"",
    database:"mydatabase"

})

connexion.query("SELECT * FROM produits", )

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public')) // l'application utilise le dossier public par defaut sans avoir a specifier le chemin

app.set('view engine', 'ejs') // va dire a expres de set le view engine avec ejs


app.get('/', function(httpRequest, httpResponse) {  //création d'une route avec la methode http Get donc le chemin est '/'
    
    console.log('objet request: ',httpRequest)  //log de la requete entrante dans la console
   
    
    httpResponse.render('pages/index') //envoie de la reponse http, .render fonctionne que si on a fait le app.set('view engine', 'ejs'), render va aller chercher automatiquement dans le dossier views
})


app.listen('3030') // aller sur http://127.0.0.1:3030 et le message se log



app.get('/Accessoires_equestres', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/Accessoires_equestres')
})

app.get('/Brides', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/Brides')
})

app.get('/Contact', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/Contact')
})

app.get('/Fauconnerie', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/Fauconnerie')
})

app.get('/Selles', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/Selles')
})

app.get('/Panier', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/Panier')
})

app.get('/Accessoires_equestres', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/Accessoires_equestres')
})

app.get('/collier_chasse1', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail_accessoires/collier_chasse1')
})
