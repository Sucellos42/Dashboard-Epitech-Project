package Main.controllers;

import java.util.List;

import Main.repository.UserServicesRepository;
import Main.repository.UserWidgetsRepository;
import Main.repository.UsersRepository;
import net.minidev.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import Main.modeles.Services;
import Main.service.Service;

import lombok.AllArgsConstructor;
@RequestMapping("/services")
@RestController
@AllArgsConstructor
public class ServiceController {
    private final Service myService;
    private UsersRepository usersRepo;
    protected UserServicesRepository userServicesRepository;
    protected UserWidgetsRepository userWidgetsRepository;

    @PostMapping("/create")
    public Services create(@RequestBody Services service){
        return myService.create(service);
    }
    @GetMapping("/read")
    public List<Services> read(){
        System.out.println(myService.read());
        return myService.read();
    }

    @GetMapping("/initDashboard/{id}")
    @ResponseBody
    public List showid(@PathVariable Integer id){
        return usersRepo.findAllDataUser(id);
    }
    // @RequestMapping(path = "/",method = RequestMethod.GET)
    @GetMapping("/helloworld")
    public String test(){
        return "Hello world";
    }

    @PostMapping(
            value = "/deleteWidget",
            //accept from the client
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            //accept to sent back to the client
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    @CrossOrigin
    public JSONObject deleteUsUw (@RequestBody JSONObject body) {
        int id = (int) body.get("id_widget");
        userServicesRepository.deleteUserServiceAndUserWidget(id);
        return body;
    }
}
