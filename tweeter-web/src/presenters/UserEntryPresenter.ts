import { View, Presenter } from './Presenter';
import { User, AuthToken } from 'tweeter-shared';

export interface UserEntryView extends View{
    updateUserInfo: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
      ) => void;
}

export abstract class UserEntryPresenter<U> extends Presenter<UserEntryView>{
    private _service: U ;
    public constructor(view: UserEntryView){
        super(view);
        this._service = this.createService();
    }
    protected abstract createService(): U;

    //write a generic function tha will remove doRegister and doLogin from their respective files
    protected abstract doEntryAction(alias: string, password: string, rememberMe: boolean): Promise<void>;
    
    protected abstract getMoreItems(authToken: AuthToken, userAlias: string): Promise<[T[], boolean]>;

    protected abstract getItemDescription(): string;

    public get service(){
        return this._service
    }

    public async do(alias: string, password: string, rememberMe: boolean){
        this.handleRequest("log userin ", async ()=>{
            const [user, authToken] = await this.service.login(alias, password);
            this.view.updateUserInfo(user, user, authToken, rememberMe);
        })
    }
}
