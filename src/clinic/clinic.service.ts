import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AxiosError } from 'axios'
import { catchError, firstValueFrom } from 'rxjs'
import { Availability } from 'src/availability/availability.interface'
import { Clinic } from './clinic.interface'

@Injectable()
export class ClinicService {
  constructor(private readonly httpService: HttpService) {}

  async get(searchParams: {
    name?: string
    stateName?: string
    stateCode?: string
    availability?: Availability
  }): Promise<Clinic[]> {
    const dentalClinics = await this.getFromClinic()
    const vetClinics = await this.getFromVet()
    let allClinics = [...dentalClinics, ...vetClinics]

    if (searchParams.name) {
      allClinics = allClinics.filter(
        (c) =>
          (c.name && c.name === searchParams.name) ||
          c.name?.includes(searchParams.name) ||
          (c.clinicName && c.clinicName === searchParams.name) ||
          c.clinicName?.includes(searchParams.name),
      )
    }

    if (searchParams.stateName || searchParams.stateCode) {
      allClinics = allClinics.filter(
        (c) =>
          (searchParams.stateName && c.stateName === searchParams.stateName) ||
          (searchParams.stateCode && c.stateCode === searchParams.stateCode),
      )
    }

    if (searchParams.availability) {
      allClinics = allClinics.filter(
        (c) =>
          c.opening?.from === searchParams.availability.from ||
          c.opening?.to === searchParams.availability.to ||
          c.availability?.from === searchParams.availability.from ||
          c.availability?.to === searchParams.availability.to,
      )
    }

    return allClinics
  }

  private async getFromClinic(): Promise<Clinic[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Clinic[]>(
          'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json',
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data)
            throw 'An error happened!'
          }),
        ),
    )

    return data
  }

  private async getFromVet(): Promise<Clinic[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Clinic[]>(
          'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json',
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data)
            throw 'An error happened!'
          }),
        ),
    )

    return data
  }
}
