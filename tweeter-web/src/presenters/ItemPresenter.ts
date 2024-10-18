import { AuthToken } from "tweeter-shared";
import { PagedItemPresenter, PagedItemView } from "./PagedItemPresenter";
import { Presenter, View } from "./Presenter";

export interface ItemView<T> extends View {
    addItems: (newItems: T[]) => void;
}

export abstract class ItemPresenter<T, U> extends Presenter<ItemView<T>> {

  private _service: U ;
  private _hasMoreItems: boolean = true;
  private _lastItem: T|null = null;

  public constructor(view: ItemView<T>){
      super(view);
      this._service = this.createService();
  }

  protected abstract createService(): U;

  protected get service(){
      return this._service
  }

  public get hasMoreItems(){
      return this._hasMoreItems
  }

  protected get lastItem(){
      return this._lastItem
  }

  protected set hasMoreItems(value:boolean){
      this._hasMoreItems = value
  }

  protected set lastItem(value:T|null){
      this._lastItem = value
  }

  reset(){
       this._hasMoreItems=true
       this._lastItem=null
  }

  protected abstract getMoreItems(authToken: AuthToken, userAlias: string): Promise<[T[], boolean]>;

  protected abstract getItemDescription(): string;

  public async loadMoreItems(authToken: AuthToken, userAlias: string ){
      this.handleRequest(this.getItemDescription(), async ()=>{
          const [newItems, hasMore] = await this.getMoreItems(
            authToken!,
            userAlias,
          );
    
          this.hasMoreItems = hasMore;
          this.lastItem = newItems[newItems.length - 1];
          this.view.addItems(newItems);
        }
      )
  }
}