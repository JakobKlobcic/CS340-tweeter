import { View, Presenter } from './Presenter';
import { User, AuthToken } from 'tweeter-shared';

export interface UserEntryView extends View {
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
}

export abstract class UserEntryPresenter<U, V extends UserEntryView> extends Presenter<V> {
  private _service: U;
  public constructor(view: V) {
    super(view);
    this._service = this.createService();
  }
  protected abstract createService(): U;

  protected abstract actionOnEnter(event: React.KeyboardEvent<HTMLElement>, checkSubmitButtonStatus:Function): Promise<void>;

  public get service() {
    return this._service;
  }
  // Generic function to handle entry action
  protected async doEntryAction(
    performAction: () => Promise<[User, AuthToken]>,
    rememberMe: boolean
  ): Promise<void> {
    try {
      const [user, authToken] = await performAction();
      this.view.updateUserInfo(user, user, authToken, rememberMe);
    } catch (error) {
      // handle error as needed
      console.error('Error during entry action:', error);
    }
  }
}