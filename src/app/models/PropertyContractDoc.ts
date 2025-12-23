export interface PropertyContractDoc {
  propertyContractDocsId: number;

  propertyContractId: number | null;

  contractDocsFile: string | null;   // file name / relative path from API

  createDate: string | null;         // DateTime → ISO string
  createdBy: number | null;
}
