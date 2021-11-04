import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Base } from '../../interfaces/base.interface';
import { User } from '../../users/schemas/user.schema';
import { RamModule, HDD, PCBackup } from '../dto/create-computer.dto';

export type ComputerDocument = Computer & Document;

@Schema({ timestamps: true })
export class Computer extends Base {
  @Prop({ type: String, required: true })
  pcType: string;

  @Prop({ type: String, required: true })
  pcName: string;

  @Prop({ type: String, required: true })
  pcPurpose: string;

  @Prop()
  formFactor: string;

  @Prop()
  motherboard: string;

  @Prop()
  typeOfSocket: string;

  @Prop()
  numOfSockets: string;

  @Prop()
  maxRamSize: string;

  @Prop()
  sataType: string;

  @Prop()
  numOfSataPorts: string;

  @Prop()
  numOfPsu: string;

  @Prop()
  psuPower: string;

  @Prop()
  os: string;

  @Prop()
  numOfCpu: string;

  @Prop()
  cpuModel: string;

  @Prop()
  numOfCores: string;

  @Prop()
  cpuFrequency: string;

  @Prop()
  cpuL1Cache: string;

  @Prop()
  cpuL2Cache: string;

  @Prop()
  cpuL3Cache: string;

  @Prop()
  ramType: string;

  @Prop()
  ramTotalModules: string;

  @Prop([RamModule])
  ramModules: RamModule;

  @Prop()
  raid: string;

  @Prop()
  raidMode: string;

  @Prop()
  totalDiskSpace: string;

  @Prop([HDD])
  disks: HDD;

  @Prop([PCBackup])
  pcBackups: PCBackup;

  @Prop()
  pcComments: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  lastModifier: User;
}

export const ComputerSchema = SchemaFactory.createForClass(Computer);
