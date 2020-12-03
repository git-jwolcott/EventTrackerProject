export class Logs {
  logId: number;
  title: string;
  type: string;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
  caloriesBurned: number;
  distance: number;
  elevationGain: number;
  pace: number;
  enabled: number;
  completed: boolean;
  completeDate: any;
  id: any;

  constructor(
    logId?: number,
    title?: string,
    type?: string,
    startTime?: string,
    endTime?: string,
    latitude?: number,
    longitude?: number,
    caloriesBurned?: number,
    distance?: number,
    elevationGain?: number,
    pace?: number,
    enabled?: number
  ) {
    this.logId = logId;
    this.title = title;
    this.type = type;
    this.startTime = startTime;
    this.endTime = endTime;
    this.latitude = latitude;
    this.longitude = longitude;
    this.caloriesBurned = caloriesBurned;
    this.distance = distance;
    this.elevationGain = elevationGain;
    this.pace = pace;
    this.enabled = enabled;
  }
}
