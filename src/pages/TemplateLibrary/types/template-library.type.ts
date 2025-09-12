export type DirectoryType = {
  tagId: number;
  tagName: string;
  tagType: string;
  tagSort: number | null;
  tagLevel: number;
  isPublic: boolean;
  isPrivate: boolean;
  isHidden: boolean;
  isNoShow: boolean;
  reportType: string | null;
  isExpanded: boolean;
  children: DirectoryType[]; 
}