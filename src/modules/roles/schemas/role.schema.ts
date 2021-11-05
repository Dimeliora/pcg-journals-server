import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ default: 'USER', unique: true })
  value: string;

  @Prop()
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
