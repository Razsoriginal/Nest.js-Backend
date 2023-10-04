import { Module } from '@nestjs/common';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QnaSchema } from './schemas/qna.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Qna', schema: QnaSchema }]),
  ],
  controllers: [QnaController],
  providers: [QnaService]
})
export class QnaModule {}
