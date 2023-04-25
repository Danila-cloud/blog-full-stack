import type { V2_MetaFunction } from "@remix-run/react";
import { useEffect, useState } from "react";
import { EmptyImage, EmptyPostImage } from "~/assets";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "~/components/post-card";
import instance from "~/axios";
import { fetchMyPosts, fetchPosts } from "~/redux/slices/posts";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Loading from "~/components/loading";
import { selectIsAuth } from "~/redux/slices/user";
import toast, { Toaster } from "react-hot-toast";

export const meta: V2_MetaFunction = () => {
  return [{ title: "My Posts | Blog.sol" }];
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
    <div className="max-w-[720px] gap-8 flex flex-col mx-auto mt-[56px] py-12">
      <h2 className="text-4xl mx-auto font-extrabold leading-none tracking-tight md:text-5xl lg:text-5xl text-sky-800">
        Your posts
      </h2>

      <div className="mx-auto">
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
                  image={EmptyPostImage}
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
