import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, NotFoundException } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './schemas/quiz.schema';
import { CreateQuizDto } from './schemas/dto/create-quiz.dto';
import { UpdateQuizDto } from './schemas/dto/update-quiz-dto';

@Controller('quiz')
export class QuizController {
    constructor(
        private quizService: QuizService
    ) {}

    @Get()
    async getAllQuiz(): Promise<Quiz[]> {
        return this.quizService.findAll();
    }

    @Post()
    async createQuiz(
        @Body() quiz: CreateQuizDto
    ): Promise<Quiz> {
        return this.quizService.create(quiz);
    }

    @Get(':id')
    async getQuiz(
        @Param('id') id: string
    ): Promise<Quiz> {
        return this.quizService.findById(id);
    }

    @Put(':id')
    async updateQuiz(
        @Param('id') id: string,
        @Body() quiz: UpdateQuizDto,
    ): Promise<Quiz> {
        return this.quizService.updateById(id, quiz);
    }

    @Delete(':id')
    async deleteQuiz(
        @Param('id') id: string
    ): Promise<Quiz> {
        return this.quizService.deleteById(id);
    }

    @Get('title/:title') 
    async getQuizByTitle(
        @Param('title') title: string 
    ): Promise<Quiz> {
        const quiz = await this.quizService.findQuizByTitle(title);

        if (!title) {
            throw new NotFoundException(`Quiz with this ${title} not found`);
        }

        return quiz;
    }

    @Put('title/:title') 
    async updateQuizByTitle(
        @Param('title') title: string,
        @Body() updateQuizDto: UpdateQuizDto,
    ): Promise<Quiz> {
        const updatedQuiz = await this.quizService.updateQuizByTitle(title, updateQuizDto);

        if (!updatedQuiz) {
            throw new NotFoundException(`Quiz with ${title} not found`);
        }

        return updatedQuiz;
    }
}
