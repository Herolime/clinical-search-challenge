import { Module } from '@nestjs/common'
import { SearchModule } from './search/search.module'
import { ClinicService } from './clinic/clinic.service'
import { ClinicModule } from './clinic/clinic.module'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [SearchModule, ClinicModule, HttpModule],
  providers: [ClinicService],
})
export class AppModule {}
