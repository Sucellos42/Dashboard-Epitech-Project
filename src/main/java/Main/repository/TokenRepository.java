package Main.repository;


import Main.modeles.Tokens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.swing.plaf.PanelUI;
import java.util.List;

@Repository
public interface TokenRepository extends JpaRepository<Tokens, String> {

    @Query(value = "SELECT value from tokens where user_id=?1",nativeQuery = true)
    public String findByUser_id(Long user_id);
}
