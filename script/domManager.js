import * as Widget from "./widget.js";
import * as Service from "./services.js";

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
        $(".service_list").append(`<li class="service list-group-item list-group-item-action">
        <i class="${service.icon}"></<i>
        <a href="#">${service.service_name}</a></li>`)
    });
    for (const service of $(".service")) {
       service.addEventListener("click",selectWidget)
      
    }
}
export const addElement = (container,element)=>{
    container.append(element)
}
export const selectWidget = async function(e){
    
    showModal("modalWidget")
    $('.widget-body').html("")
    let action = this.innerText.toLowerCase().trim();
    let serviceElement = Service[`${action}`]()
    addElement($('.widget-body'),serviceElement)
    let count= 0;
    $(".widgetSubmit").on("click",async (e)=>{
        count++;
        if(count < 2){
            let  widgetElement = await Widget[`${action}`]()
            addElement($('.main'),widgetElement)
            removeElement("add-service-card");
            createAddServiceCard();
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
function removeElement(name){
    $("."+name).remove()
}
function createAddServiceCard(){
    $('.main').append(`
        <div class="card add-service-card m-2" style="width: 18rem;"> 
            <div class="card-body">
                <a href="#" class="new_service">
                    <h4 class="card-title text-center d-flex align-items-center flex-column">
                        <span>Ajouter un service</span>
                        <i class="bi bi-plus-circle mt-3"></i>
                    </h4>
                </a>
            </div>
        </div>
    `)
    $(".new_service").on("click",selectService);
}
export const init = ()=>{
    $('.main').html("")
    createAddServiceCard();
}


////////////////   LISTENERS  ///////////////////
$(".service-close").on('click',()=>closeModal("modalService"));
$(".widget-close").on('click',()=>closeModal("modalWidget"));
