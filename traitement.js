// La fonction qui se lance au chargement de notre page
function init(){
  var id = sessionStorage.getItem("id")
  var email = sessionStorage.getItem("email")
  var password = sessionStorage.getItem("password")
  var x = sessionStorage.getItem("x")
  var y = sessionStorage.getItem("y")
  /*Si il existe des champs dans le stockage local qui ni sont pas vides
    Acceder directement à la page d'acceuil sans se reconnecter
  */
  if(id!=null && email!=null && password!=null && y!=null && x!=null ){
      effacer_login_page()
      removeDislike()
      home(liste_unlikedShops()) 
  } 
}

// La fonction avec laquelle on envoie la requete pour se connecter
function signin(){
    var resp
    // une nouvelle requete XMLHttp
    var http = new XMLHttpRequest()
    // url de la requete
    var url = "backend/login.php";
    // les valeurs des champs email et mot de passe
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    // les parametres de la requete
    var params = "email="+email+"&password="+password
    //ouvrir la requete de methode post
    http.open('POST', url, false)
    //Ajouter des entetes à notre requete
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    //Appel à une fonction quand l'etat de la requete change
    http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         resp=http.responseText
     }
    }
    // envoyer la requete avec les parametres
       http.send(params);
       var res = JSON.parse(resp)
    // si on la reponse est "succés"
    if(res.length>0){
     sessionStorage.setItem("id",res[0].id);
     sessionStorage.setItem("email",res[0].email);
     sessionStorage.setItem("password",res[0].password);
     sessionStorage.setItem("x",res[0].x);
     sessionStorage.setItem("y",res[0].y); 
     
     effacer_login_page()   
     home(liste_unlikedShops());     
     }
    else 
     {   
       document.getElementById("email").value=""
       document.getElementById("password").value=""
       alert("Email ou mot de passe incorrecte")    
 
    }               
 }
 // La fonction appelé quand on clique sur le singup 
 function signupForm(){
    effacer_login_page()
    createSignUpForm()
}

 
 // Valider les champs de formulaire d'inscription et apres envoierra la requete
 function validateForm(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var confirmPassword = document.getElementById("confirmPassword").value
    var cordX = document.getElementById("cordX").value
    var cordY = document.getElementById("cordY").value
    var num_pattern = /^\d+$/
    if(password.length<6)
      alert("Le mot de passe doit contenir 6 caractères minium")
    else if (password !=confirmPassword)
      alert("Les mots de passes ne sont pas identiques") 
    else if (!num_pattern.test(cordX) || !num_pattern.test(cordY))
      alert("Les coordonnées doivent être des entiers")
    else {
        var resp
        var http = new XMLHttpRequest()
        var url = "backend/signup.php";
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var cordX = document.getElementById("cordX").value
        var cordY = document.getElementById("cordY").value
        var params = "email="+email+"&password="+password+"&cordX="+cordX+"&cordY="+cordY
        http.open('POST', url, false)
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        http.onreadystatechange = function() {
         if(http.readyState == 4 && http.status == 200) {
             resp=http.responseText
         }
        }
           http.send(params)
           if (resp =="failure"){
               alert("this email already exists")  
                }
           else {
            var response = JSON.parse(resp)   
            alert("Registration successfully done") 
            effacer_singup_page()
            sessionStorage.setItem("id",response[0].id)
            sessionStorage.setItem("email",response[0].email)
            sessionStorage.setItem("password",response[0].password)
            sessionStorage.setItem("y",response[0].x)
            sessionStorage.setItem("x",response[0].y)
            home(liste_unlikedShops())
         } 
       
}  }
 
// Effacer le formulaire d'authentification 
function effacer_login_page(){
    //le div qui contient le formulaire de connexion
    var test = document.getElementById("test")
    var test2 = document.getElementById("test2")
    //supprimer le div precedent du body
    test2.parentNode.removeChild(test2)
    test.parentNode.removeChild(test)
}
 // Effacer le formulaire d'inscription
function effacer_singup_page(){
    var row =document.getElementById("inscription")
    row.parentNode.removeChild(row)
}
function home(tab){
    //on va jusqu'au body
    var body = document.getElementById("body")
    //creer un div du type row
    var row1 = document.createElement("div")
    row1.setAttribute("class","row")
    row1.setAttribute("id","row1")
    //creer deux div dans notre div precendent
    var col1row1= document.createElement("div")
    col1row1.setAttribute("class","col-md-8")
    var col2row1= document.createElement("div")
    col2row1.setAttribute("class","col-md-4")
    //creer deux balises a pour referer aux stores proches et aux stores preferés
    var nearedShop = document.createElement("a")
    var preferedShop = document.createElement("a")
    nearedShop.setAttribute("style","padding-right:20px;")
    nearedShop.setAttribute("onclick","nearedShop()")
    nearedShop.innerHTML="NearedShop"
    preferedShop.setAttribute("style","padding-right:20px;")
    preferedShop.setAttribute("onclick","preferedShop()")
    preferedShop.innerHTML="MyPreferedShop"
    // ajouter les a à la colonne
    col2row1.appendChild(nearedShop)
    col2row1.appendChild(preferedShop)
    //ajouter les colonnes au row
    row1.appendChild(col1row1)
    row1.appendChild(col2row1)
    //ajouter le row au body
    body.appendChild(row1)

    //creer une div de classe row
    var row2 = document.createElement("div")
    row2.setAttribute("class","row")
    row2.setAttribute("id","row2")
    //apporter la liste des shops appartir de la base de donnée
    var shops = trierParDistance(tab)

    for(i=0;i<shops.length;i++){     
       //creer une div dans le row qui prendra 3 colonnes dont on affichera les cards
       var row2col2= document.createElement("div")
       row2col2.setAttribute("id",shops[i].id)
       row2col2.setAttribute("class","col-md-3")
       row2col2.setAttribute("style","padding-left : 50px;padding-top : 20px;margin-right: 50px")
        // creer la div de le card
        var card=document.createElement("div")
        card.setAttribute("class","card")
        card.setAttribute("style","width: 300px;height: 350px;")
        // creer l'image de chaque shop dans la carde
        var img = document.createElement("img")
        img.setAttribute("src",shops[i].image_path)
        img.setAttribute("class","card-img-top")
        img.setAttribute("height","200px")
        // creer la div du card-body
        var card_body = document.createElement("div")
        card_body.setAttribute("class","card-body")
        // creer le titre qui contiendra le nom de notre card
        var title = document.createElement("h5")
        title.setAttribute("class","card-title")
        title.innerHTML = shops[i].nom
        var dist = document.createElement("p")
        dist.setAttribute("class","card-text")
        var cx = parseInt(sessionStorage.getItem("x"))
        var cy = parseInt(sessionStorage.getItem("y"))
        dist.innerHTML = "A "+Math.round(distance(shops[i],{x:cx,y:cy}))+"m de chez vous"
        //creer deux butons un pour like et l'autre pour dislike
        var like = document.createElement("button")
        var dis = document.createElement("button")
        like.setAttribute("class","btn btn-success")
        like.setAttribute("onclick","like("+shops[i].id+")")
        like.setAttribute("id","like"+shops[i].id)
        dis.setAttribute("class","btn btn-danger")
        dis.setAttribute("onclick","dislike("+shops[i].id+")")
        dis.setAttribute("id","dislike"+shops[i].id)
        like.innerHTML = "Like"
        dis.innerHTML = "Dislike"
        //ajouter les contenus du card au card
        card_body.appendChild(title)
        card_body.appendChild(dist)
        card_body.appendChild(like)
        card_body.appendChild(dis)
        card.appendChild(img)
        card.appendChild(card_body)
        row2col2.appendChild(card)
        row2.appendChild(row2col2)
    }
   
    body.appendChild(row2)  

}


function distance(pos1,pos2){
    var cord1 = Math.abs(pos1.x-pos2.x)
    var cord2 = Math.abs(pos1.y-pos2.y)
    var cord1_carre = Math.pow(cord1,2)
    var cord2_carre = Math.pow(cord2,2)
    var dist  = Math.sqrt(cord1_carre+cord2_carre)
    return dist
} 
            
function listerShops(){
    var resp
    var http = new XMLHttpRequest()
    var url = "backend/liste_shops.php"
    http.open('POST', url, false)

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    
    http.onreadystatechange = function() {
        //Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            resp=JSON.parse(http.responseText)
        }
    }
    http.send()
    return resp
}
// Le fonction quand on clique sur preffered shop
function preferedShop() {
    var row1 = document.getElementById("row1")
    var row2 = document.getElementById("row2")
    row1.parentNode.removeChild(row1)
    row2.parentNode.removeChild(row2)
    home(liste_preferedShops())
    l = liste_preferedShops()
    for(i=0;i<l.length;i++){
        var like = document.getElementById("like"+l[i].id)
        like.parentNode.removeChild(like)
        var dis = document.getElementById("dislike"+l[i].id)
        dis.innerHTML = "Remove"
        dis.removeAttribute("onclick")
        dis.setAttribute("onclick","remove("+l[i].id+")")
    }
}
// Quand on clique sur un bouton remove
function remove(id){
    var resp
    var http = new XMLHttpRequest()
    var url = "backend/remove_like_from_shop.php";
    var user_id = sessionStorage.getItem("id")
    var shop_id = id
    var params = "user_id="+user_id+"&shop_id="+shop_id
    http.open('POST', url, false)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         resp=http.responseText
     }
    }
       http.send(params)
       if(resp=="success"){
           var shop=document.getElementById(id)
           shop.parentNode.removeChild(shop)
       }

}
// Quand on clique sur nearedshops
function nearedShop(){
    var body = document.getElementById("body")
    var row1 = document.getElementById("row1")
    var row2 = document.getElementById("row2")
    row1.parentNode.removeChild(row1)
    row2.parentNode.removeChild(row2)
    removeDislike()
    home(liste_unlikedShops())
}
// Quand on clique sur un bouton like
function like(id){
    var resp
    var http = new XMLHttpRequest()
    var url = "backend/like_shop.php";
    var user_id = sessionStorage.getItem("id")
    var shop_id = id
    var params = "user_id="+user_id+"&shop_id="+shop_id
    http.open('POST', url, false)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         resp=http.responseText
     }
    }
       http.send(params)
       if(resp=="success"){
           var shop=document.getElementById(id)
           shop.parentNode.removeChild(shop)
       }
}
// Quand on clique sur un bouton dislike
function dislike(id){
    var resp
    var http = new XMLHttpRequest()
    var url = "backend/dislike_shop.php";
    var user_id = sessionStorage.getItem("id")
    var shop_id = id
    var d = new Date()
    var params = "user_id="+user_id+"&shop_id="+shop_id+"&date_dislike="+d.getTime()
    http.open('POST', url, false)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         resp=http.responseText
     }
    }
       http.send(params)
       if(resp=="success"){
           var shop=document.getElementById(id)
           shop.parentNode.removeChild(shop)
       }
}


 function createSignUpForm(){
     //creer le formulaire d'inscription
     var row = document.createElement("div")
     row.setAttribute("id","inscription")
     row.setAttribute("class","row")
     row.setAttribute("style","margin-top: 50px")
     var col = document.createElement("div")
     col.setAttribute("class","col-md-6 offset-md-3")
     var form = document.createElement("form")
     form.setAttribute("method","POST")
     form.setAttribute("onsubmit","event.preventDefault();validateForm()")
     //creer le champ d'email 
     var email = document.createElement("input")
     email.setAttribute("type","email")
     email.setAttribute("placeholder","Email")
     email.setAttribute("id","email")
     // creer le champ de mot de passe
     var password = document.createElement("input")
     password.setAttribute("type","password")
     password.setAttribute("placeholder","Password")
     password.setAttribute("id","password")
     // creer le champ de verification de mot de passe
     var confirmPassword = document.createElement("input")
     confirmPassword.setAttribute("type","password")
     confirmPassword.setAttribute("placeholder","Confirm Password")
     confirmPassword.setAttribute("id","confirmPassword")
     //creer le champ de le position x
     var cordX = document.createElement("input")
     cordX.setAttribute("type","text")
     cordX.setAttribute("id","cordX")
     cordX.setAttribute("placeholder","cordX")
     // creer le champ de la position y 
     var cordY = document.createElement("input")
     var cordY = document.createElement("input")
     cordY.setAttribute("type","text")
     cordY.setAttribute("id","cordY")
     cordY.setAttribute("placeholder","cordY")
     // creer le bouton qui envoie le formulaire
     var submit = document.createElement("button")
     submit.innerHTML = "Submit"
     submit.setAttribute("class","btn btn-primary")
     //form groupe1
     var formGroup1 = document.createElement("div")
     formGroup1.setAttribute("class","form-group")
     formGroup1.appendChild(email)
     //form groupe2
     var formGroup2 = document.createElement("div")
     formGroup2.setAttribute("class","form-group")
     formGroup2.appendChild(password)
     //form groupe3
     var formGroup3 = document.createElement("div")
     formGroup3.setAttribute("class","form-group")
     formGroup3.appendChild(confirmPassword)
     //form groupe4
     var formGroup4 = document.createElement("div")
     formGroup4.setAttribute("class","form-group")
     formGroup4.appendChild(submit)
     //form groupe5
     var formGroup5 = document.createElement("div")
     formGroup5.setAttribute("class","form-group")
     formGroup5.appendChild(cordX)
     //form groupe6
     var formGroup6 = document.createElement("div")
     formGroup6.setAttribute("class","form-group")
     formGroup6.appendChild(cordY)
     // ajouter les form groups aux form
     form.appendChild(formGroup1)
     form.appendChild(formGroup2)
     form.appendChild(formGroup3)
     form.appendChild(formGroup5)
     form.appendChild(formGroup6)
     form.appendChild(formGroup4)
     col.appendChild(form)
     row.append(col)
     var body=document.getElementById("body")
     body.appendChild(row)
 }

 // Retourner la liste des shops qui ont été liké
function liste_preferedShops(){
    var resp
    var http = new XMLHttpRequest()
    var url = "backend/liste_liked_shops.php";
    var user_id = sessionStorage.getItem("id")
    var params = "user_id="+user_id
    http.open('POST', url, false)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         resp=http.responseText
     }
    }
       http.send(params)
       var response =JSON.parse(resp)
       return response
}
//Lister les shops qui sont dislikés
function dislikedShops(){
    var resp
    var http = new XMLHttpRequest()
    var url = "backend/liste_disliked_shops.php";
    var user_id = sessionStorage.getItem("id")
    var params = "user_id="+user_id
    http.open('POST', url, false)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         resp=http.responseText
     }
    }
       http.send(params)
       var response =JSON.parse(resp)
       return response   
}
// Lister les shops qui ne sont liké ni disliké
function liste_unlikedShops(){
    var tab1 = listerShops()
    var tab2 = liste_preferedShops()
    var tab4 = dislikedShops() 
    var tab3 = []
    var tab5 = []
    var b = true, c = true
    for(i=0;i<tab1.length;i++){
        for(j=0;j<tab2.length;j++){
            if (tab1[i].id == tab2[j].id){
                b=false;
                break;
            }
            else b=true
        }
        if(b==true)
         tab3.push(tab1[i])        
        }
    for(i=0;i<tab3.length;i++){
        for(j=0;j<tab4.length;j++){
            if (tab3[i].id == tab4[j].id){
                c=false;
                break;
                }
                else c=true
            }
            if(c==true)
             tab5.push(tab3[i])        
            }
       return tab5                    
}
//Effacer le dislike si l'intervalle de temps entre le dislike et l'instant courant est supérieur à 2h
function removeDislike(){
    var tab = dislikedShops()
    var date1 = new Date().getTime()
    for(i=0;i<tab.length;i++){
        var date2= parseInt(tab[i].date_dislike)
        // L'interval entre les 2 deux dates en heures
        var interval = (date1-date2)/(1000*60*60)
        if(interval >= 2){
            effacerLeDislike(tab[i].id)
        }
    }
}
// Envoyer une requete pour enlever le dislike au shop précis par id
function effacerLeDislike(shop_id){
    var resp
    var http = new XMLHttpRequest()
    var url = "backend/remove_dislike_from_shop.php";
    var user_id = sessionStorage.getItem("id")
    var params = "user_id="+user_id+"&shop_id="+shop_id
    http.open('POST', url, false)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         resp=http.responseText
     }
    }
       http.send(params)
      
}
// Trier un  tableau par distance à l'utilisateur
function trierParDistance(tab){
    var cordX = parseInt(sessionStorage.getItem("x"))
    var cordY = parseInt(sessionStorage.getItem("y"))
    var p ={x:cordX,y:cordY}
    var a
    for(i=0;i<tab.length-1;i++)
        for(j=i+1;j<tab.length;j++)
            if(distance(p,tab[i])>distance(p,tab[j])){
                a=tab[i]
                tab[i]=tab[j]
                tab[j]=a
            }
    return tab    
    
}
 