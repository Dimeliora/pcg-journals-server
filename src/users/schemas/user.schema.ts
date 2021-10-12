import { Document, Schema as MongooseSchema } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Role } from '../../roles/schemas/role.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    required: true,
    ref: Role.name,
  })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
