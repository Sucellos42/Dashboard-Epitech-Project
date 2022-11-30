package Main.modeles;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.GenerationType;

@Entity
@Table(name="user_widget")
@Getter
@Setter
@NoArgsConstructor
public class UserWidgets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_uw")
    private Long id_uw;

    @Column(name="widget_id")
    private int widget_id;

    @Column(name="user_service_id")
    private int user_services_id;

    @Column(name= "params")
    private String params;
}