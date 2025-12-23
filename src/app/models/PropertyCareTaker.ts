export interface PropertyCareTaker {
  propertyCareTakerId: number;
  fulNameEn: string | null;
  fulNameAr: string | null;
  mobileNumber: number | null;
  emailAddess: string | null;
  propertyCareTypeId: number | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  isActive: boolean;
  createDate: string | null;   // ISO date string
  createBy: number | null;
  updateDate: string | null;   // ISO date string
  updatedBy: number | null;
}
