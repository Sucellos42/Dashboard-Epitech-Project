package Main.service;

import Main.modeles.UserWidgets;
import Main.modeles.Widgets;
import Main.repository.UserWidgetsRepository;
import lombok.AllArgsConstructor;

import java.util.List;
@org.springframework.stereotype.Service

@AllArgsConstructor
public class ServiceUserWidget {
    private UserWidgetsRepository userWidgetsRepository;

    public UserWidgets create(UserWidgets userWidgets) {
        // TODO Auto-generated method stub
        return null;
    }
    public UserWidgets delete(UserWidgets userWidgets) {
        // TODO Auto-generated method stub
        return null;
    }

    public List<UserWidgets> read() {
        return (List<UserWidgets>) userWidgetsRepository.findAll();

    }
}
