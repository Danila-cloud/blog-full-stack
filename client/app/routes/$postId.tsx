import type { V2_MetaFunction } from "@remix-run/react";
import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import Loading from "~/components/loading";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchPost } from "~/redux/slices/posts";
import FullPost from "~/components/full-post";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Post | Blog.sol" }];
};

export default function Post() {
  const params = useParams();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // @ts-ignore
  const { posts } = useSelector((state) => state.posts);

  const [isPostsLoading, setIsPostLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPost(params.postId));
  }, []);

  useEffect(() => {
    if (posts.status === "loaded") setIsPostLoading(false);
  });

  return (
    <div className="max-w-[720px] py-12 my-[56px] mx-auto">
      {isPostsLoading ? (
        <div className="w-full h-screen">
          <Loading />
        </div>
      ) : (
        <FullPost
          imageUrl={posts.items.imageUrl}
          title={posts.items.title}
          text={posts.items.text}
          viewsCount={posts.items.viewsCount}
        />
      )}
    </div>
  );
}
