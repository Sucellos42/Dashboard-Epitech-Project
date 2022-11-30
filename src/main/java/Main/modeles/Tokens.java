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
@Table(name="tokens")
@Getter
@Setter
@NoArgsConstructor
public class Tokens {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_token")
    private Long id_token;

    @Column(name="value")
    private String value;

    @Column(name="user_id")
    private Long user_id;

    @Column(name="created_at")
    private String created_at;
}