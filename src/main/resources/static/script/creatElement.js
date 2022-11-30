export const meteoCard = async (city, id) => {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=f4dd4bc486ec1bd5be709498385b6cd0&lang=en`)
        .then(res => res.json())
        .then(res => res)
    return (`
        <div class="card widget-card m-2" style="width: 18rem;" id="${id}">  
          <div class="d-flex justify-content-end"> <a href="#" class="deleteWidget"><i class="bi bi-x-circle text-danger p-3 "></i></a></div>  
            <div class="card-body">      
                <h4 class="card-title text-center d-flex align-items-center flex-column">
                    Meteo
                </h4>
                <div class="d-flex justify-content-center flex-column align-items-center">
                    <h4 class="temp">${Math.round(data.list[0].main.temp)}°  ${data.city.name}</h4>
                    <div class="image-temp"><img src="http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png" /></div>
                    <div class="desc">${data.list[0].weather[0].description}</div>
                    <div class="min-max"><span class="min">Min ${Math.round(data.list[0].main.temp_min)}°</span> <span class="max">Max ${Math.round(data.list[0].main.temp_max + 5)}°</span></div>
                </div>
            </div>
        </div>
    `)

}
export const cryptoCard = (data, id) => {
    let element = (`

        <div class="card widget-card m-2" style="width: 18rem;" id="${id}">   
          <div class="d-flex justify-content-end"> <a href="#" class="deleteWidget"><i class="bi bi-x-circle text-danger p-3"></i></a></div>  
            <div class="card-body"> 
                <h5 class="card-title text-center d-flex align-items-center flex-column">
                    <img style="width: 30px; height: 30px" src="http://localhost:8080/images/${data.symbol.toString()}.png" alt="" />
                    ${data.name}\'s stats
                </h5>
                <div class="d-flex justify-content-center flex-column align-items-center">
                    <p class="temp">Current price: ${(data.quote.USD.price).toFixed(5)}$ </p>
                    <p>Market cap: ${Math.round(data.quote.USD.market_cap)}$</p>
                    
                    <p>Fluctuation on:</p>
                    <p class='${(data.quote.USD.percent_change_1h < 0 ? "text-danger" : "text-success")}'>Last hour: ${(data.quote.USD.percent_change_1h).toFixed(2)}%</p>
                    <p class='${(data.quote.USD.percent_change_24h < 0 ? "text-danger" : "text-success")}'>Last 24h: ${(data.quote.USD.percent_change_24h).toFixed(2)}%</p>
                    <p class='${(data.quote.USD.percent_change_30d < 0 ? "text-danger" : "text-success")}'>Last 30 days: ${(data.quote.USD.percent_change_30d).toFixed(2)}%</p>
                    
                </div>
            </div>
        </div>
    `)
    return element;
}
export const mediaCard = async (country, id) => {
    const data = await fetch(`https://newsdata.io/api/1/news?apikey=pub_13387abf01cd32e7e4ba58f052e6d818b45d9&language=${country}
`)
        .then(res => res.json())
        .then(res => res)
    let element = (`
               <div class="card widget-card m-2 overflow-auto" style="width: 18rem;height: 400px" id="${id}"> 
                      <div class="d-flex justify-content-end"> <a href="#" class="deleteWidget"><i class="bi bi-x-circle text-danger p-3"></i></a></div>  
                    <div class="card-body">    
                        <h4 class="card-title text-center d-flex align-items-center flex-column">
                            Lastest news (${country})
                        </h4>
                        <div class="d-flex pt-2 justify-content-center flex-column align-items-center " >`);
    for (const news of data.results) {
        element += `<div class=" m-1 card" >
                                        <div class="card-body"
                                            <p> <a class="article" target="_blank" href="${news.link}" > Title : ${news.title} </a></p>
                                            <p>Category : ${news.category[0]}</p>
                                            <p>Description : ${news.description}</p>
                                            <p><a target="_blank" href="${news.link}">article's link</a> </p>
                                        </div>
                                   </div>`
    }
    element += (`        </div>
                    </div>
                    </a>
                </div>
              `)
    return element;
}
export const pokemonCard = async (name, id)=>{
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res=>res.json())
        .then(res=>res)
    let element = (`
        <div class="card widget-card m-2" id="${id}" style="width: 18rem;">  
          <div class="d-flex justify-content-end"> <a href="#" class="deleteWidget"><i class="bi bi-x-circle text-danger p-3"></i></a></div>  
 
            <div class="card-body">      
                <h4 class="card-title  text-center d-flex align-items-center flex-column">
                    ${name.toUpperCase()}
                </h4>
                <div class="d-flex justify-content-center flex-column align-items-center">
                    <img src="${data.sprites.other["official-artwork"].front_default}" style="height: 100px" />
                    <div>
                        <p>Abilities:</p>
                        <div class="d-flex flex-wrap">`)
                        for (const result of data.abilities) {
                            element += `<p class="col-6">${result.ability.name}</p>`
                        }
                       element +=(` </div>
                    </div> 
                </div>
            </div>
        </div>
    `)
    return element;

}
export const dogCard = async (breed, id)=>{

    let url = `https://dog.ceo/api/breed/${breed.replace('-','/')}/images/random`
    const data = await fetch(url)
        .then(res=>res.json())
        .then(res=>res)
    return (`
        <div class="card widget-card m-2" id="${id}" style="width: 18rem;">  
          <div class="d-flex justify-content-end"> <a href="#" class="deleteWidget"><i class="bi bi-x-circle text-danger p-3"></i></a></div>  
            
            <div class="card-body"> 
                 
                <h4 class="card-title text-center d-flex align-items-center flex-column">
                    Breed: ${breed.toUpperCase()}
                </h4>
                
            </div>
            <img src="${data.message}" class="card-img-top" alt="...">
        </div>
    `)

}

export const dictionaryCard = async (word, id) => {
    const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())
        .then(res => res[0])
    let element = (`
        <div class="card widget-card m-2" style="width: 18rem;" id="${id}">  
          <div class="d-flex justify-content-end"> <a href="#" class="deleteWidget"><i class="bi bi-x-circle text-danger p-3"></i></a></div>  
 
            <div class="card-body">      
                <h4 class="card-title text-center d-flex align-items-center flex-column">
                    Definition of: ${word.toUpperCase()}
                </h4>
                <div class="d-flex justify-content-center flex-column align-items-center">
                    <h4 class="temp"></h4>
                    <figure  class="col-12">
                        <figcaption>Phonetic:</figcaption>
                        <audio
                            class="col-11"
                            controls
                            src="${data.phonetics[0].audio}">
                        </audio>
                    </figure>

                    <div class="overflow-auto" style="height: 200px">Definition:`)
    for (const meaning of data.meanings) {
        element += `<p>Part of speech: ${meaning.partOfSpeech}</p>`
        element+= `<p>Definition: ${meaning.definitions[0].definition}</p>`
        element+='<label>Synonyms:</label>'
        element += '<ul>'
        for (const synonym of meaning.synonyms) {
            element+= `<li>${synonym}</li>`
        }
        element += "</ul>"
    }


   element += (` </div>
                </div>
            </div>
        </div>
    `);
    return element;

}

export const chuckNorisCard = async (category, id) => {
    const data = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then(res => res.json())
        .then(res => res)
    return (`
        <div class="card widget-card m-2" style="width: 18rem;" id="${id}">  
          <div class="d-flex justify-content-end"> <a href="#" class="deleteWidget"><i class="bi bi-x-circle text-danger p-3"></i></a></div>  
            <div class="card-body">      
                <h4 class="card-title text-center d-flex align-items-center flex-column">
                    Joke of the day (By Chuck)
                </h4>
                <div class="d-flex justify-content-center flex-column align-items-center">
                    <h4 class="temp">Category: ${data.categories[0]}</h4>
                    <div class="desc">${data.value}</div>
                </div>
            </div>
        </div>
    `)

}