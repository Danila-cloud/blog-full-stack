import type { V2_MetaFunction } from "@remix-run/react";
import { useEffect, useState } from "react";
import { EmptyImage } from "~/assets";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "~/components/post-card";
import instance from "~/axios";
import { fetchMyPosts, fetchPosts } from "~/redux/slices/posts";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Loading from "~/components/loading";
import { selectIsAuth } from "~/redux/slices/auth";
import toast, { Toaster } from "react-hot-toast";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Home | Blog.sol" }];
};

export default function Index() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [isPostsLoading, setIsPostLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchMyPosts(window.localStorage.getItem("id")));
  }, []);

  // @ts-ignore
  const { posts } = useSelector((state) => state.posts);

  console.log(posts);

  useEffect(() => {
    if (posts.status === "loaded") {
      setIsPostLoading(false);

      console.log(isPostsLoading);

      if (posts.items.length === 0) {
        toast.error("You don't have any posts yet");
      }
    }
  });

  return (
    <div className="max-w-[720px] flex flex-col gap-6 mx-auto mt-[56px] py-12 py-auto">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-sky-800">
        Your posts
      </h1>
      <div>
        {posts.items.length !== 0 ? (
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
        ) : (
          <div className="h-screen">
            <Toaster />
          </div>
        )}
      </div>
    </div>
  );
}
