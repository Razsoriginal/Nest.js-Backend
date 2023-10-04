import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Article } from './schemas/article.schema';
import { UpdateArticleDto } from './schemas/dto/update-acrticle.dto';
  

@Injectable()
export class ArticleService {
    constructor(
       @InjectModel(Article.name)
       private articleModel: mongoose.Model<Article>
    ) {}

    async findAll(): Promise<Article[]> {
        const articles = await this.articleModel.find();
        return articles;
    }

    async create(article: Article): Promise<Article> {
        const res = await this.articleModel.create(article);
        return res;
    }
    

    async findById(id: string): Promise<Article> {
        const article = await this.articleModel.findById(id);

        if (!article) {
            throw new NotFoundException('Article not found.');
        }

        return article;
    }

    async updateById(id: string, article: Article): Promise<Article> {
        return await this.articleModel.findByIdAndUpdate(id, article, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Article> {
        return await this.articleModel.findByIdAndDelete(id);
    }

    async findArticleByTitle(title: string): Promise<Article | null> {
        const article = await this.articleModel.findOne({ title });

        return article;
    }

    async updateArticleByTitle(title: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
        const updatedArticle = await this.articleModel.findOneAndUpdate({ title }, updateArticleDto, { new: true });

        if (!updatedArticle) {
            throw new NotFoundException('Article not found.');
        }

        return updatedArticle;
    }
}
