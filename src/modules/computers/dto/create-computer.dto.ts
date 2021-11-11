import { IsNotEmpty } from 'class-validator';

import {
  NOT_AN_EMPTY_PCTYPE_ERROR,
  NOT_AN_EMPTY_PCNAME_ERROR,
  NOT_AN_EMPTY_PCPURPOSE_ERROR,
} from '../computer.constants';

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

export class PCComment {
  commentUsername: string;
  commentDate: string;
  commentText: string;
}

export class CreateComputerDTO {
  @IsNotEmpty({ message: NOT_AN_EMPTY_PCTYPE_ERROR })
  pcType: string;

  @IsNotEmpty({ message: NOT_AN_EMPTY_PCNAME_ERROR })
  pcName: string;

  @IsNotEmpty({ message: NOT_AN_EMPTY_PCPURPOSE_ERROR })
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
  pcComments: PCComment[];
}
