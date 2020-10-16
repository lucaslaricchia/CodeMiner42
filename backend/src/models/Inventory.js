import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Survivor from './Survivor';


@Entity('inventory')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id = null;
}