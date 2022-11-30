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
@Table(name="widgets")
@Getter
@Setter
@NoArgsConstructor
public class Widgets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_widget")
    private int id_widget;

    @Column(name="widget_name")
    private String widget_name;

    @Column(name="service_id")
    private int service_id;
}