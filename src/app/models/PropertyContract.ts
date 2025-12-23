export interface PropertyContract {
  propertyContractId: number;
  propertyId: number | null;

  startDate: string | null;   // DateOnly → ISO string (yyyy-MM-dd)
  endDate: string | null;     // DateOnly → ISO string

  commision: number | null;

  createDate: string | null;  // DateTime → ISO string
  createdBy: number | null;

  updateDate: string | null;  // DateTime → ISO string
  updatedBy: number | null;

  isActive: boolean;
}
