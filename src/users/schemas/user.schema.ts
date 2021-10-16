import { Document, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Role } from '../../roles/schemas/role.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({
    type: [Types.ObjectId],
    required: true,
    ref: Role.name,
  })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
