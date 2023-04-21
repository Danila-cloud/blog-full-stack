import type { V2_MetaFunction } from "@remix-run/react";
import { useEffect, useState } from "react";
import { EmptyImage } from "~/assets";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "~/components/post-card";
import instance from "~/axios";
import { fetchPosts } from "~/redux/slices/posts";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Loading from "~/components/loading";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Home" }];
};

export default function Index() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // @ts-ignore
  const { posts } = useSelector((state) => state.posts);

  const [isPostsLoading, setIsPostLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (posts.status === "loaded") setIsPostLoading(false);
  });

  return (
    <div className="max-w-[720px] flex flex-row mx-auto mt-[56px] py-12 py-auto">
      <div className="grid grid-cols-2 gap-2 mx-auto">
        {isPostsLoading ? (
          <div className="w-full h-screen">
            <Loading />
          </div>
        ) : (
          // @ts-ignore
          posts.items.map((obj) => (
            <PostCard
              key={obj.title}
              title={obj.title}
              description={obj.text}
            />
          ))
        )}
      </div>
    </div>
  );
}
