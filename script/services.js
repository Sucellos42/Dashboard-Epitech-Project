export const meteo = (widgetBody,Widget)=>{
   let element = (`
    <div class="mb-3">
        <label for="city" class="form-label">Nom de la ville</label>
        <input type="text" class="form-control city" id="city" placeholder="ville">
    </div>
   `)
   return element;
}
export const gmail = (widgetBody)=>{
    let element = (`
     <div class="mb-3">
         <button class="btn btn-primary authorize_button">Se connecter à Gmail</button>
     </div>
    `)
    return element;
 }