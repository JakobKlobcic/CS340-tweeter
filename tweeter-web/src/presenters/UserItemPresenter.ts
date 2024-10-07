import {User, AuthToken} from "tweeter-shared"

export interface UserItemView{
    addItems: (newItems: User[]) => void,
    displayErrorMessage: (message:string) => void
}

export abstract class UserItemPresenter{
    private _hasMoreItems = true
    private _lastItem: User|null = null

    private _view: UserItemView;
    
    public constructor(view: UserItemView){
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

    protected set lastItem(value:User|null){
        this._lastItem = value
    }

    public abstract loadMoreItems(authToken: AuthToken, userAlias: string):void;
    
    reset(){
         this._hasMoreItems=true
         this._lastItem=null
    }
}