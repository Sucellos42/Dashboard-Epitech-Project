export const meteo = async (info)=>{
    let city = $(".city").val();
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=f4dd4bc486ec1bd5be709498385b6cd0&lang=fr`)
    .then(res=>res.json())
    .then(res=>res)
    const json =   {
        "service_id": info.id_service,
        "user_id": info.id_user,
        "widget_id": 2,
        "param": city,
        "message": data.message,
        "status" : data.status
    }


    if (data["cod"] > 299) {
        alert("Ville non trouvée")
    } else {
        let services = await fetch("http://localhost:8080/meteo/insertMeteo",
        {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(json)
            }
        )
        .then(r => r.json())
        .then(res=>console.log(res))

    }


    $(".modal").hide()
    for (const modal of $(".modal")) {
        modal.style.display = "none"
    }
}

export const cryptos = async (info)=>{
    const symbol = ["BTC", "ETH", "USDT", "BNB", "USDC", "BUSD", "XRP", "ADA", "DOGE", "MATIC", "DOT", "DAI", "SHIB", "TRX", "SOL", "AVAX", "UNI", "WBTC", "LTC", "LEO", "ATOM", "LINK", "ETC", "XLM", "XMR", "CRO", "ALGO", "BCH", "NEAR", "TON", "VET", "FIL", "QNT", "FLOW", "LUNC", "OKB", "HBAR", "CHZ", "ICP", "EGLD", "HT", "XTZ", "THETA", "USDP", "SAND", "MANA", "AAVE", "XCN", "EOS"]
    let cryptoSymbol = $(".select-crypto").val();
    const json =   {
        "service_id": info.id_service,
        "user_id": info.id_user,
        "widget_id": 1,
        "param": cryptoSymbol
    }

    let services = await fetch("http://localhost:8080/crypto/insertCrypto",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)


    })
        .then(r => r.json())
        .then(res=>console.log(res))

    $(".modal").hide()
    for (const modal of $(".modal")) {
        modal.style.display = "none"
    }
}

export const media = async (info)=>{
    let langue = $(".select-langue").val();
    console.log(langue)
    const json =   {
        "service_id": info.id_service,
        "user_id": info.id_user,
        "widget_id": 3,
        "param": langue
    }

    let services = await fetch("http://localhost:8080/media/insertMedia",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)


    })
        .then(r => r.json())
        .then(res=>console.log(res))

    $(".modal").hide()
    for (const modal of $(".modal")) {
        modal.style.display = "none"
    }
}

export const pokemon = async (name)=>{
    let pokemonName = $(".pokemon").val();

    const json =   {
        "service_id": name.id_service,
        "user_id": name.id_user,
        "widget_id": 5,
        "param": pokemonName
    }

    let services = await fetch("http://localhost:8080/pokemon/insertPokemon",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)
    })
        .then(r => r.json())
        .then(res => {
            if (res.status) {
                alert("Pokemon doesn't exists")
            }
        })

    $(".modal").hide()
    for (const modal of $(".modal")) {
        modal.style.display = "none"
    }
}

export const dog = async (name)=>{
    let race = $(".breed").val();
    console.log(race)
    const json =   {
        "service_id": name.id_service,
        "user_id": name.id_user,
        "widget_id": 6,
        "param": race
    }
    console.log(json)

    let services = await fetch("http://localhost:8080/dog/insertDog",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)
    })
        .then(r => r.json())
        .then(res=>console.log(res))

    $(".modal").hide()
    for (const modal of $(".modal")) {
        modal.style.display = "none"
    }
}

export const dictionary = async (name)=>{
    let race = $(".word").val();
    const json =   {
        "service_id": name.id_service,
        "user_id": name.id_user,
        "widget_id": 7,
        "param": race
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${race}`).then(res=>{
        if(res.status != 200)
            alert("Word not found")
        else{
            fetch("http://localhost:8080/dictionary/insertDictionary",{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(json)
            })
        }
    })


    $(".modal").hide()
    for (const modal of $(".modal")) {
        modal.style.display = "none"
    }
}

export const chucknorisjoke = async (name)=>{
    let race = $(".categorie").val();
    console.log(race)
    const json =   {
        "service_id": name.id_service,
        "user_id": name.id_user,
        "widget_id": 8,
        "param": race
    }
    console.log(json)

    let services = await fetch("http://localhost:8080/chucknorisjoke/insertChucknoris",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)
    })
        .then(r => r.json())
        .then(res=>console.log(res))

    $(".modal").hide()
    for (const modal of $(".modal")) {
        modal.style.display = "none"
    }
}