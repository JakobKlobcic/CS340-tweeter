import { Status, Type } from "tweeter-shared";
import { Link } from "react-router-dom";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoHook from "../userInfo/UserInfoHook";
import { PostView, PostPresenter } from "../../presenters/PostPresenter";
import { useState } from "react";

interface Props {
  status: Status;
}

const Post = (props: Props) => {
  const { setDisplayedUser, currentUser, authToken } =useUserInfoHook();
  const { displayErrorMessage } = useToastListener();

  const listener : PostView = {
    setDisplayedUser: setDisplayedUser,
    displayErrorMessage: displayErrorMessage
  }

  const [presenter] = useState(new PostPresenter(listener));

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    await presenter.navigateToUser(currentUser!, authToken!, event.target.toString());
  };

  return (
    <>
      {props.status.segments.map((segment, index) =>
        segment.type === Type.alias ? (
          <Link
            key={index}
            to={segment.text}
            onClick={(event) => navigateToUser(event)}
          >
            {segment.text}
          </Link>
        ) : segment.type === Type.url ? (
          <a
            key={index}
            href={segment.text}
            target="_blank"
            rel="noopener noreferrer"
          >
            {segment.text}
          </a>
        ) : segment.type === Type.newline ? (
          <br key={index} />
        ) : (
          segment.text
        )
      )}
    </>
  );
};

export default Post;
