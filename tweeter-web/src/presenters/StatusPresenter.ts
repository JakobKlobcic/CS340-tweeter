import { Status} from "tweeter-shared"
import { View } from "./Presenter";
import { PagedItemPresenter } from "./PagedItemPresenter";
import { StatusService } from "../model/service/StatusService";

export interface StatusView extends View{
    addItems: (newItems: Status[]) => void;
}

export abstract class StatusPresenter extends PagedItemPresenter<Status, StatusService>{

    protected createService(): StatusService{
        return new StatusService()
    }
}