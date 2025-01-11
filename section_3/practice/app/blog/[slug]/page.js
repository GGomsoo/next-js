const BlogPostPage = ({ params }) => {
  return (
    <main>
      <h1>Blog Page</h1>
      <p>{params.slug}</p>
    </main>
  );
};

export default BlogPostPage;