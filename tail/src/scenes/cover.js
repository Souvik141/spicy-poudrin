import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFigure } from "../callouts/entityCallouts.js";

const Cover = ({ history }) => {
  console.log("Cover");
  const dispatch = useDispatch();
  const entityState = useSelector((state) => state.entityState);
  const { userInfo } = entityState;
  const entityFigure = useSelector((state) => state.entityFigure);
  const { user } = entityFigure;
  useEffect(() => {
    if (!userInfo) {
      history.push("/auth/signin");
    } else if (!user || !user.email) {
      dispatch(getFigure());
    }
  }, [dispatch, history, userInfo, user]);
  return <div className="cover"></div>;
};

export default Cover;
