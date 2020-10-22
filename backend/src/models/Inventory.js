import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm'

import { Survivor } from './Survivor'

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn('increment')
  id = undefined;

  @Column('integer')
  fijii_water = 0

  @Column('integer')
  campbell_soup = 0

  @Column('integer')
  first_aid_pouch = 0

  @Column('integer')
  ak47 = 0

  @OneToOne(type => Survivor, survivor => survivor.inventory)
  survivor = undefined;
}
