import { Post } from "@/app/types";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: revalidate },
  });
  const posts = await data.json();

  return posts.map((post: Post) => ({
    id: String(post.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: revalidate },
  });

  if (!data.ok) {
    return {
      title: "Post introuvable",
    };
  }

  const post = await data.json();

  return {
    title: post.title,
    description: post.body,
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!data.ok) {
    notFound();
  }

  const post = await data.json();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          {post.title}
        </h2>
        <p className="text-gray-600 leading-relaxed">{post.body}</p>
      </div>
    </div>
  );
};

export default page;
