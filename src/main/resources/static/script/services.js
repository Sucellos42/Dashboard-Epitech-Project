export const meteo = ()=>{
   let element = (`
    <div class="mb-3">
        <label for="city" class="form-label">City's name</label>
        <input type="text" class="form-control city" id="city" placeholder="City">
    </div>
   `)
   return element;
}
export const gmail = ()=>{
    let element = (`
     <div class="mb-3">
         <a href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount" class="btn btn-primary authorize_button">Se connecter à Gmail</a>
     </div>
    `)
    return element;
 }


export const cryptos = ()=>{
    const symbols = ["BTC", "ETH", "USDT", "BNB", "USDC", "BUSD", "XRP", "ADA", "DOGE", "MATIC", "DOT", "DAI", "SHIB", "TRX", "SOL", "AVAX", "UNI", "WBTC", "LTC", "LEO", "ATOM", "LINK", "ETC", "XLM", "XMR", "CRO", "ALGO", "BCH", "NEAR", "TON", "VET", "FIL", "QNT", "FLOW", "LUNC", "OKB", "HBAR", "CHZ", "ICP", "EGLD", "HT", "XTZ", "THETA", "USDP", "SAND", "MANA", "AAVE", "XCN", "EOS"]
    let element= '<label for="city" class="form-label">Currencie\'s selection</label>'
    element += `<select class="form-select select-crypto" aria-label="Default select example">`

    for (const symbol of symbols) {
        element += `<option value=${symbol} data-thumbnail="http://localhost:8080/dashboard#/images/abt.png">${symbol}</option>`
    }
    element += "</select>";
    return element;

}

export const media= ()=>{

    const symbols = ["fr","en","pl","ca",'jp',"ru","uk","de","it","es"]
    let element;
    element= '<label for="city" class="form-label">Language selection</label>'
    element += `<select class="form-select select-langue" aria-label="Default select example">`

    for (const symbol of symbols) {
        element += `<option value=${symbol} data-thumbnail="http://localhost:8080/dashboard#/images/abt.png">${symbol}</option>`
    }
    element += "</select>";
    return element;
}

export const pokemon = ()=>{
    let element = (`
    <div class="mb-3">
        <label for="pokemon" class="form-label">Pokemon's name (en)</label>
        <input type="text" class="form-control pokemon" placeholder="Ex: snorlax">
    </div>
   `)
    return element;
}


export const dog = ()=>{
    const breeds = ["affenpinscher","african","akita","australian-shepherd","basenji","beagle","bluetick","borzoi","bouvier","boxer","brabancon","briard","bulldog-boston","bulldog-english","bulldog-french","bullterrier-staffordshire","cattledog-australian","chihuahua","chow"]
    let element;
    element= '<label for="city" class="form-label">Breed\'s selection</label>'
    element += `<select class="form-select breed" aria-label="Default select example">`

    for (const symbol of breeds) {
        element += `<option value=${symbol}>${symbol}</option>`
    }
    element += "</select>";
    return element;
}

export const dictionary = ()=>{
    let element = (`
    <div class="mb-3">
        <label for="word" class="form-label">Word to search</label>
        <input type="text" class="form-control word" placeholder="Ex: hello">
    </div>
   `)
    return element;
}

export const chucknorisjoke = ()=>{
    const categories = ["animal","career","celebrity","dev","explicit","fashion","food","history","money","movie","music","political","religion","science","sport","travel"]
    let element;
    element= '<label for="city" class="form-label">Category\'s selection</label>'
    element += `<select class="form-select categorie" aria-label="Default select example">`

    for (const symbol of categories) {
        element += `<option value=${symbol}>${symbol}</option>`
    }
    element += "</select>";
    return element;
}