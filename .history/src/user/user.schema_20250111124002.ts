
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
8uuhb   name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
