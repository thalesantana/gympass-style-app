export interface CreateGymRequestType {
  title: string;
  description?: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}
