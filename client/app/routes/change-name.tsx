import type { V2_MetaFunction } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import { Logo } from "~/assets";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  fetchAuth,
  selectIsAuth,
  updateEmail,
  updateName,
} from "~/redux/slices/user";
import toast, { Toaster } from "react-hot-toast";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Login | Blog.sol" }];
};

export default function ChangeEmail() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: any) => {
    const data = await dispatch(updateName(values));

    // console.log(data);

    if (data.payload) {
      navigate("/");
    } else {
      toast.error("Email or password is incorrect, please try again!");

      return;
    }

    console.log(data.payload);

    window.localStorage.setItem("name", values.name);

    return data;
  };

  return (
    <div className="max-w-[720px] px-auto my-[56px] pb-8 mx-auto">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-16 w-auto" src={Logo} alt="Your Company" />
          <h2 className="mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change your name
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            // action="#"
            // method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="name"
                  autoComplete="name"
                  required
                  {...register("name", { required: "Enter your email" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Change your name
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
