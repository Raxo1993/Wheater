const express = require("express");
const app= express();
const https =require ("https");                                                  // utilizzo il modulo nativo NODE per faer richieste ad un server esterno.
const bodyParser=require("body-parser");                                        // modulo per richiedere il parse della pagina (va installato).
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){                                                  // get => Quello che succede quando l' utente entra nella ROOT del mio sito.
  res.sendFile(__dirname+"/index.html");                                        // invio all' utente la mia pagina HTML.
})

app.post("/", function(req,res){

  const query=req.body.citta;
  const key="Insert the Key ok Openweathermap";

  //res.send("il server funziona");                                              // res.send restituiamo qualcosa all' utente.
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ key +"&units=metric&lang=it";
  https.get(url, function(response){                                            // con https.get (vedere node doc) passo 2 parametri url, e una callback con param. la risposta del server interrogato.
    //console.log(response.statusCode);                                            Se lo stampo così ci ritorna un po' di dati ma tutti confusi (senza statusCode).con sC ci ritorna il cod html
    response.on("data", function(data){                                         // con data indico il momento in cui risp, passo data perchè soo i dati ottenuti.
      //console.log(data);                                                      così ottengo codice HEX , quindi bisonga fare un Parse.
      const informazioni = JSON.parse(data);                                    // effettuo la conversione in JSON dei dati HEX e li metto in una costante.
      var temperatura= informazioni.main.temp;                                  // se controllo il mio JSON, vado a prendere l' informaizone specifica usando la path corretta!
      var descrizione= informazioni.weather[0].description;
      const icon = informazioni.weather[0].icon;
      const icoUrl= "http://openweathermap.org/img/wn/"+icon+ "@2x.png";
      res.write("<p>Il tempo a "+ query +" e' " + descrizione + "</p>" );           // con write  posso scrivere tante volte quello che voglio tornare all' utente
      res.write("<h1> la temperatura e' di "+ temperatura + " gradi Celsius </h1>");
      res.write("<img src="+icoUrl+">")                                         // scrivo un immagine
      res.send();                                                               // il send è finale per restituire il tutto.
    })
  })
})


app.listen(3000, function(){
  console.log("il server è avviato sulla porta 3000");
});

//"https://api.openweathermap.org/data/2.5/weather?q=riposto&appid=57e47da07e76c579d3ce8042e7b3794e&units=metric";





/* STRINGIFY
 è il contrario del parse server per far diventare un intero oggetto una stringa. vedere esempio sotto
 const object ={
 name: "oscar";
 eta: 18;
}
JSON.stringify(object);  => ritorna {"name:"oscar",eta:18}

utile peroccupare poco spazio.



*/
