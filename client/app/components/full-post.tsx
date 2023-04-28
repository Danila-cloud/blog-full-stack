import { EmptyPostImage, Views } from "~/assets";

interface IPost {
    imageUrl?: string,
    title: string,
    text: string,
    viewsCount: number,
}

export default function FullPost({imageUrl, title, text, viewsCount}: IPost) {
    return(
        <div className="block min-h-full border border-gray-200 rounded-lg shadow flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="flex flex-col gap-4">
            <img
              className="mx-auto w-full"
              src={
                imageUrl
                  ? `http://localhost:3001${imageUrl}`
                  : EmptyPostImage
              }
              alt="Your Company"
            />

            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>

            <p className="font-normal text-center text-gray-700 dark:text-gray-400">
              {text}
            </p>

            <div className="flex flex-row py-auto gap-1 justify-end">
              <img className="h-5 w-6 my-auto" src={Views} alt="" />

              <p className="font-normal text-end text-gray-700 dark:text-gray-400">
                {viewsCount}
              </p>
            </div>

            {/* <p className="font-normal text-end text-gray-700 dark:text-gray-400">
              {posts.items.createdAt}
            </p> */}
          </div>
        </div>
    )
}