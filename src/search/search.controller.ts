import { Body, Controller, Post } from '@nestjs/common'
import { SearchService } from './search.service'
import { Availability } from '../availability/availability.interface'

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Post()
  async search(
    @Body('clinicName') clinicName: string,
    @Body('state') state: string,
    @Body('availability') availability: Availability,
  ) {
    // calls service and gets value back as a response
    return await this.searchService.search(
      clinicName ?? '',
      state ?? '',
      availability,
    )
  }
}
