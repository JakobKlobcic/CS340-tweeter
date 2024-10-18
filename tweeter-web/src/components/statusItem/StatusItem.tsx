import { Status } from "tweeter-shared";
import { Link } from "react-router-dom";
import Post from "./Post";
import useUserNavigationHook from "../userInfo/UserNavigationHook";

interface Props{
    status: Status;
    index: number;
}

const StatusItem = (props: Props) => {
    const {navigateToUser} = useUserNavigationHook();
    return (
        <div
        key={props.index}
        className="row mb-3 mx-0 px-0 border rounded bg-white"
      >
        <div className="col bg-light mx-0 px-0">
          <div className="container px-0">
            <div className="row mx-0 px-0">
              <div className="col-auto p-3">
                <img
                  src={props.status.user.imageUrl}
                  className="img-fluid"
                  width="80"
                  alt="Posting user"
                />
              </div>
              <div className="col">
                <h2>
                  <b>
                    {props.status.user.firstName} {props.status.user.lastName}
                  </b>{" "}
                  -{" "}
                  <Link
                    to={props.status.user.alias}
                    onClick={(event) => navigateToUser(event)}
                  >
                    {props.status.user.alias}
                  </Link>
                </h2>
                {props.status.formattedDate}
                <br />
                <Post status={props.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default StatusItem;