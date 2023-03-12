import { signal } from "@preact/signals"

export const show_pagination = signal(true)

const Pagination = ({ data }) => {
  const { page, pageCount } = data
  return (show_pagination.value
    ? (
      <>
        {page > 1
          ? (
            <a
              href={`/gram?p=${page - 1}`}
              class="text-underline"
            >
              &laquo; Previous Page
            </a>
          )
          : <></>}
        {page <
            pageCount
          ? (
            <a
              href={`/gram?p=${page + 1}`}
              class="text-underline float-right"
            >
              Next Page &raquo;
            </a>
          )
          : <></>}
        <div style="clear:both" />
      </>
    )
    : <></>)
}

export default Pagination
