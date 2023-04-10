const StrapiMedia = ({ post }) => {
  // const SIZES = ["thumbnail", "small", "medium", "large"]
  const KEY = "media"
  if (!post.attributes[KEY].data) {
    return <></>
  }
  // console.log(post.attributes[KEY].data[0], "THIS")
  if (post.attributes[KEY].data[0].attributes.mime == "video/quicktime") {
    const { mime, url } = post.attributes[KEY].data[0].attributes
    return <video controls src={url} type={mime} class="w-full" />
  }
  // if (post.attributes[KEY].data[0].attributes.formats === null) {
  //   return <></>
  // }
  // const sources = SIZES.reduce(
  //   (acc, current) => {
  //     const thing = post.attributes[KEY].data[0].attributes.formats[current]
  //     if (thing === undefined) {
  //       return acc
  //     }
  //     acc.push(`${thing.url} ${thing.width}w`)
  //     return acc
  //   },
  //   [],
  // )
  if (post.attributes[KEY].data[0].attributes.formats?.medium?.url) {
    return (
      <img
        src={post.attributes[KEY].data[0].attributes.formats?.medium?.url}
        // srcset breaks safari when elements are loaded dynamically
        // srcset={sources.join(" ,")}
        alt={post.attributes.alternativeText}
        style={"margin: 0 auto"}
      />
    )
  } else {
    // Allow tiny images
    return (
      <img
        src={post.attributes[KEY].data[0].attributes?.url}
        alt={post.attributes.alternativeText}
        style={"margin: 0 auto"}
      />
    )
  }
}

export default StrapiMedia
