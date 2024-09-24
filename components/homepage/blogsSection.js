import { useRouter } from "next/router";

export default function BlogsSection({ blogs }) {
  const router = useRouter();
  return (
    <>
      <div className="flex w-screen bg-white justify-center">
        <div className="bg-black/10 w-full max-w-[800px] h-1 rounded-full"></div>
      </div>
      <div className="bg-white flex flex-col text-black items-center justify-center py-12 gap-2">
        <h1 className="text-3xl font-bold">Latest Blogs</h1>
        <p className="text-black/50 mb-6 text-lg">
          All the latest on mobile gaming, gamification, rewards and loyalty.
        </p>
        <div className="w-full flex-1 p-4 max-w-[1200px] px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {blogs?.slice(0, 4)?.map((item, key) => (
            <BlogCard
              onClick={() => router.push(`/blogs/${item.id}`)}
              item={item}
              key={key}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function BlogCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl hover:shadow-lg transition cursor-pointer shadow-md flex-1 h-[400px]  bg-[#EEE] p-4 text-xl font-bold"
    >
      <img
        className="h-60 w-full object-cover mb-4 rounded-lg"
        src={item?.data?.featured_image?.url}
      />
      <h3 className="line-clamp-4">{item?.data?.title}</h3>
    </div>
  );
}
