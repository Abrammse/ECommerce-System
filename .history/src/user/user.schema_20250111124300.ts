
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true, type: 'string', min:[3,'you is not logged in'], max:})
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
