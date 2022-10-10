export interface ICollectionIndex {
  addIndex:(id: string) => void;
  updateIndex:(id: string) => void;
  deleteIndex:(id: string) => void;
  reIndex:() => void; 
}
