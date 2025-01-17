
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true, type: 'string', min:[3,gfhhgf]})
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
