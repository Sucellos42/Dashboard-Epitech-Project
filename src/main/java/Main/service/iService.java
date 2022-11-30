package Main.service;
import java.util.List;

import Main.modeles.Services;
public interface iService {
    Services create(Services service);  
    List<Services> read();  
}
