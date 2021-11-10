import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Base } from '../../../interfaces/base.interface';
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

  @Prop({ type: String, default: 'н/д' })
  formFactor: string;

  @Prop({ type: String, default: 'н/д' })
  motherboard: string;

  @Prop({ type: String, default: 'н/д' })
  typeOfSocket: string;

  @Prop({ type: String, default: 'н/д' })
  numOfSockets: string;

  @Prop({ type: String, default: 'н/д' })
  maxRamSize: string;

  @Prop({ type: String, default: 'н/д' })
  sataType: string;

  @Prop({ type: String, default: 'н/д' })
  numOfSataPorts: string;

  @Prop({ type: String, default: 'н/д' })
  numOfPsu: string;

  @Prop({ type: String, default: 'н/д' })
  psuPower: string;

  @Prop({ type: String, default: 'н/д' })
  os: string;

  @Prop({ type: String, default: 'н/д' })
  numOfCpu: string;

  @Prop({ type: String, default: 'н/д' })
  cpuModel: string;

  @Prop({ type: String, default: 'н/д' })
  numOfCores: string;

  @Prop({ type: String, default: 'н/д' })
  cpuFrequency: string;

  @Prop({ type: String, default: 'н/д' })
  cpuL1Cache: string;

  @Prop({ type: String, default: 'н/д' })
  cpuL2Cache: string;

  @Prop({ type: String, default: 'н/д' })
  cpuL3Cache: string;

  @Prop({ type: String, default: 'н/д' })
  ramType: string;

  @Prop({ type: String, default: 'н/д' })
  ramTotalModules: string;

  @Prop({ type: String, default: 'н/д' })
  ramTotalSize: string;

  @Prop([RamModule])
  ramModules: RamModule[];

  @Prop({ type: String, default: 'н/д' })
  raid: string;

  @Prop({ type: String, default: 'н/д' })
  raidMode: string;

  @Prop({ type: String, default: 'н/д' })
  totalDiskSpace: string;

  @Prop([HDD])
  disks: HDD[];

  @Prop({ type: String, default: 'н/д' })
  cpuUpgrade: string;

  @Prop({ type: String, default: 'н/д' })
  ramUpgrade: string;

  @Prop({ type: String, default: 'н/д' })
  hddUpgrade: string;

  @Prop([PCBackup])
  pcBackups: PCBackup[];

  @Prop()
  pcComments: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  lastModifier: User;
}

export const ComputerSchema = SchemaFactory.createForClass(Computer);

ComputerSchema.pre<Computer>('save', function (next) {
  const ramTotalSize = this.ramModules.reduce(
    (sum, item) => sum + Number.parseFloat(item.ramModuleSize),
    0,
  );

  if (ramTotalSize > 0) {
    this.ramTotalSize = ramTotalSize.toFixed(1);
  }

  next();
});

ComputerSchema.pre<Computer>('save', function (next) {
  const numOfSockets = Number.parseInt(this.numOfSockets, 10);
  const numOfCpu = Number.parseInt(this.numOfCpu, 10);

  if (!Number.isNaN(numOfSockets) && !Number.isNaN(numOfCpu)) {
    this.cpuUpgrade = this.numOfSockets > this.numOfCpu ? 'Да' : 'Нет';
  }

  next();
});

ComputerSchema.pre<Computer>('save', function (next) {
  const ramTotalModules = Number.parseInt(this.ramTotalModules, 10);
  const maxRamSize = Number.parseInt(this.maxRamSize, 10);
  const ramTotalSize = Number.parseInt(this.ramTotalSize, 10);

  if (
    Number.isNaN(ramTotalModules) ||
    Number.isNaN(maxRamSize) ||
    Number.isNaN(ramTotalSize)
  ) {
    return next();
  }

  const additionalModules = ramTotalModules - this.ramModules.length;
  const availableSpace = maxRamSize - ramTotalSize;

  if (additionalModules > 0 && availableSpace > 0) {
    this.ramUpgrade = `Модулей: ${additionalModules}, суммарно на: ${availableSpace} Гб`;
  } else {
    this.ramUpgrade = 'Нет';
  }

  next();
});

ComputerSchema.pre<Computer>('save', function (next) {
  const numOfSataPorts = Number.parseInt(this.numOfSataPorts, 10);

  if (!Number.isNaN(numOfSataPorts)) {
    const additionalDisks = numOfSataPorts - this.disks.length;
    this.hddUpgrade =
      additionalDisks > 0 ? `Дисков: ${additionalDisks}` : 'Нет';
  }

  next();
});
