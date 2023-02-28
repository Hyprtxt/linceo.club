const GuestBookForm = ({ data }) => {
  const { id, signature } = data.user
  return (
    <form method="POST" class="border-4 border-green px-2 pb-2">
      <p class="text-orange">
        Leave a message for Linceo in the Guestbook.
      </p>
      <hr class="border-1 border-yellow" />
      <p>
        <textarea
          rows={3}
          name="content"
          class="bg-black border-1 border-white rounded my-2 px-2 w-full"
        />
      </p>
      <input
        type="hidden"
        name="users_permissions_user"
        value={id}
      />
      <p>
        <input
          type="submit"
          value="post"
          class="bg-black border-1 border-white rounded px-2 cursor-pointer hover:bg-yellow hover:text-black active:bg-green active:text-black"
        />{" "}
        as {signature} <a href="/account">(change signature here)</a>
      </p>
    </form>
  )
}

export default GuestBookForm
