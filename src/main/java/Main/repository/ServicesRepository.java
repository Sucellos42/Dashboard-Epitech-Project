package Main.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import Main.modeles.Services;

@Repository
public interface ServicesRepository extends CrudRepository<Services,Long> {
    
}
