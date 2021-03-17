import React, { useEffect } from "react";
import { loadUser } from "../actions/authActions";
import { useDispatch } from "react-redux";

const Post = () => {
  const dispatch = useDispatch();
  useEffect(dispatch(loadUser()));

  return <div>Hello</div>;
};

export default Post;
