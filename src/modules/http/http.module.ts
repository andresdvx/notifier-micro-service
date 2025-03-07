import { Module } from '@nestjs/common';
import { AxiosAdapterImp } from './infraestructure/adapters/axios.adapter.imp';
import { HttpTypes } from 'src/common/contants/types';

@Module({
  providers: [
    {
      provide: HttpTypes.AxiosAdapter,
      useClass: AxiosAdapterImp,
    },
  ],
  exports: [
    {
      provide: HttpTypes.AxiosAdapter,
      useClass: AxiosAdapterImp,
    },
  ],
})
export class HttpModule {}
