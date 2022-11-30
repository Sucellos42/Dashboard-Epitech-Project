package Main.controllers;

import Main.modeles.UserServices;
import Main.modeles.UserWidgets;
import Main.modeles.Widgets;
import Main.repository.UserServicesRepository;
import Main.repository.UserWidgetsRepository;
import lombok.AllArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/media")
public class MediaController {
    @Autowired
    private UserServicesRepository userServicesRepository;
    private UserWidgetsRepository userWidgetsRepository;

    @PostMapping(
            value = "/insertMedia",
            //accept from the client
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            //accept to sent back to the client
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    @CrossOrigin
    public JSONObject insertServiceWidgetUser (@RequestBody JSONObject body, UserServices userServices, UserWidgets userWidgets, Widgets widgets){
        //insert service_user
        userServices.setService_id((int) body.get("service_id"));
        userServices.setUser_id((int) body.get("user_id"));
        System.out.println(userServices.getService_id());
        this.userServicesRepository.save(userServices);

        //insert widget
        widgets.setService_id((int) body.get("service_id"));

        //insert widget_user
        userWidgets.setParams((String) body.get("param"));
        userWidgets.setUser_services_id(Math.toIntExact(userServices.getId_us()));
        userWidgets.setWidget_id((Integer) body.get("widget_id"));
        this.userWidgetsRepository.save(userWidgets);
        return body;
        //Instantiate new model and append json to the model
        // serviceUserServices.create(model);
    }
}
