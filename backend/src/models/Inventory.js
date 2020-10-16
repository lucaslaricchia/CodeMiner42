import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Survivor from './Survivor';


@Entity('inventory')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id;
    
    @OneToOne(()=> Survivor, survivor => survivor.inventory_id, {
        cascade: ['insert' , 'update']
    })
    @JoinColumn({ name: 'id' })
    survivors;
}