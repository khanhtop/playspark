import { formatDate } from "@/helpers/datetime";
import { LinkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function BlogSection({ blog, id }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/blogs/${id}`)}
      className="flex flex-col items-center cursor-pointer bg-black/10 p-4 rounded-xl hover:scale-[101%] transition"
    >
      <div className="flex items-start flex-col max-w-[720px] gap-[32px]">
        <img
          className="h-[240px] object-cover rounded-xl"
          src={blog?.featured_image?.url}
          alt={blog?.featured_image?.alt}
        />
        <div className="flex flex-col gap-[8px] w-full">
          <div className="flex items-center gap-[5px]">
            <h3 className="text-[14px] font-semibold leading-[20px] text-[#525AFA]">
              PlaySpark Team
            </h3>
            <div className="w-[5px] h-[5px] rounded-full bg-[#525AFA]" />
            <h3 className="text-[14px] font-semibold leading-[20px] text-[#525AFA]">
              {formatDate(blog?.date) ?? "Unknown Date"}
            </h3>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex flex-row justify-between items-start gap-[16px] w-full">
              <h1 className="flex-1 ellipsis text-[24px] font-semibold leading-[32px]">
                {blog?.title}
              </h1>
              <LinkIcon className="w-[24px] h-[24px]" alt="link" />
            </div>
            <div className="max-w-[370px] para-ellipsis text-[#667085] text-[16px] font-normal leading-[24px]">
              <p>{blog?.content?.[0]?.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogAvatar({ name, avatar, date }) {
  return (
    <div className="flex justify-center items-center gap-[16px]">
      <img src={avatar} className="h-[56px] w-[56px]" />
      <div className="flex flex-col justify-center">
        <p className="text-[18px] font-medium leading-[28px] text-[#101828]">
          {name}
        </p>
        <p className="text-[16px] font-normal leading-[24px] text-[#667085]">
          {formatDate(date) ?? "Unknown Date"}
        </p>
      </div>
    </div>
  );
}
