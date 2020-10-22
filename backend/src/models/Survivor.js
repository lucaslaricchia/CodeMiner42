import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'

import { Inventory } from './Inventory'

@Entity("survivors")
export class Survivor {
  @PrimaryGeneratedColumn('increment')
  id  = undefined

  @Column('varchar')
  name = ''

  @Column('integer')
  age = 0

  @Column('varchar')
  gender = ''

  @Column('boolean')
  infected = false

  @Column('integer')
  infected_reports = 0

  @Column('decimal')
  latitude = 0

  @Column('decimal')
  longitude = 0

  @OneToOne(type => Inventory, inventory => inventory.survivor)
  @JoinColumn()
  inventory = undefined;
}
