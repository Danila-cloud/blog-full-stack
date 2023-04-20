import type { V2_MetaFunction } from "@remix-run/react";
import { useEffect } from "react";
import { EmptyImage } from "~/assets";
import PostCard from "~/components/post-card";
import instance from "~/axios";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Home" }];
};

export default function Index() {
  useEffect(() => {
    instance.get("/posts");
  }, []);

  return (
    <div className="max-w-[720px] flex flex-row mx-auto mt-[56px] py-12 py-auto">
      <div className="grid grid-cols-2 gap-2">
        <PostCard
          image={EmptyImage}
          title="Noteworthy technology acquisitions 2021"
          description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
        />
        <PostCard
          image={EmptyImage}
          title="Noteworthy technology acquisitions 2021"
          description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
        />
        <PostCard
          image={EmptyImage}
          title="Noteworthy technology acquisitions 2021"
          description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
        />
        <PostCard
          image={EmptyImage}
          title="Noteworthy technology acquisitions 2021"
          description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
        />
        <PostCard
          image={EmptyImage}
          title="Noteworthy technology acquisitions 2021"
          description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
        />
        <PostCard
          image={EmptyImage}
          title="Noteworthy technology acquisitions 2021"
          description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
        />
      </div>
    </div>
  );
}
