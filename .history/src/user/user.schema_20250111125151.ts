
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true, type: 'string', min:[3,'you is not logged in'], max:[9,'you are logged in']})
  name: string;



  @Prop({required: true, type: 'string', unique: true})
  email: string;



  @Prop({required: true, type: 'string', min:[3,'you is not logged in'], max:[9,'you are logged in']})
  password: string;


  @Prop({required: true, type: 'string',enum: ["Admin","User"]})
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
Phone-Number: string;



@Prop({
  type: 'string'
})
Avatar: string;




@Prop({
  type: 'string'
})
Avatar: string;



@Prop({
  type: 'string'
})
Avatar: string;





}


export const UserSchema = SchemaFactory.createForClass(User);
