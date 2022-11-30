package Main.repository;

import Main.modeles.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    public Users findByEmail(String email);

    @Query(
            value = "SELECT u.id_user,u.email,uss.service_id,uww.params, uww.id_uw FROM users u "+
            "INNER JOIN user_services uss on u.id_user = uss.user_id "+
            "INNER JOIN user_widget uww on uss.id_us = uww.user_service_id "+
            "WHERE u.id_user = ?1",
            nativeQuery = true)
    List findAllDataUser(Integer id_user);
}