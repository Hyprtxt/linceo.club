export default function LocalDateTime(props) {
  const { date } = props
  return (
    <>
      {new Date(date).toLocaleString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}
    </>
  )
}
