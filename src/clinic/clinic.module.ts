import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { ClinicService } from './clinic.service'

@Global()
@Module({
  imports: [HttpModule],
  providers: [ClinicService],
  exports: [ClinicService],
})
export class ClinicModule {}
