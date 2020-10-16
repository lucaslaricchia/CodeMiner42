import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'

import Inventory from './Inventory'

@Entity('survivors')
export default class Survivor {
  @PrimaryGeneratedColumn('increment')
  id = null

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
}
