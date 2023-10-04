import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Quiz } from './schemas/quiz.schema';
import { UpdateQuizDto } from './schemas/dto/update-quiz-dto';
  

@Injectable()
export class QuizService {
    constructor(
       @InjectModel(Quiz.name)
       private quizModel: mongoose.Model<Quiz>
    ) {}

    async findAll(): Promise<Quiz[]> {
        const quiz = await this.quizModel.find();
        return quiz;
    }

    async create(quiz: Quiz): Promise<Quiz> {
        const res = await this.quizModel.create(quiz);
        return res;
    }

    async findById(id: string): Promise<Quiz> {
        const quiz = await this.quizModel.findById(id);

        if (!quiz) {
            throw new NotFoundException('Quiz not found.');
        }

        return quiz;
    }

    async updateById(id: string, quiz: Quiz): Promise<Quiz> {
        return await this.quizModel.findByIdAndUpdate(id, quiz, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Quiz> {
        return await this.quizModel.findByIdAndDelete(id);
    }

    async findQuizByTitle(title: string): Promise<Quiz | null> {
        const quiz = await this.quizModel.findOne({ title });

        return quiz;
    }

    async updateQuizByTitle(email: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
        const updatedQuiz = await this.quizModel.findOneAndUpdate({ email }, updateQuizDto, { new: true });

        if (!updatedQuiz) {
            throw new NotFoundException('Quiz not found.');
        }

        return updatedQuiz;
    }
}
