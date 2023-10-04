import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, NotFoundException } from '@nestjs/common';
import { QnaService } from './qna.service';
import { Qna } from './schemas/qna.schema';
import { UpdateQnaDto } from './dto/update-qna.dto';
import { CreateQnaDto } from './dto/create-qna.dto';

@Controller('qna')
export class QnaController {
    constructor(
        private qnaService: QnaService
    ) {}

    @Get()
    async getAllQna(): Promise<Qna[]> {
        return this.qnaService.findAll();
    }

    @Post()
    async createQna(
        @Body() qna: CreateQnaDto
    ): Promise<Qna> {
        return this.qnaService.create(qna);
    }

    @Get(':id')
    async getQna(
        @Param('id') id: string
    ): Promise<Qna> {
        return this.qnaService.findById(id);
    }

    @Put(':id')
    async updateQna(
        @Param('id') id: string,
        @Body() qna: UpdateQnaDto,
    ): Promise<Qna> {
        return this.qnaService.updateById(id, qna);
    }

    @Delete(':id')
    async deleteQna(
        @Param('id') id: string
    ): Promise<Qna> {
        return this.qnaService.deleteById(id);
    }

    @Get('title/:title') 
    async getQnaByTitle(
        @Param('title') title: string 
    ): Promise<Qna> {
        const qna = await this.qnaService.findQnaByTitle(title);

        if (!title) {
            throw new NotFoundException(`Qna with this ${title} not found`);
        }

        return qna;
    }

    @Put('title/:title') 
    async updateQnaByTitle(
        @Param('title') title: string,
        @Body() updateQnaDto: UpdateQnaDto,
    ): Promise<Qna> {
        const updatedQna = await this.qnaService.updateQnaByTitle(title, updateQnaDto);

        if (!updatedQna) {
            throw new NotFoundException(`Qna with ${title} not found`);
        }

        return updatedQna;
    }
}
