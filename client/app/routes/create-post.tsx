import { ThunkDispatch } from "@reduxjs/toolkit";
import { V2_MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { Button, FileInput, Label, Textarea } from "flowbite-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import instance from "~/axios";
import { createPost } from "~/redux/slices/posts";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Create post | Blog.sol" }];
};

export default function CreatePost() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");

  const inputFileRef = useRef(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      text: "",
    },
    mode: "onChange",
  });

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();

      const file = event.target.files[0];

      formData.append("image", file);

      const { data } = await instance.post("/upload", formData);

      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
    }
  };

  const onSubmit = async (values: any) => {
    const params = {
      ...values,
      imageUrl,
    };

    const data = await dispatch(createPost(params));

    toast.success("You post is created!");
  };

  return (
    <div className="max-w-[720px] px-auto my-[56px] pb-8 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2 className="mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-sky-800">
          Create a new post
        </h2>

        {imageUrl && (
          <div className="mx-auto">
            <img src={`http://localhost:3001${imageUrl}`} alt="" />
          </div>
        )}

        <div id="textarea">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Title" />
          </div>

          <Textarea
            id="title"
            placeholder="Your title..."
            required={true}
            {...register("title", { required: "Enter post title" })}
            rows={1}
          />
        </div>
        <div id="textarea">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Post text" />
          </div>

          <Textarea
            id="text"
            placeholder="Your text..."
            {...register("text", { required: "Enter post text" })}
            required={true}
            rows={4}
          />
        </div>
        <div id="fileUpload">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload file" />
          </div>

          <FileInput
            onChange={handleChangeFile}
            ref={inputFileRef}
            itemType="png"
            id="file"
            helperText="This image will be use as cover for your post"
          />
        </div>

        <div className="mt-4">
          <Button type="submit">Publish</Button>
        </div>
      </form>

      <Toaster />
    </div>
  );
}
