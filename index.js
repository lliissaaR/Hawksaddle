
import express from 'express'  // npm install express
import ejs from 'ejs' // npm install ejs
import bodyParser from 'body-parser'
import mysql from 'mysql2'
import session from 'express-session'



const app = express()  //initialisation de l'application express

const connexion = mysql.createConnection({  //on cré une connexion à la base de données
    host:"localhost",
    user:"root",
    password:"",
    database:"mydatabase"

})


function ProduitDansPanier(panier, id) {
    for (let index = 0; index < panier.length; index++) {
        if (panier[index].id === id) {
            return true
        }
    }

    return false
}

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public')) // l'application utilise le dossier public par defaut sans avoir a specifier le chemin

app.use(session({secret:"secret"}))

app.set('view engine', 'ejs') // va dire a expres de set le view engine avec ejs


app.get('/', function(httpRequest, httpResponse) {  //création d'une route avec la methode http Get donc le chemin est '/'
       
    httpResponse.render('pages/index') //envoie de la reponse http, .render fonctionne que si on a fait le app.set('view engine', 'ejs'), render va aller chercher automatiquement dans le dossier views
})


app.listen('3030') // aller sur http://127.0.0.1:3030 et le message se log


//redirection des données des tables mysql sur les pages en question

app.get('/Brides', function(httpRequest, httpResponse) {
   
    connexion.query("SELECT * FROM produits WHERE categorie='Brides'",(err, result) => {
        console.log(result)
        httpResponse.render('pages/Brides', {produits:result})
})
})

app.get('/Contact', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/Contact')
})

app.get('/Fauconnerie', function(httpRequest, httpResponse) {
   
    connexion.query("SELECT * FROM produits WHERE categorie = 'Fauconnerie'",(err, result) => {
        
        httpResponse.render('pages/Fauconnerie', {produits:result})
})
})

app.get('/Selles', function(httpRequest, httpResponse) {
   
    connexion.query("SELECT * FROM produits WHERE categorie = 'Selles'",(err, result) => {
        
        httpResponse.render('pages/Selles', {produits:result})
    })
})

app.get('/Panier', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/Panier')
})

app.get('/Accessoires_equestres', function(httpRequest, httpResponse) {
   
    connexion.query("SELECT * FROM `produits` WHERE `categorie` = 'Accessoires_equestres'", (err, result) => {
        
        httpResponse.render('pages/Accessoires_equestres', {produits:result})
})
})

app.get('/collier_chasse1', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail_accessoires/collier_chasse1')
})

app.get('/collier_chasse2', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail_accessoires/collier_chasse2')
})

app.get('/lasso', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail_accessoires/lasso')
})

app.get('/tapis_rando', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail_accessoires/tapis_rando')
})

app.get('/tapis', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail_accessoires/tapis')
})

app.get('/selle_barrel', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail selles/selle_barrel')
})

app.get('/selle_cutting', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail selles/selle_cutting')
})

app.get('/selle_pleasure', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail selles/selle_pleasure')
})

app.get('/selle_reining', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail selles/selle_reining')
})

app.get('/selle_show', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail selles/selle_show')
})

app.get('/chaperon', function(httpRequest, httpResponse) {
   
    connexion.query("SELECT * FROM produits",(err, result) => {
        
        httpResponse.render('pages/pages_produit/détail fauconnerie/chaperon', {produits:result})
    })
})

app.get('/gant_aigle', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail fauconnerie/gant_aigle')
})

app.get('/gant_buse', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail fauconnerie/gant_buse')
})

app.get('/gant_faucon', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail fauconnerie/gant_faucon')
})

app.get('/jets', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail fauconnerie/jets')
})

app.get('/leurre', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail fauconnerie/leurre')
})

app.get('/sacoches', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail fauconnerie/sacoches')
})

app.get('/bride_simple', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail brides/bride_simple')
})

app.get('/bride_sous_gorge', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail brides/bride_sous_gorge')
})

app.get('/bridon_show', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail brides/bridon_show')
})

app.get('/hackamors', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail brides/hackamors')
})

app.get('/sidepull', function(httpRequest, httpResponse) {
   
    httpResponse.render('pages/pages_produit/détail brides/sidepull')
})

// pour l'instant je sais pas a quoi ca sert

app.post('/ajouter_au_panier', function(httpRequest, httpResponse) {
    console.log('httpRequest after ajouter au panier: ', httpRequest.body)
    let id = httpRequest.body.id
    let name = httpRequest.body.name
    let price = httpRequest.body.price
    let image = httpRequest.body.image
    let product = {id:id, name:name, price:price, image:image}

    if (httpRequest.session.anier){
        const panier = httpRequest.session.panier
        
        if (!ProduitDansPanier(cart, id)) {
            panier.push(produit)
        } 
    
    else {
        httpRequest.session.panier = [produit]
        const panier = httpRequest.session.panier
    }
    }

    httpResponse.render('pages/Panier', {Panier:fakePanier, total:total})

})


