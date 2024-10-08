import "./UserInfo.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthToken, User } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoHook from "./UserInfoHook";
import { UserInfoPresenter, UserInfoView } from "../../presenters/UserInfoPresenter";

const UserInfo = () => {
  const [isFollower, setIsFollower] = useState(false);
  const [followeeCount, setFolloweeCount] = useState(-1);
  const [followerCount, setFollowerCount] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();

  const { currentUser, authToken, displayedUser, setDisplayedUser } =useUserInfoHook();
  
  const listener : UserInfoView = {
    setIsFollower: (isFollower: boolean) => setIsFollower(isFollower),
    setFolloweeCount: (followeeCount: number) => setFolloweeCount(followeeCount),
    setFollowerCount: (followerCount: number) => setFollowerCount(followerCount),
    displayErrorMessage: (message: string) => displayErrorMessage(message)

  }

  const [presenter] = useState(new UserInfoPresenter(listener));

  if (!displayedUser) {
    setDisplayedUser(currentUser!);
  }

  useEffect(() => {
    presenter.setIsFollowerStatus(authToken!, currentUser!, displayedUser!);
    presenter.setNumbFollowees(authToken!, displayedUser!);
    presenter.setNumbFollowers(authToken!, displayedUser!);
  }, [displayedUser]);

  const switchToLoggedInUser = (event: React.MouseEvent): void => {
    event.preventDefault();
    setDisplayedUser(currentUser!);
  };

  const followDisplayedUser = async (
    event: React.MouseEvent
  ): Promise<void> => {
    event.preventDefault();

    try {
      setIsLoading(true);
      displayInfoMessage(`Following ${displayedUser!.name}...`, 0);

      const [followerCount, followeeCount] = await presenter.follow(
        authToken!,
        displayedUser!
      );

      setIsFollower(true);
      setFollowerCount(followerCount);
      setFolloweeCount(followeeCount);
    } catch (error) {
      displayErrorMessage(
        `Failed to follow user because of exception: ${error}`
      );
    } finally {
      clearLastInfoMessage();
      setIsLoading(false);
    }
  };

  const unfollowDisplayedUser = async (
    event: React.MouseEvent
  ): Promise<void> => {
    event.preventDefault();

    try {
      setIsLoading(true);
      displayInfoMessage(
        `Unfollowing ${displayedUser!.name}...`,
        0
      );

      const [followerCount, followeeCount] = await presenter.unfollow(
        authToken!,
        displayedUser!
      );

      setIsFollower(false);
      setFollowerCount(followerCount);
      setFolloweeCount(followeeCount);
    } catch (error) {
      displayErrorMessage(
        `Failed to unfollow user because of exception: ${error}`
      );
    } finally {
      clearLastInfoMessage();
      setIsLoading(false);
    }
  };
  return (
    <div className={isLoading ? "loading" : ""}>
      {currentUser === null || displayedUser === null || authToken === null ? (
        <></>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-auto p-3">
              <img
                src={displayedUser.imageUrl}
                className="img-fluid"
                width="100"
                alt="Posting user"
              />
            </div>
            <div className="col p-3">
              {displayedUser !== currentUser && (
                <p id="returnToLoggedInUser">
                  Return to{" "}
                  <Link
                    to={""}
                    onClick={(event) => switchToLoggedInUser(event)}
                  >
                    logged in user
                  </Link>
                </p>
              )}
              <h2>
                <b>{displayedUser.name}</b>
              </h2>
              <h3>{displayedUser.alias}</h3>
              <br />
              {followeeCount > -1 && followerCount > -1 && (
                <div>
                  Followees: {followeeCount} Followers: {followerCount}
                </div>
              )}
            </div>
            <form>
              {displayedUser !== currentUser && (
                <div className="form-group">
                  {isFollower ? (
                    <button
                      id="unFollowButton"
                      className="btn btn-md btn-secondary me-1"
                      type="submit"
                      style={{ width: "6em" }}
                      onClick={(event) => unfollowDisplayedUser(event)}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <div>Unfollow</div>
                      )}
                    </button>
                  ) : (
                    <button
                      id="followButton"
                      className="btn btn-md btn-primary me-1"
                      type="submit"
                      style={{ width: "6em" }}
                      onClick={(event) => followDisplayedUser(event)}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <div>Follow</div>
                      )}
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
