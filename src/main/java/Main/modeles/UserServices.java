package Main.modeles;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.GenerationType;
import javax.persistence.Column;

@Entity
@Table(name="user_services")
@Getter
@Setter
@NoArgsConstructor
public class UserServices {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_us")
    private Long id_us;

    @Column(name="service_id")
    private int service_id;

    @Column(name="user_id")
    private int user_id;

    @Column(name="token_access")
    private String token_access;

    @Column(name="token_refresh")
    private String token_refresh;
}