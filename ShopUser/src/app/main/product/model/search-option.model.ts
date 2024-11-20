export class SearchOption {
  public searchOptionGroupId: string;
  public searchOptionId: string;
  public searchOptionName: string;
  public isEnable: boolean;

  constructor(
    searchOptionGroupId: string,
    searchOptionId: string,
    searchOptionName: string,
    isEnable: boolean
  ) {
    this.searchOptionGroupId = searchOptionGroupId;
    this.searchOptionId = searchOptionId;
    this.searchOptionName = searchOptionName;
    this.isEnable = isEnable;
  }
}

export class SearchOptionGroup {
  public searchOptionGroupId: string;
  public searchOptionGroupName: string;
  public searchOptions: SearchOption[];

  constructor(
    searchOptionGroupId: string,
    searchOptionGroupName: string,
    searchOptions: SearchOption[]
  ) {
    this.searchOptionGroupId = searchOptionGroupId;
    this.searchOptionGroupName = searchOptionGroupName;
    this.searchOptions = searchOptions;
  }
}