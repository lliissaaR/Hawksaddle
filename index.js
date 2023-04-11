
import express from 'express'  // npm install express
import ejs from 'ejs' // npm install ejs
import bodyParser from 'body-parser'
import mysql from 'mysql2'
import session from 'express-session'



const app = express()  //initialisation de l'application express

const connexion = mysql.createConnection({  //on crée une connexion à la base de données
    host:"localhost",
    user:"root",
    password:"",
    database:"mydatabase"

})



app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public')) // l'application utilise le dossier public par defaut sans avoir a specifier le chemin

app.use(session({
    secret:"secret",
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'ejs') // va dire a expres de set le view engine avec ejs


app.get('/', function(httpRequest, httpResponse) {  //création d'une route avec la methode http Get donc le chemin est '/'
       
    httpResponse.render('pages/index') //envoie de la reponse http, .render fonctionne que si on a fait le app.set('view engine', 'ejs'), render va aller chercher automatiquement dans le dossier views
})


app.listen('3030') // dit a l'app d'écouter sur le port 3030 http://127.0.0.1:3030


//redirection des données des tables mysql sur les pages en question

app.get('/Brides', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM produits WHERE categorie='Brides'",(err, result) => {
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
   
    let panier = httpRequest.session.panier

    let [total, realtotal, charges] = calculateTotal(panier,httpRequest)
    httpResponse.render('pages/Panier', {panier:panier, total:total, realtotal:realtotal, charges:charges})
    
})

app.get('/Accessoires_equestres', function(httpRequest, httpResponse) { 
    connexion.query("SELECT * FROM `produits` WHERE `categorie` = 'Accessoires_equestres'", (err, result) => {
    httpResponse.render('pages/Accessoires_equestres', {produits:result})
})
})

app.get('/collier_chasse1', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `id` = '11'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail_accessoires/collier_chasse1', {produits:result})
})
})


app.get('/collier_chasse2', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `id` = '12'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail_accessoires/collier_chasse2', {produits:result})
})
})

app.get('/lasso', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name`= 'Lasso'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail_accessoires/lasso', {produits:result})
})
})

app.get('/tapis_rando', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Tapis de Rando'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail_accessoires/tapis_rando', {produits:result})
})
})
app.get('/tapis', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Tapis'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail_accessoires/tapis', {produits:result})
})
})
app.get('/selle_barrel', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Selle de Barrel'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail selles/selle_barrel', {produits:result})
})
})

app.get('/selle_cutting', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Selle de Cutting'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail selles/selle_cutting', {produits:result})
})
})

app.get('/selle_pleasure', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Selle de Pleasure'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail selles/selle_pleasure', {produits:result})
})
})

app.get('/selle_reining', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Selle de Reining'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail selles/selle_reining', {produits:result})
})
})

app.get('/selle_show', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Selle de Show'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail selles/selle_show', {produits:result})
})
})

app.get('/chaperon', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM produits WHERE name = 'Chaperon'",(err, result) => {
        httpResponse.render('pages/pages_produit/détail fauconnerie/chaperon', {produits:result})
        
    })    
})

app.get('/gant_aigle', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM produits WHERE name = 'Gant Taille Aigle'", (err, result) => {
        httpResponse.render('pages/pages_produit/détail fauconnerie/gant_aigle', {produits:result})
    })
})

app.get('/gant_buse', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Gant Taille Buse'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail fauconnerie/gant_buse', {produits:result})
})
})

app.get('/gant_faucon', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Gant Taille Faucon'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail fauconnerie/gant_faucon', {produits:result})
})
})

app.get('/jets', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Jets en Cuir'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail fauconnerie/jets', {produits:result})
})
})

app.get('/leurre', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Leurre'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail fauconnerie/leurre', {produits:result})
})
})

app.get('/sacoches', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Sacoches'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail fauconnerie/sacoches', {produits:result})
})
})

app.get('/bride_simple', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Bride Simple'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail brides/bride_simple', {produits:result})
})
})

app.get('/bride_sous_gorge', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Bride avec Sous Gorge'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail brides/bride_sous_gorge', {produits:result})
})
})

app.get('/bridon_show', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Bridon de Show'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail brides/bridon_show', {produits:result})
})
})

app.get('/hackamors', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Hackamors'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail brides/hackamors', {produits:result})
})
})

app.get('/sidepull', function(httpRequest, httpResponse) {
    connexion.query("SELECT * FROM `produits` WHERE `name` = 'Sidepull'", (err, result) => {
    httpResponse.render('pages/pages_produit/détail brides/sidepull', {produits:result})
})
})

// ajout produit au panier


function ProduitDansPanier(panier, id) {                        //checker si un produit est dans le panier
    for (let index = 0; index < panier.length; index++) {       // en parcourant le tableau créé précédement
        if (panier[index].id === id) {                           // si l'id match, (true) alors le produit est dans le panier
            return true
        }
    }

    return false                                     // return false si le produit n'es pas dans le panier
}

let panier = []
let total = 0;
let realtotal = 0


function calculateTotal(panier, httpRequest) {  
    total = 0   
    realtotal = 0                                    //le total est d'origine egal a 0
    for (let index = 0; index < panier.length; index++) {            // on cherche dans le tableau panier 
        total = total + (panier[index].price*panier[index].quantité)       // le prix des articles, et on l'ajoute a la variable total qui de base est donc de 0
    }
    let fraislivraison = 5
    let charges = Math.round(total * 0.1 * 100) / 100

    realtotal = total + charges + fraislivraison

    httpRequest.session.total = realtotal     // on stock l'info dans la session
    return [total, realtotal, charges]
}

app.post('/ajouter_au_panier', function(httpRequest, httpResponse) {
    console.log('httpRequest after ajouter au panier: ', httpRequest.body)
    let id = httpRequest.body.id
    let name = httpRequest.body.name
    let price = httpRequest.body.price
    let image = httpRequest.body.image
    let quantité = httpRequest.body.quantité
    let product = {id:id, name:name, price:price, image:image, quantité:quantité}

    let panier = httpRequest.session.panier || []

    if (!ProduitDansPanier(panier, id)) {  // Si le produit n'est pas dans le panier alors le push
        panier.push(product)
    } 

    httpRequest.session.panier = panier  // Stockage du panier dans la session
                                         // Redirection vers la page panier


    let [total, realtotal, charges] = calculateTotal(panier,httpRequest)          // calculer le total

    httpResponse.render('pages/Panier', {panier:panier, total:total, realtotal:realtotal, charges:charges}) //redirige vers la page panier
    

})

//supprimer un produit grace a .splice
app.post('/remove_product', function(httpRequest, httpResponse){
    let id = httpRequest.body.id
    let panier = httpRequest.session.panier
    
    for (let index = 0; index < panier.length; index++) {
        
        if (panier[index].id == id){          // si l'id de l'index du panier est l'id du produit, alors on le supprime avec .splice et on sors de la boucle avec break
            panier.splice(index,1)
            break
        }
    }

//recalculer le total

let [total, realtotal, charges] = calculateTotal(panier,httpRequest)
httpResponse.render('pages/Panier', {panier:panier, total:total, realtotal:realtotal, charges:charges})

})

//modifier le nombre

app.post('/edit_product_quantity', function(httpRequest, httpResponse){

    let id = httpRequest.body.id
    let quantity = httpRequest.body.quantité
    let increase_btn = httpRequest.body.increase_product_quantity
    let decrease_btn = httpRequest.body.decrease_product_quantity

    let panier = httpRequest.session.panier  

    
    if(increase_btn){
        for (let index = 0; index < panier.length; index++) {
            if(panier[index].id == id)
                if(panier[index].quantité > 0) {
                    panier[index].quantité = parseInt(panier[index].quantité) + 1  //récupère la quantité d'un produit dans le panier, fait +1, puis convertit le résultat en entier avant de le réassigner à la quantité du produit dans le panier. garantit que la quantité est bien stockée sous forme d'entier dans l'objet du produit du panier.
                }           
        }
    }

    if(decrease_btn){
        for (let index = 0; index < panier.length; index++) {
            if(panier[index].id == id)
                if(panier[index].quantité > 1) {                    // j'ai mis supérieur a 1 pour ne pas qu'on puisse descendre la quantité en dessous de 1. Pour supprimer le produit il faudra cliquer sur la croix
                    panier[index].quantité = parseInt(panier[index].quantité) - 1  //récupère la quantité d'un produit dans le panier, fait +1, puis convertit le résultat en entier avant de le réassigner à la quantité du produit dans le panier. garantit que la quantité est bien stockée sous forme d'entier dans l'objet du produit du panier.
                }  
                       
        }
    }
    //recalculer le total

    let [total, realtotal, charges] = calculateTotal(panier,httpRequest)
    httpResponse.render('pages/Panier', {panier:panier, total:total, realtotal:realtotal, charges:charges})
})