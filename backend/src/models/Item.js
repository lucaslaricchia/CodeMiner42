import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import Inventory from './Inventory';

@Entity('item')
export default class Item {
    @PrimaryGeneratedColumn('increment')
    id = null

    @Column('varchar')
    name = ''

    @Column('integer')
    points = 0

}