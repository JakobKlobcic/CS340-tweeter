import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Toast } from "../components/toaster/Toast";
import { Presenter, View } from "./Presenter";

export interface ToastView extends View{
    deleteToast(id:string): void;
}

export class ToastPresenter extends Presenter<ToastView>{
    private userService: UserService;

    public constructor(view: ToastView){
        super(view);
        this.userService = new UserService();
    }

    protected get view(): ToastView{
      return super.view as ToastView;
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
        this.view.deleteToast(toast.id);
      }
    }
  };
}