import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, NotFoundException } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './schemas/article.schema';
import { CreateArticleDto } from './schemas/dto/create-article.dto';
import { UpdateArticleDto } from './schemas/dto/update-acrticle.dto';

@Controller('article')
export class ArticleController {
    constructor(
        private articleService: ArticleService
    ) {}

    @Get()
    async getAllArticle(): Promise<Article[]> {
        return this.articleService.findAll();
    }

    @Post()
    async createArticle(
        @Body() article: CreateArticleDto
    ): Promise<Article> {
        return this.articleService.create(article);
    }

    @Get(':id')
    async getArticle(
        @Param('id') id: string
    ): Promise<Article> {
        return this.articleService.findById(id);
    }

    @Put(':id')
    async updateArticle(
        @Param('id') id: string,
        @Body() article: UpdateArticleDto,
    ): Promise<Article> {
        return this.articleService.updateById(id, article);
    }

    @Delete(':id')
    async deleteArticle(
        @Param('id') id: string
    ): Promise<Article> {
        return this.articleService.deleteById(id);
    }

    @Get('title/:title') 
    async getArticleByTitle(
        @Param('title') title: string 
    ): Promise<Article> {
        const article = await this.articleService.findArticleByTitle(title);

        if (!title) {
            throw new NotFoundException(`Article with this ${title} not found`);
        }

        return article;
    }

    @Put('title/:title') 
    async updateArticleByTitle(
        @Param('title') title: string,
        @Body() updateArticleDto: UpdateArticleDto,
    ): Promise<Article> {
        const updatedArticle = await this.articleService.updateArticleByTitle(title, updateArticleDto);

        if (!updatedArticle) {
            throw new NotFoundException(`Article with ${title} not found`);
        }

        return updatedArticle;
    }
}
