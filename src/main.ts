import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'reflect-metadata'
import { genDoc } from './document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await genDoc(app)
  await app.setGlobalPrefix('/api')
  await app.listen(3000)
}

bootstrap()
