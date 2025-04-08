import { storePost } from '@/lib/posts';

export default function NewPostPage() {
  async function createPost(formData) {
    // 170
    // 해당 함수를 서버 액션으로 만들기 위해서
    // 함수 안에 "use server"를 추가해야 한다.
    "use server";
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    console.log(title, image, content);
    // storePost({
    //   imageUrl: '',
    //   title,
    //   content,
    //   userId: 1
    // })
  }

  return (
    <>
      <h1>Create a new post</h1>
      <form action={createPost}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <p className="form-actions">
          <button type="reset">Reset</button>
          <button>Create Post</button>
        </p>
      </form>
    </>
  );
}
