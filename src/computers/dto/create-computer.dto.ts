import { IsString, IsNotEmpty } from 'class-validator';

import {
  NOT_AN_EMPTY_ERROR,
  NOT_A_STRING_ERROR,
} from '../../constants/validation.constants';

export class RamModule {
  ramModuleSize: string;
}

export class HDD {
  hddModel: string;
  hddSize: string;
  hddFormFactor: string;
  hddSmart: string;
}

export class PCBackup {
  backupDate: string;
  backupSize: string;
  backupStorage: string;
}

export class CreateComputerDTO {
  @IsNotEmpty({ message: NOT_AN_EMPTY_ERROR })
  @IsString({ message: NOT_A_STRING_ERROR })
  pcType: string;

  @IsNotEmpty({ message: NOT_AN_EMPTY_ERROR })
  @IsString({ message: NOT_A_STRING_ERROR })
  pcName: string;

  @IsNotEmpty({ message: NOT_AN_EMPTY_ERROR })
  @IsString({ message: NOT_A_STRING_ERROR })
  pcPurpose: string;

  formFactor: string;
  typeOfSocket: string;
  numOfSockets: string;
  maxRamSize: string;
  sataType: string;
  numOfSataPorts: string;
  numOfPsu: string;
  psuPower: string;
  os: string;
  numOfCpu: string;
  cpuModel: string;
  numOfCores: string;
  cpuFrequency: string;
  cpuL1Cache: string;
  cpuL2Cache: string;
  cpuL3Cache: string;
  ramType: string;
  ramTotalModules: string;
  ramModules: RamModule[];
  raidMode: string;
  totalDiskSpace: string;
  disks: HDD[];
  pcBackups: PCBackup[];
  pcComments: string;
}
