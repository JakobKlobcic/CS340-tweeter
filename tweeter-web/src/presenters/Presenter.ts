export interface View{
    
    displayErrorMessage: (message:string) => void
}

export abstract class Presenter<V extends View>{
    private _view: V;
    
    protected constructor(view: V){
        this._view = view;
    }
    
    protected get view(): V{
        return this._view
    }
    protected async handleRequest( operationDescriptipon:string, operation: () => Promise<void>): Promise<void>{    
        try{
            await operation()
        }catch(error){
            this._view.displayErrorMessage(
                `Failed to ${operationDescriptipon} because of exception: ${(error as  Error).message}` 
            )
        }
    }
}