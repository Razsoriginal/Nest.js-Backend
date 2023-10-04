import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    async createUser(
        @Body() user: CreateUserDto
    ): Promise<User> {
        return this.userService.create(user);
    }

    @Get(':id')
    async getUser(
        @Param('id') id: string
    ): Promise<User> {
        return this.userService.findById(id);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() user: UpdateUserDto,
    ): Promise<User> {
        return this.userService.updateById(id, user);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id: string
    ): Promise<User> {
        return this.userService.deleteById(id);
    }

    @Get('email/:email') 
    async getUserByMail(
        @Param('email') email: string 
    ): Promise<User> {
        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return user;
    }

    @Put('email/:email') 
    async updateUserByEmail(
        @Param('email') email: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        const updatedUser = await this.userService.updateUserByEmail(email, updateUserDto);

        if (!updatedUser) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return updatedUser;
    }

    @Delete('email/:email') 
    async deleteUserByEmail(
        @Param('email') email: string
    ): Promise<User> {
        return this.userService.deleteUserByEmail(email);
    }
}
