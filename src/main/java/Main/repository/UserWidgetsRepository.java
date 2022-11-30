package Main.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import Main.modeles.UserWidgets;

import java.util.List;

@Repository
public interface UserWidgetsRepository extends CrudRepository<UserWidgets, Long> {
}
