import { Collections } from "@app/shared";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../entities/user.entity";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(Collections.users) private userModel: Model<User>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = await new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(query: FilterQuery<User>): Promise<User | null> {
        return await this.userModel.findOne(query).exec();
    }

    async update(query: FilterQuery<User>, updateQuery: UpdateQuery<User>): Promise<User | null> {
        return await this.userModel.findOneAndUpdate(query, updateQuery, { new: true }).exec();
    }

    async remove(query: FilterQuery<User>): Promise<User | null> {
        return await this.userModel.findOneAndDelete(query).exec();
    }
}