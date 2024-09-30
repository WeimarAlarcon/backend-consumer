import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'notificaciones', schema: 'public' })
export class Notificacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fechaHora: Date;

    @Column()
    mensaje: string;

    @Column()
    estado: boolean;

    @Column({ type: 'jsonb', nullable: true })  // Almacena el objeto JSON
    persona: any;
}
