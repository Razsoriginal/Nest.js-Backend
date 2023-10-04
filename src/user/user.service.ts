import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
       @InjectModel(User.name)
       private userModel: mongoose.Model<User>
    ) {}

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }

    async create(user: User): Promise<User> {
        const lastUser = await this.userModel.findOne().sort('-token');

        if (lastUser) {
            user.token = lastUser.token + 1;
        } else {
            user.token = 1;
        }
    
        const res = await this.userModel.create(user);
        return res;
    }

    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;
    }

    async updateById(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email });

        return user;
    }

    async deleteUserByEmail(email: string): Promise<User> {
        const deletedUser = await this.userModel.findOneAndDelete({ email });

        if (!deletedUser) {
            throw new NotFoundException('User not found.');
        }

        return deletedUser;
    }

    async updateUserByEmail(email: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findOneAndUpdate({ email }, updateUserDto, { new: true });

        if (!updatedUser) {
            throw new NotFoundException('User not found.');
        }

        return updatedUser;
    }
}
