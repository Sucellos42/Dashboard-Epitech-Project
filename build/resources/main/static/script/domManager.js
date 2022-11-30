import * as Widget from "./widget.js";
import * as Service from "./services.js";
import * as Creator from "./creatElement.js";

const idUser = $('.id_user').val()

///////////  FUNCTIONS   //////////////
export const selectService = async ()=>{
   
    let services = null;
    showModal("modalService")
    services = await fetch("http://localhost:8080/services/read",{
        //mode: 'no-cors',
        method: "get",
    }).then(res=>res).then(res=>res.json()).then(res=>res)
    $(".service_list").html("")
    services.forEach(service => {
        $(".service_list").append(`<li class="service list-group-item list-group-item-action" id_service="${service.id_service}">
        <i class="${service.icon}"></<i>
        <a href="#">${service.service_name}</a></li>`)
    });
    for (const service of $(".service")) {
       service.addEventListener("click",function(e){


           selectWidget({id_service:parseInt(this.attributes.id_service.value),id_user:parseInt(idUser)},this);
       })
      
    }
}
export const addElement = (container,element)=>{
    container.append(element)
}
export const selectWidget = async function(info,refThis){
    showModal("modalWidget")
    $('.widget-body').html("")
    let action = refThis.innerText.toLowerCase().trim();
    let serviceElement = Service[`${action}`]()
    addElement($('.widget-body'),serviceElement)
    let count= 0;
    $(".widgetSubmit").on("click",async (e)=>{
        count++;
        if(count < 2){

            await Widget[`${action}`](info)
            init();
        }
        return
    })
    return
   
   
}
export const closeModal = (name)=>{
    $('.'+name).hide();
}
export const showModal = (name)=>{
    $('.'+name).show();
}
function removeElement(id){
    $().remove()

}
function createAddServiceCard(){
    $('.main').append(`
        <div class="card add-service-card m-2" style="width: 18rem;"> 
            <div class="card-body">
                <a href="#" class="new_service">
                    <h4 class="card-title text-center d-flex align-items-center flex-column">
                        <span>Add service</span>
                        <i class="bi bi-plus-circle mt-3"></i>
                    </h4>
                </a>
            </div>
        </div>
    `)
    $(".new_service").on("click",selectService);
}
export const init = async ()=>{
    $('.main').html("")
    const userData = await fetch('http://localhost:8080/services/initDashboard/'+idUser)
        .then(res=>res.json())
        .then(res=>res);
    const cryptoList = await fetch('http://localhost:8080/crypto/getLast')
        .then(res=>res.json())
        .then(res=>res.data);
    console.log(userData)

    for (const widget of userData) {
        let element;
        switch (widget[2]){
            case 2:
                 element = await Creator.meteoCard(widget[3].toLowerCase().trim(), widget[4])
                 addElement($('.main'),element)
                break;
            case 3:
                let token;
                cryptoList.map(data=>{
                    if(data.symbol === widget[3])
                        token = data;
                })
<<<<<<< Updated upstream

                element = Creator.cryptoCard(token, widget[4])
                addElement($('.main'),element)

                break;
            case 4:
                element = await Creator.mediaCard(widget[3].toLowerCase().trim(), widget[4])
                addElement($('.main'),element)
                break;
=======
                element = Creator.cryptoCard(token, widget[4])
                addElement($('.main'),element)
                break;
            case 4:
                element = await Creator.mediaCard(widget[3].toLowerCase().trim(), widget[4])
                addElement($('.main'),element)
                break;
>>>>>>> Stashed changes
            case 6:
                element = await Creator.dogCard(widget[3].toLowerCase().trim(), widget[4])
                addElement($('.main'), element)
                break
            case 5:
                element = await Creator.pokemonCard(widget[3].toLowerCase().trim(), widget[4])
                addElement($('.main'), element)
                break
<<<<<<< Updated upstream
        }
    }
    let element = await Creator.chuckNorisCard("dev", 1)
    addElement($('.main'), element)
    createAddServiceCard();

    return userData;
=======
/*            case 7 :
                element = await Creator.chuckNorisCard(widget[3].toLowerCase().trim(), widget[4])
                addElement($('.main'), element)*/
        }
    }


    createAddServiceCard();
    //listener delete userservice and user widget
    $(".deleteWidget").on('click', e => {
        // e.preventDefault();
        const widgetId = e.target.parentNode.parentNode.parentNode.id
        const parseWidgetId = parseInt(widgetId)
        const parseUserId = parseInt(idUser)

        const json = {
            "id_user" : parseUserId,
            "id_widget" : parseWidgetId
        }
        fetch("http://localhost:8080/services/deleteWidget", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(json)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                // window.location.reload();
            })
    })
>>>>>>> Stashed changes
}
////////////////   LISTENERS  ///////////////////
$(".service-close").on('click',()=>closeModal("modalService"));
$(".close-service").on('click',()=>closeModal("modalService"));

$(".widget-close").on('click',()=>closeModal("modalWidget"));
$(".close-widget").on('click',()=>closeModal("modalWidget"));



<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
