import * as DomManager from './domManager.js';
DomManager.init()
//refresh des infos toutes les 5min
setInterval(()=>{
    DomManager.init()
},50000)
