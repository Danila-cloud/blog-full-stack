import type { V2_MetaFunction } from "@remix-run/react";
import { useEffect, useState } from "react";
import { EmptyPostImage } from "~/assets";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "~/components/post-card";
import { fetchPosts } from "~/redux/slices/posts";
import type { ThunkDispatch } from "@reduxjs/toolkit";
import Loading from "~/components/loading";
import { selectIsAuth } from "~/redux/slices/user";
import toast, { Toaster } from "react-hot-toast";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Home | Blog.sol" }];
};

export default function Index() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // @ts-ignore
  const { posts } = useSelector((state) => state.posts);

  const [isPostsLoading, setIsPostLoading] = useState(true);

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchPosts());

    if (isAuth) {
      toast.success("You are successfully login in system!");
    }
  }, []);

  useEffect(() => {
    if (posts.status === "loaded") setIsPostLoading(false);
  });

  return (
    <div className="max-w-[720px] flex flex-col mx-auto mt-[56px] py-12">
      <div className="grid grid-cols-2 gap-2 mx-auto">
        {isPostsLoading ? (
          <div className="w-full h-screen">
            <Loading />
          </div>
        ) : (
          // @ts-ignore
          posts.items.map((obj) => (
            <div className="mx-auto">
              <PostCard
                image={EmptyPostImage}
                key={obj.title}
                title={obj.title}
                description={obj.text}
                postId={obj._id}
              />
            </div>
          ))
        )}
      </div>

      <Toaster />
    </div>
  );
}
