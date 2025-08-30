import { Collections } from "@app/shared";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SchemaTypes, Types } from 'mongoose'

export type UserDocument = User & Document;

@Schema({ _id: false })
export class Phone {

    @ApiProperty({ type: Number })
    @Prop({ type: Number, required: true, unique: true })
    number: number;

    @ApiProperty({ type: Number })
    @Prop({ type: Number, required: true })
    countryCode: number;

    @ApiPropertyOptional({ type: String })
    @Prop({ type: String, required: false, unique: true })
    combinedNumber: string;
}

@Schema({ collection: Collections.users, timestamps: true })
export class User {

    @ApiProperty({ type: String })
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: Types.ObjectId;

    @ApiProperty({ type: String })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ type: String })
    @Prop({ required: true, unique: true })
    email: string;

    @ApiProperty({ type: Phone })
    @Prop({ type: Phone })
    phone: Phone;

    @ApiProperty({ type: String })
    @Prop({ type: String, required: false })
    profile: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', function (next) {
    if (this.phone?.countryCode && this.phone?.number) {
        this.phone.combinedNumber = `${this.phone.countryCode}${this.phone.number}`;
    }
    next();
});

UserSchema.pre(['updateOne', 'findOneAndUpdate', 'updateMany'], async function (next) {
    const update = this.getUpdate() as any;

    if (update.phone?.countryCode || update.phone?.number) {
        // Attempt to get current phone values from the DB if one of them is missing
        let countryCode = update.phone?.countryCode;
        let phoneNumber = update.phone?.number;

        if (!countryCode || !phoneNumber) {
            const query = this.getQuery();
            const doc = await this.model.findOne(query).lean<User>().exec();

            if (!doc) return next();

            if (!countryCode) {
                countryCode = doc?.phone?.countryCode;
            }
            if (!phoneNumber) {
                phoneNumber = doc?.phone?.number;
            }
        }

        if (countryCode && phoneNumber) {
            update.combinedNumber = `${countryCode}${phoneNumber}`;
            this.setUpdate(update);
        }
    }
    next();
});
