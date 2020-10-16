import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import Inventory from './Inventory';

@Entity('survivors')
export default class Survivor {

    @PrimaryGeneratedColumn('increment')
    id;

    @Column('varchar')
    name;

    @Column('integer')
    age;

    @Column('varchar')
    gender;

    @Column('boolean')
    infected;

    @Column('integer')
    infected_reports;
    
    @Column('decimal')
    latitude;

    @Column('decimal')
    longitude;

    @OneToOne(()=> Inventory, inventory => inventory.survivor, {
        cascade: ['insert' , 'update']
    })
    @JoinColumn({ name: 'id' })
    inventory;
}