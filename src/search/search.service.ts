import { Injectable } from '@nestjs/common'
import { Availability } from 'src/availability/availability.interface'
import { ClinicService } from 'src/clinic/clinic.service'
import { StateCodes } from 'src/utils/enum/stateCodes'
import { States } from 'src/utils/enum/states'

@Injectable()
export class SearchService {
  constructor(private clinicService: ClinicService) {}
  async search(name: string, state: string, availability: Availability) {
    let searchParams = {}
    if (name) {
      searchParams = {
        ...searchParams,
        name: name,
      }
    }
    if (availability) {
      searchParams = {
        ...searchParams,
        availability: availability,
      }
    }
    if (state && state.length >= 2) {
      let stateVal: string
      let stateCodeVal: string
      const value =
        state.length > 2
          ? States[state as keyof typeof States]
          : StateCodes[state as keyof typeof StateCodes]
      if (value) {
        const num = value.valueOf()
        stateVal = States[num]
        stateCodeVal = StateCodes[num]
        searchParams = {
          ...searchParams,
          stateName: stateVal,
          stateCode: stateCodeVal,
        }
      }
    }
    const results = await this.clinicService.get(searchParams)
    return results
  }
}
