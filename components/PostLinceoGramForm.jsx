import SubmitButton from "@/islands/SubmitButton.jsx"

const PostLinceoGramForm = ({ UserID }) => (
  <form method="POST" enctype="multipart/form-data" action="/parent">
    <input
      type="hidden"
      name="user"
      value={UserID}
    />
    <input
      type="file"
      name="media"
      accept="image/*;capture=camera"
      required
    />
    <textarea
      rows={3}
      name="caption"
      class="bg-black border-1 border-white rounded my-2 px-2 w-full"
      placeholder="caption (optional)"
    />
    <SubmitButton value="upload" />
  </form>
)

export default PostLinceoGramForm
