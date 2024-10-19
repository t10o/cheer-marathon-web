import { Timestamp } from "firebase/firestore";

export interface Run {
  id: string;
  photos: Photo[];
  fcmToken: string;
  route: Location[];
  messages: Message[];
  startTime: string;
  endTime: string;
  status: Status;
}

export interface Photo {
  location: Location;
  photoUrl: string;
  timestamp: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Message {
  message: string;
  name: string;
  timestamp: Timestamp;
}

type Status = "pending" | "running" | "completed";
