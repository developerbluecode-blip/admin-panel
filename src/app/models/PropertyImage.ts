export interface PropertyImages {
  imageId: number;

  propertyId: number | null;

  imageName: string | null;

  createDate: string | null; // ISO date string from API

  createdBy: number | null;

  isActive: boolean;
}
