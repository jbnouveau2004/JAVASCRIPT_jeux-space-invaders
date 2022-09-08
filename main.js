var vaisseaux=190;
var vaisseauy=250;
var invader1x=50, invader1y=20, invader2x=140, invader2y=20, invader3x=240, invader3y=20, invader4x=330, invader4y=20;
var vitesse1=1500;
var vitesse2=2250;
var vitesse3=2000;
var vitesse4=1750;
var invader1_vie=1;
var invader2_vie=1;
var invader3_vie=1;
var invader4_vie=1;
var calcul_score=1;
var score=0;
var vie=2;
var level=0;
var game_over_si_1=0;
var dy = 10;

var canvas = document.getElementById("space-invaders");
var format2d = canvas.getContext("2d");
var vaisseau = document.getElementById("vaisseau");
var invader = document.getElementById("invader");
var go = document.getElementById("go");


    //affiche une première fois
    window.onload = function() {
        format2d.drawImage(vaisseau, vaisseaux, vaisseauy, 20, 20);
        format2d.drawImage(invader, invader1x, invader1y, 20, 20);
        format2d.drawImage(invader, invader2x, invader2y, 20, 20);
        format2d.drawImage(invader, invader3x, invader3y, 20, 20);
        format2d.drawImage(invader, invader4x, invader4y, 20, 20);
    };

// affichage sur la page web des résultats
function affichage(){
    document.querySelector('#vie').innerHTML = vie;
    document.querySelector('#score').innerHTML = score;
    document.querySelector('#level').innerHTML = level;
}
setInterval(affichage, 50)


// augmente le level si tout les invaders sont détruite ou sortis par le bas
setInterval("if(invader1_vie==0 && invader2_vie==0 && invader3_vie==0 && invader4_vie==0 && game_over_si_1==0){level_up();}", 2000)

// 1 potentiel déplacement sans colision et tir avec test de colision
var un = setInterval("if(invader1_vie==1){invader1();}", vitesse1);
var deux = setInterval("if(invader2_vie==1){invader2();}", vitesse2);
var trois = setInterval("if(invader3_vie==1){invader3();}", vitesse3);  
var quattre = setInterval("if(invader4_vie==1){invader4();}", vitesse4);



function invader1(){
    var x;
    var y;
    //efface
    format2d.clearRect(invader1x, invader1y, 20, 20);
    // choix au hasard de la position +ou-x et +ou-y de l'invader
    var numberx = (Math.floor(Math.random() * 20)) - 10;
    if(!((((invader1x+numberx)>(invader2x+30)||((invader1x+numberx)+30)<invader2x)||(invader1y>(invader2y+30)||(invader1y+30)<invader2y)) && (((invader1x+numberx)>(invader3x+30)||((invader1x+numberx)+30)<invader3x)||(invader1y>(invader3y+30)||(invader1y+30)<invader3y)) && (((invader1x+numberx)>(invader4x+30)||((invader1x+numberx)+30)<invader4x)||(invader1y>(invader4y+30)||(invader1y+30)<invader4y)))){ // test si l'invader s'approche trop d'un autre avant application du calcul en x
        format2d.drawImage(invader, invader1x, invader1y, 20, 20);
    }else if(((invader1x)<=(canvas.width-30)) && (invader1x>=10)){ // test si l'invader ne dépasse pas le décord en x
    invader1x += numberx;
    }else if(invader1x>(canvas.width/2)){
        invader1x -=10;
    }else {
        invader1x +=10;
    }
    var numbery = (Math.floor(Math.random() * 20)) - 5; // -5 au lieu de -10 pour le bouger vers le bas
    if(!(((invader1x>(invader2x+30)||(invader1x+30)<invader2x)||((invader1y+numbery)>(invader2y+30)||((invader1y+numbery)+30)<invader2y)) && ((invader1x>(invader3x+30)||(invader1x+30)<invader3x)||((invader1y+numbery)>(invader3y+30)||((invader1y+numbery)+30)<invader3y)) && ((invader1x>(invader4x+30)||(invader1x+30)<invader4x)||((invader1y+numbery)>(invader4y+30)||((invader1y+numbery)+30)<invader4y)))){ // test si l'invader s'approche trop d'un autre avant application du calcul en y
        invader1x -= numberx; // car il faut remettre comme c'était avant, on recommencera ensuite un recalcul de la trajectoir
        format2d.drawImage(invader, invader1x, invader1y, 20, 20);
    }else if(invader1y<=(canvas.height)){ // test si l'invader ne dépasse pas le décord en y
    invader1y += numbery;
    }else if(invader1y>(canvas.height)){ // si est descendu du décord
        invader1_vie=0;
        console.log("L'invader1 est partis !");
    }
    //réaffiche ensuite avec la nouvelle position
    format2d.drawImage(invader, invader1x, invader1y, 20, 20);
    // choix au hasard si tire il y a
    var invader_tire = Math.floor(Math.random() * 20);
    // si tire
    if(invader_tire<=10){
            var level_next = level;
            // position initial de tire
            x = invader1x + 9;
            y = invader1y + 30;
            // évolution de la balle
            function rectangle(){
                format2d.fillRect(x, y, 2, 10);
                format2d.clearRect(x, y-10, 2, 10);
                // vérifie à chaque changement de position si l'invader à touché le vaisseau
                if(x>=vaisseaux && x<=(vaisseaux+20) && y>=vaisseauy && y<=(vaisseauy+20)){
                    format2d.clearRect(x, y, 2, 10);
                    y = 10000;  // on met la balle plus loin
                    console.log("L'invader1 vous a détruit !");
                    game_over();
                }
                if(level_next == level){ // test si le level n'a pas évolué
                    y += dy; // incrémentation de la balle vers le bas
                    }else{ // sinon les balles envoyées dans le level précédent sont effacées, déplacées vers l'extérieur au même endroit et arrêtées
                        format2d.clearRect(x, y, 2, 10);
                        x = 100000;
                        y = 100000;
                    }
            }
        setInterval(rectangle, 100);
    }
}

function invader2(){
    var x;
    var y;
    //efface
    format2d.clearRect(invader2x, invader2y, 20, 20);
    // choix au hasard de la position +ou-x et +ou-y de l'invader
    var numberx = (Math.floor(Math.random() * 20)) - 10;
    if(!((((invader2x+numberx)>(invader1x+30)||((invader2x+numberx)+30)<invader1x)||(invader2y>(invader1y+30)||(invader2y+30)<invader1y)) && (((invader2x+numberx)>(invader3x+30)||((invader2x+numberx)+30)<invader3x)||(invader2y>(invader3y+30)||(invader2y+30)<invader3y)) && (((invader2x+numberx)>(invader4x+30)||((invader2x+numberx)+30)<invader4x)||(invader2y>(invader4y+30)||(invader2y+30)<invader4y)))){ // test si l'invader s'approche trop d'un autre avant application du calcul en x
        format2d.drawImage(invader, invader2x, invader2y, 20, 20);
    }else if(((invader2x)<=(canvas.width-30)) && (invader2x>=10)){ // test si l'invader ne dépasse pas le décord en x
    invader2x += numberx;
    }else if(invader2x>(canvas.width/2)){
        invader2x -=10;
    }else {
        invader2x +=10;
    }
    var numbery = (Math.floor(Math.random() * 20)) - 5; // -5 au lieu de -10 pour le bouger vers le bas
    if(!(((invader2x>(invader1x+30)||(invader2x+30)<invader1x)||((invader2y+numbery)>(invader1y+30)||((invader2y+numbery)+30)<invader1y)) && ((invader2x>(invader3x+30)||(invader2x+30)<invader3x)||((invader2y+numbery)>(invader3y+30)||((invader2y+numbery)+30)<invader3y)) && ((invader2x>(invader4x+30)||(invader2x+30)<invader4x)||((invader2y+numbery)>(invader4y+30)||((invader2y+numbery)+30)<invader4y)))){ // test si l'invader s'approche trop d'un autre avant application du calcul en y
        invader2x -= numberx; // car il faut remettre comme c'était avant, on recommencera ensuite un recalcul de la trajectoir
        format2d.drawImage(invader, invader2x, invader2y, 20, 20);
    }else if(invader2y<=(canvas.height)){ // test si l'invader ne dépasse pas le décord en y
        invader2y += numbery;
    }else if(invader2y>(canvas.height)){ // si est descendu du décord
        invader2_vie=0;
            console.log("L'invader2 est partis !");
        }
    //réaffiche ensuite avec la nouvelle position
    format2d.drawImage(invader, invader2x, invader2y, 20, 20);
    // choix au hasard si tire il y a
    var invader_tire = Math.floor(Math.random() * 20);
    // si tire
    if(invader_tire<=10){
            var level_next = level;
            // position initial de tire
            x = invader2x + 9;
            y = invader2y + 30;
            // évolution de la balle
            function rectangle(){
                format2d.fillRect(x, y, 2, 10);
                format2d.clearRect(x, y-10, 2, 10);
                // vérifie à chaque changement de position si l'invader à touché le vaisseau
                if(x>=vaisseaux && x<=(vaisseaux+20) && y>=vaisseauy && y<=(vaisseauy+20)){
                    format2d.clearRect(x, y, 2, 10);
                    y = 10000;  // on met la balle plus loin
                    console.log("L'invader2 vous a détruit !");
                    game_over();
                }
                if(level_next == level){ // test si le level n'a pas évolué
                    y += dy; // incrémentation de la balle vers le bas
                    }else{ // sinon les balles envoyées dans le level précédent sont effacées, déplacées vers l'extérieur au même endroit et arrêtées
                        format2d.clearRect(x, y, 2, 10);
                        x = 100000;
                        y = 100000;
                    }
            }
        setInterval(rectangle, 100);
    }
}

function invader3(){
    var x;
    var y;
    //efface
    format2d.clearRect(invader3x, invader3y, 20, 20);
    // choix au hasard de la position +ou-x et +ou-y de l'invader
    var numberx = (Math.floor(Math.random() * 20)) - 10;
    if(!((((invader3x+numberx)>(invader2x+30)||((invader3x+numberx)+30)<invader2x)||(invader3y>(invader2y+30)||(invader3y+30)<invader2y)) && (((invader3x+numberx)>(invader1x+30)||((invader3x+numberx)+30)<invader1x)||(invader3y>(invader1y+30)||(invader3y+30)<invader1y)) && (((invader3x+numberx)>(invader4x+30)||((invader3x+numberx)+30)<invader4x)||(invader3y>(invader4y+30)||(invader3y+30)<invader4y)))){ // test si l'invader s'approche trop d'un autre avant application du calcul en x
        format2d.drawImage(invader, invader3x, invader3y, 20, 20);
    }else if(((invader3x)<=(canvas.width-30)) && (invader3x>=10)){ // test si l'invader ne dépasse pas le décord en x
    invader3x += numberx;
    }else if(invader3x>(canvas.width/2)){
        invader3x -=10;
    }else {
        invader3x +=10;
    }
    var numbery = (Math.floor(Math.random() * 20)) - 5; // -5 au lieu de -10 pour le bouger vers le bas
    if(!(((invader3x>(invader2x+30)||(invader3x+30)<invader2x)||((invader3y+numbery)>(invader2y+30)||((invader3y+numbery)+30)<invader2y)) && ((invader3x>(invader1x+30)||(invader3x+30)<invader1x)||((invader3y+numbery)>(invader1y+30)||((invader3y+numbery)+30)<invader1y)) && ((invader3x>(invader4x+30)||(invader3x+30)<invader4x)||((invader3y+numbery)>(invader4y+30)||((invader3y+numbery)+30)<invader4y)))){ // test si l'invader s'approche trop d'un autre avant application du calcul en y
        invader3x -= numberx; // car il faut remettre comme c'était avant, on recommencera ensuite un recalcul de la trajectoir
        format2d.drawImage(invader, invader3x, invader3y, 20, 20);
    }else if(invader3y<=(canvas.height)){ // test si l'invader ne dépasse pas le décord en y
        invader3y += numbery;
    }else if(invader3y>(canvas.height)){ // si est descendu du décord
        invader3_vie=0;
            console.log("L'invader3 est partis !");
        }
    //réaffiche ensuite avec la nouvelle position
    format2d.drawImage(invader, invader3x, invader3y, 20, 20);
    // choix au hasard si tire il y a
    var invader_tire = Math.floor(Math.random() * 20);
    // si tire
    if(invader_tire<=10){
            var level_next = level;
            // position initial de tire
            x = invader3x + 9;
            y = invader3y + 30;
            // évolution de la balle
            function rectangle(){
                format2d.fillRect(x, y, 2, 10);
                format2d.clearRect(x, y-10, 2, 10);
                // vérifie à chaque changement de position si l'invader à touché le vaisseau
                if(x>=vaisseaux && x<=(vaisseaux+20) && y>=vaisseauy && y<=(vaisseauy+20)){
                    format2d.clearRect(x, y, 2, 10);
                    y = 10000;  // on met la balle plus loin
                    console.log("L'invader3 vous a détruit !");
                    game_over();
                }
                if(level_next == level){ // test si le level n'a pas évolué
                    y += dy; // incrémentation de la balle vers le bas
                    }else{ // sinon les balles envoyées dans le level précédent sont effacées, déplacées vers l'extérieur au même endroit et arrêtées
                        format2d.clearRect(x, y, 2, 10);
                        x = 100000;
                        y = 100000;
                    }
            }
        setInterval(rectangle, 100);
    }
}

function invader4(){
    var x;
    var y;
    //efface
    format2d.clearRect(invader4x, invader4y, 20, 20);
    // choix au hasard de la position +ou-x et +ou-y de l'invader
    var numberx = (Math.floor(Math.random() * 20)) - 10;
    if(!((((invader4x+numberx)>(invader2x+30)||((invader4x+numberx)+30)<invader2x)||(invader4y>(invader2y+30)||(invader4y+30)<invader2y)) && (((invader4x+numberx)>(invader3x+30)||((invader4x+numberx)+30)<invader3x)||(invader4y>(invader3y+30)||(invader4y+30)<invader3y)) && (((invader4x+numberx)>(invader1x+30)||((invader4x+numberx)+30)<invader1x)||(invader4y>(invader1y+30)||(invader4y+30)<invader1y)))){ // test si l'invader s'approche trop d'un autre avant application du calcul en x
        format2d.drawImage(invader, invader4x, invader4y, 20, 20);
    }else if(((invader4x)<=(canvas.width-30)) && (invader4x>=10)){ // test si l'invader ne dépasse pas le décord en x
    invader4x += numberx;
    }else if(invader4x>(canvas.width/2)){
        invader4x -=10;
    }else {
        invader4x +=10;
    }
    var numbery = (Math.floor(Math.random() * 20)) - 5; // -5 au lieu de -10 pour le bouger vers le bas
    if(!(((invader4x>(invader2x+30)||(invader4x+30)<invader2x)||((invader4y+numbery)>(invader2y+30)||((invader4y+numbery)+30)<invader2y)) && ((invader4x>(invader3x+30)||(invader4x+30)<invader3x)||((invader4y+numbery)>(invader3y+30)||((invader4y+numbery)+30)<invader3y)) && ((invader4x>(invader1x+30)||(invader4x+30)<invader1x)||((invader4y+numbery)>(invader1y+30)||((invader4y+numbery)+30)<invader1y)))){ // test si l'invader s'approche trop d'un autre avant application du calcul en y
        invader4x -= numberx; // car il faut remettre comme c'était avant, on recommencera ensuite un recalcul de la trajectoir
        format2d.drawImage(invader, invader4x, invader4y, 20, 20);
    }else if(invader4y<=(canvas.height)){ // test si l'invader ne dépasse pas le décord en y
        invader4y += numbery;
    }else if(invader4y>(canvas.height)){ // si est descendu du décord
        invader4_vie=0;
            console.log("L'invader4 est partis !");
        }
    //réaffiche ensuite avec la nouvelle position
    format2d.drawImage(invader, invader4x, invader4y, 20, 20);
    // choix au hasard si tire il y a
    var invader_tire = Math.floor(Math.random() * 20);
    // si tire
    if(invader_tire<=10){
            var level_next = level;
            // position initial de tire
            x = invader4x + 9;
            y = invader4y + 30;
            // évolution de la balle
            function rectangle(){
                format2d.fillRect(x, y, 2, 10);
                format2d.clearRect(x, y-10, 2, 10);
                // vérifie à chaque changement de position si l'invader à touché le vaisseau
                if(x>=vaisseaux && x<=(vaisseaux+20) && y>=vaisseauy && y<=(vaisseauy+20)){
                    format2d.clearRect(x, y, 2, 10);
                    y = 10000;  // on met la balle plus loin
                    console.log("L'invader4 vous a détruit !");
                    game_over();
                }
                if(level_next == level){ // test si le level n'a pas évolué
                    y += dy; // incrémentation de la balle vers le bas
                    }else{ // sinon les balles envoyées dans le level précédent sont effacées, déplacées vers l'extérieur au même endroit et arrêtées
                        format2d.clearRect(x, y, 2, 10);
                        x = 100000;
                        y = 100000;
                    }

            }
        setInterval(rectangle, 100);
    }
}



function tire(){
var level_next = level;
var x = vaisseaux + 9;
var y = vaisseauy - 20;
function rectangle(){
    format2d.fillRect(x, y, 2, 10);
    format2d.clearRect(x, y+10, 2, 10);
    if(x>=invader1x && x<=(invader1x+20) && y<=(invader1y+20)){ // invander touché:
        format2d.clearRect(invader1x, invader1y, 20, 20); // on efface
        invader1x = 10000; // on le déplace
        invader1y = 10000;
        format2d.clearRect(x, y, 2, 10); // efface la balle qui l'a touché
        y -= 1000; // on déplace la balle fantôme
        invader1_vie=0;
        score += calcul_score;
        console.log("Vous avez détruit l'invader1 !")
    }
    if(x>=invader2x && x<=(invader2x+20) && y<=(invader2y+20)){ // invander touché:
        format2d.clearRect(invader2x, invader2y, 20, 20); // on efface
        invader2x = 20000; // on le déplace
        invader2y = 20000;
        format2d.clearRect(x, y, 2, 10); // efface la balle qui l'a touché
        y -= 1000; // on déplace la balle fantôme
        invader2_vie=0;
        score += calcul_score;
        console.log("Vous avez détruit l'invader2 !")
    }
    if(x>=invader3x && x<=(invader3x+20) && y<=(invader3y+20)){ // invander touché:
        format2d.clearRect(invader3x, invader3y, 20, 20); // on efface
        invader3x = 30000; // on le déplace
        invader3y = 30000;
        format2d.clearRect(x, y, 2, 10); // efface la balle qui l'a touché
        y -= 1000; // on déplace la balle fantôme
        invader3_vie=0;
        score += calcul_score;
        console.log("Vous avez détruit l'invader3 !")
    }
    if(x>=invader4x && x<=(invader4x+20) && y<=(invader4y+20)){ // invander touché:
        format2d.clearRect(invader4x, invader4y, 20, 20); // on efface
        invader4x = 40000; // on le déplace
        invader4y = 40000;
        format2d.clearRect(x, y, 2, 10); // efface la balle qui l'a touché
        y -= 1000; // on déplace la balle fantôme
        invader4_vie=0;
        score += calcul_score;
        console.log("Vous avez détruit l'invader4 !")
    }
    if(level_next == level){ // test si le level n'a pas évolué
    y -= dy; // incrémentation de la balle vers le haut
    }else{ // sinon les balles envoyées dans le level précédent sont effacées, déplacées vers l'extérieur au même endroit et arrêtées
        format2d.clearRect(x, y, 2, 10);
        x = -100000;
        y = -100000;
    }
}

setInterval(rectangle, 100);
}

// détection de touche et execute les fonctions
document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft"){
        deplacementgauche();
    } else if (event.key == "ArrowUp"){
        deplacementhaut();
    } else if (event.key == "ArrowRight"){
        deplacementdroite();
    } else if (event.key == "ArrowDown"){
        deplacementbas();
    } else if (event.key == " "){
        tire();
    }
});


function deplacementgauche(){
    format2d.clearRect(vaisseaux, vaisseauy, 20, 20);
    if(vaisseaux != 0){ // test si le vaisseau ne dépasse pas le décord en x
        vaisseaux -= 10;
    }
    format2d.drawImage(vaisseau, vaisseaux, vaisseauy, 20, 20);
}

function deplacementdroite(){
    format2d.clearRect(vaisseaux, vaisseauy, 20, 20);
    if(vaisseaux != (canvas.width-20)){ // test si le vaisseau ne dépasse pas le décord en x
        vaisseaux += 10;
    }
    format2d.drawImage(vaisseau, vaisseaux, vaisseauy, 20, 20);
}

function deplacementhaut(){
    format2d.clearRect(vaisseaux, vaisseauy, 20, 20);
    if(vaisseauy != 0){ // test si le vaisseau ne dépasse pas le décord en x
        vaisseauy -= 10;
    }
    format2d.drawImage(vaisseau, vaisseaux, vaisseauy, 20, 20);
}

function deplacementbas(){
    format2d.clearRect(vaisseaux, vaisseauy, 20, 20);
    if(vaisseauy != (canvas.height-20)){ // test si le vaisseau ne dépasse pas le décord en x
        vaisseauy += 10;
    }
    format2d.drawImage(vaisseau, vaisseaux, vaisseauy, 20, 20);
}

// test si level supplémentaire
function level_up(){
    level += 1;
    calcul_score *= 2;
    if(vitesse3>1000){
        vitesse1 -= 100;
        vitesse2 -= 100;
        vitesse3 -= 100;
        vitesse4 -= 100;
        invader1_revie();
        invader2_revie();
        invader3_revie();
        invader4_revie();
        console.log("level " + level);
        console.log("score en cours " + score);
    }else if(vitesse3>750){
        vitesse1 -= 50;
        vitesse2 -= 50;
        vitesse3 -= 50;
        vitesse4 -= 50;
        invader1_revie();
        invader2_revie();
        invader3_revie();
        invader4_revie();
        console.log("level " + level);
        console.log("score en cours " + score);
    }else{
        console.log("Vous avez gagné ! Votre scrore est de " + score);
    }

}

//relance les invaders
function invader1_revie(){
    invader1x=50;
    invader1y=20;
    format2d.drawImage(invader, invader1x, invader1y, 20, 20);
    invader1_vie = 1;
}
function invader2_revie(){
    invader2x=140;
    invader2y=20;
    format2d.drawImage(invader, invader2x, invader2y, 20, 20);
    invader2_vie = 1;
}
function invader3_revie(){
    invader3x=240; 
    invader3y=20;
    format2d.drawImage(invader, invader3x, invader3y, 20, 20);
    invader3_vie = 1;
}
function invader4_revie(){
    invader4x=330;
    invader4y=20;
    format2d.drawImage(invader, invader4x, invader4y, 20, 20);
    invader4_vie = 1;
}


function game_over(){
    format2d.clearRect(vaisseaux, vaisseauy, 20, 20);
    // isolement du vaisseau à l'extérieur
    vaisseaux = 10000;
    vaisseauy = 10000;
    vie -= 1;
    if(vie==0){
    console.log("Game Over");
    game_over_si_1 = 1;
    invader1_vie = 0;
    invader2_vie = 0;
    invader3_vie = 0;
    invader4_vie = 0;
    format2d.clearRect(0, 0, canvas.width, canvas.height);
    format2d.drawImage(go, 0, 0, canvas.width, canvas.height);
    }else{
    console.log("Il vous reste : " + vie + " vie(s)");
    vaisseaux=190;
    vaisseauy=250;
    format2d.drawImage(vaisseau, vaisseaux, vaisseauy, 20, 20);
    }
}


