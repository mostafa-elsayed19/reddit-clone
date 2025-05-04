import CommentList from "@/_components/CommentList";
import InputField from "@/_components/InputField";
import PostContent from "@/_components/PostContent";
import VoteSection from "@/_components/VoteSection";
import Wrapper from "@/_components/Wrapper";
import { getPostById } from "@/_services/posts";

async function page({ params }) {
  const { id: postId } = await params;

  const { post } = await getPostById(postId);

  //   {
  //     "id": "64256c7f-09c1-4615-b751-99448bbcd45e",
  //     "created_at": "2025-04-14T14:54:44.107688+00:00",
  //     "user_id": "cf389b5d-cb97-4d1d-b275-0a76a25cc072",
  //     "image": "",
  //     "title": "test 2",
  //     "content": "test 2",
  //     "likes": 0,
  //     "views": 0,
  //     "comments_count": 0,
  //     "updated_at": null,
  //     "edited": false,
  //     "users": {
  //         "username": "Mostafa"
  //     }
  // }

  const {
    user_id,
    title,
    content,
    upvotes,
    downvotes,
    comments_count,
    users: { username },
  } = post;

  const votes = upvotes - downvotes;

  return (
    <Wrapper>
      <section className="rounded bg-white p-4 shadow">
        <PostContent
          postId={postId}
          title={title}
          user_id={user_id}
          content={content}
          username={username}
        />

        <VoteSection votes={votes} postId={postId} />

        <h2 className="mb-4 text-xl font-semibold">
          {comments_count} Comments
        </h2>

        <form className="mb-6">
          <InputField
            type="textarea"
            rows={2}
            placeholder="Add your comment..."
          />
          <button className="mt-2 rounded bg-blue-500 px-4 py-2 text-white">
            Submit
          </button>
        </form>

        <CommentList />
      </section>
    </Wrapper>
  );
}

export default page;
