import { Status} from "tweeter-shared"
import { StatusService } from "../model/service/StatusService";
import { ItemView, ItemPresenter } from "./ItemPresenter";

export interface StatusView extends ItemView<Status> {
    addItems: (newItems: Status[]) => void;
}

export abstract class StatusPresenter extends ItemPresenter<Status, StatusService>{
    protected createService(): StatusService{
        return new StatusService()
    }
}