
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
  @Prop({required: true, type: 'string', min:[3,'you is not logged in'], max:[9,'you are logged in']})
  name: string;



  @Prop({required: true, type: 'string', unique: true})
  email: string;



  @Prop({required: true, type: 'string', min:[3,'you is not logged in'], max:[9,'you are logged in']})
  password: string;


  @Prop({ type: 'string',enum: ["Admin","User"]})
  role: string;


@Prop({
   type: 'string'
 }) 
Avatar: string;



@Prop({
  type: 'Number'
})
Age: string;


@Prop({
  type: 'string'
})
PhoneNumber: string;



@Prop({
  type: 'string'
})
Address: string;


@Prop({
  type: 'Boolean',
  enum: ['true', 'false']

})
Active: boolean;



@Prop({
  type: 'string'
})
VerificationCode: string;



@Prop({
  type: 'string',
  enum: ['male', 'female']
})
gender: string;

}


export const UserSchema = SchemaFactory.createForClass(User);
