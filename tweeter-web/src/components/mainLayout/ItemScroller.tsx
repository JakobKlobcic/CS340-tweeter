import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoHook from "../userInfo/UserInfoHook";
import { ItemPresenter, ItemView } from "../../presenters/ItemPresenter";

interface Props<V, P, T> {
  presenterGenerator:(view:V)=>P;
  itemGenerator: (item:T, index:number) => JSX.Element;
}

const ItemScroller = <T, S, V extends ItemView<T>, P extends ItemPresenter<T, S>>(props: Props<V , P, T>) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<T[]>([]);
  const [newItems, setNewItems] = useState<T[]>([]);
  const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);

  const { displayedUser, authToken } = useUserInfoHook();

  // Initialize the component whenever the displayed user changes
  useEffect(() => {
    reset();
  }, [displayedUser]);

  // Load initial items whenever the displayed user changes. Done in a separate useEffect hook so the changes from reset will be visible.
  useEffect(() => {
    if(changedDisplayedUser) {
      console.log("------------------------Loading initial items");
      loadMoreItems();
    }
  }, [changedDisplayedUser]);

  // Add new items whenever there are new items to add
  useEffect(() => {
    if(newItems) {
      setItems([...items, ...newItems]);
    }
  }, [newItems])

  const reset = async () => {
    setItems([]);
    setNewItems([]);
    setChangedDisplayedUser(true);
    presenter.reset();
  }

  const listener = {
    addItems: (newItems: T[]) =>setNewItems(newItems),
    displayErrorMessage: displayErrorMessage
  }  as V;

  const [presenter] = useState(props.presenterGenerator(listener));

  const loadMoreItems = async () => {
    console.log("-------------------Loading more items");
    presenter.loadMoreItems(authToken!, displayedUser!.alias)
    setChangedDisplayedUser(false)
  }

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          props.itemGenerator(item, index)
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ItemScroller;
