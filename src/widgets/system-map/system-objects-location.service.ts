import { Injectable } from '@angular/core';

export type SystemCoordinates = {
  x: number;
  y: number;
}

export interface SystemObject {
  name: string;
  nodes: SystemObject[];
}

export interface SystemObjectWithCoordinates extends SystemObject {
  coordinates: SystemCoordinates;
}

@Injectable({
  providedIn: 'root'
})
export class SystemObjectsLocationService {

  constructor() { }

  getSystemWithCoordinates(systemRoot: SystemObject): SystemObjectWithCoordinates {

  }
}
