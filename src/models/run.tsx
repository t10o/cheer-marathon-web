import { Timestamp } from "firebase/firestore";

export interface Run {
  id: string;
  photos: Photo[];
  route: Location[];
  messages: Message[];
  startTime: string;
  endTime: string;
  status: Status;
}

interface Photo {
  location: Location;
  photoUrl: string;
  timestamp: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

export interface Message {
  message: string;
  name: string;
  timestamp: Timestamp;
}

type Status = "pending" | "running" | "completed";
