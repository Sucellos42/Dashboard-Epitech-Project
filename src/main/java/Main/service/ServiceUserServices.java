package Main.service;

import Main.modeles.UserServices;
import Main.repository.UserServicesRepository;
import lombok.AllArgsConstructor;

@org.springframework.stereotype.Service
@AllArgsConstructor
public class ServiceUserServices{
    private final UserServicesRepository demo;
    public void create(UserServices userServices) {
        demo.save(userServices);
    }


}
