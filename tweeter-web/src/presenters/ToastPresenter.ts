import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Toast } from "../components/toaster/Toast";

export interface ToastView{
    deleteToast(id:string): void;
}

export class ToastPresenter{
    private _view: ToastView;
    private userService: UserService;
    public constructor(view: ToastView){
        this._view = view;
        this.userService = new UserService();
    }
    public setInterval(toastList: Toast[]){
        return setInterval(() => {
            if (toastList.length) {
              this.deleteExpiredToasts(toastList);
            }
        }, 1000);
    }
    
  public async deleteExpiredToasts(toastList: Toast[]) {
    const now = Date.now();

    for (let toast of toastList) {
      if (
        toast.expirationMillisecond > 0 &&
        toast.expirationMillisecond < now
      ) {
        this._view.deleteToast(toast.id);
      }
    }
  };
}