import { EntitySchema } from 'typeorm'

export const Survivor = new EntitySchema({
  name: 'survivors',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    infected: {
      type: Boolean,
    },
    infected_reports: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
})
