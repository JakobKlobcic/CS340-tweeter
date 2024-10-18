import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import useUserInfoHook from "./components/userInfo/UserInfoHook";
import { UserItemPresenter, UserItemView } from "./presenters/UserItemPresenter";
import { FolloweePresenter } from "./presenters/FolloweePresenter";
import { FollowerPresenter } from "./presenters/FollowerPresenter"
import { StatusPresenter, StatusView } from "./presenters/StatusPresenter";
import { FeedPresenter } from "./presenters/FeedPresenter";
import { StoryPresenter } from "./presenters/StoryPresenter";
import { Status, User } from "tweeter-shared";
import { StatusService } from "./model/service/StatusService";
import ItemScroller from "./components/mainLayout/ItemScroller";
import StatusItem from "./components/mainLayout/StatusItem";
import { FollowService } from "./model/service/FollowService";
import UserItem from "./components/userItem/UserItem";
const App = () => {
  const { currentUser, authToken } = useUserInfoHook();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route 
          path="feed" 
          element={
            <ItemScroller<Status, StatusService, StatusView, StatusPresenter>
              key={1}
              presenterGenerator={(view: StatusView) => new FeedPresenter(view)}
              itemGenerator={(item, index) => <StatusItem status={item} index={index}/>}
            />
          } 
        />
        <Route 
          path="story" 
          element={
            <ItemScroller<Status, StatusService, StatusView, StatusPresenter>
              key={2}
              presenterGenerator={(view: StatusView) => new StoryPresenter(view)}
              itemGenerator={(item, index) => <StatusItem status={item} index={index}/>}
            />
          } 
        />
        <Route
          path="followees"
          element={
            <ItemScroller<User, FollowService, UserItemView, UserItemPresenter>
              key={3}
              presenterGenerator={(view: UserItemView) => new FolloweePresenter(view)}
              itemGenerator={(item, index) => 
                <div
                  key={index}
                  className="row mb-3 mx-0 px-0 border rounded bg-white"
                >
                  <UserItem value={item} />
                </div>
              }
            />
          }
        />
        <Route
          path="followers"
          element={
            <ItemScroller<User, FollowService, UserItemView, UserItemPresenter>
              key={4}
              presenterGenerator={(view: UserItemView) => new FollowerPresenter(view)}
              itemGenerator={(item, index) => 
                <div
                  key={index}
                  className="row mb-3 mx-0 px-0 border rounded bg-white"
                >
                  <UserItem value={item} />
                </div>
              }
            />

          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
