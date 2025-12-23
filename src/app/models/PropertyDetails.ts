export interface Property {
  propertyId: number;

  propertyNameEn?: string;
  propertyNameAr?: string;

  propertyTypeId?: number;
  propertyOwnerId?: number;
  countryId?: number;
  cityId?: number;

  propertyAddress?: string;

  createDate?: Date;
  createdBy?: number;

  updateDate?: Date;
  updateBy?: number;

  isActive: boolean;
  isBlock: boolean;

  latitude?: string;
  longitude?: string;

  totalRoom?: number;
  rentAmount?: number;

  propertyDescriptionEn?: string;
  propertyDescriptionAr?: string;
}
