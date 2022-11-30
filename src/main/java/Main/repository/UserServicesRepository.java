package Main.repository;

import Main.modeles.UserServices;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public interface UserServicesRepository extends CrudRepository<UserServices,Long> {

    @Modifying
    @Query(
            value = "delete user_services, user_widget " +
                    "FROM user_services " +
                    "join user_widget on user_services.id_us = user_widget.user_service_id " +
                    "where id_uw = ?1",
            nativeQuery = true)
    void deleteUserServiceAndUserWidget(Integer id_widget);
}
