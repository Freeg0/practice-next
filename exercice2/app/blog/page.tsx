import { Post } from "@/app/types";
import Link from "next/link";

const page = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Blog Posts</h1>
      <div className="space-y-6">
        {posts.map((post: Post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{post.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
