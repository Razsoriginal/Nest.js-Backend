import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Qna } from './schemas/qna.schema';
import { UpdateQnaDto } from './dto/update-qna.dto';
  

@Injectable()
export class QnaService {
    constructor(
       @InjectModel(Qna.name)
       private qnaModel: mongoose.Model<Qna>
    ) {}

    async findAll(): Promise<Qna[]> {
        const qna = await this.qnaModel.find();
        return qna;
    }

    async create(qna: Qna): Promise<Qna> {
        const res = await this.qnaModel.create(qna);
        return res;
    }
    

    async findById(id: string): Promise<Qna> {
        const qna = await this.qnaModel.findById(id);

        if (!qna) {
            throw new NotFoundException('Q & A not found.');
        }

        return qna;
    }

    async updateById(id: string, qna: Qna): Promise<Qna> {
        return await this.qnaModel.findByIdAndUpdate(id, qna, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Qna> {
        return await this.qnaModel.findByIdAndDelete(id);
    }

    async findQnaByTitle(title: string): Promise<Qna | null> {
        const qna = await this.qnaModel.findOne({ title });

        return qna;
    }

    async updateQnaByTitle(title: string, updateQnaDto: UpdateQnaDto): Promise<Qna> {
        const updatedQna = await this.qnaModel.findOneAndUpdate({ title }, updateQnaDto, { new: true });

        if (!updatedQna) {
            throw new NotFoundException('Q & A not found.');
        }

        return updatedQna;
    }
}
