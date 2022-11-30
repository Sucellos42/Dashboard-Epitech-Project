package Main.service;

import java.util.List;

import Main.modeles.Services;
import Main.repository.ServicesRepository;

import lombok.AllArgsConstructor;

@org.springframework.stereotype.Service
@AllArgsConstructor
public class Service implements iService{
    private final ServicesRepository demo;
    @Override
    public Services create(Services service) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Services> read() {
        // TODO Auto-generated method stub
        return (List<Services>) demo.findAll();
    }
    
}
