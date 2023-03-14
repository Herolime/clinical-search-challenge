import { Availability } from 'src/availability/availability.interface'

export interface Clinic {
  name?: string
  clinicName?: string
  stateName?: string
  stateCode?: string
  availability?: Availability
  opening?: Availability
}
