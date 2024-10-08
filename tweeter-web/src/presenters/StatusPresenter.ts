import { AuthToken, Status} from "tweeter-shared"

export interface StatusView{
    addItems: (newItems: Status[]) => void,
    displayErrorMessage: (message:string) => void
}

export abstract class StatusPresenter{
    private _hasMoreItems = true
    private _lastItem: Status|null = null

    private _view: StatusView;
    
    public constructor(view: StatusView){
        this._view = view;
    }
    
    protected get view(){
        return this._view
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

    protected set lastItem(value:Status|null){
        this._lastItem = value
    }

    public abstract loadMoreItems(authToken: AuthToken, userAlias: string):void;
    
    reset(){
         this._hasMoreItems=true
         this._lastItem=null
    }
}