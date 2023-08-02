export async function http(args) {
  const baseURL = process.env.BASE_URL || 'https://api.tvmaze.com'
  const url = new URL(baseURL)

  url.pathname = args.url

  if (args.params) {
    url.search = new URLSearchParams(args.params).toString()
  }

  try {
    const response = await fetch(url)

    if (response.ok) {
      return response.json()
    }

    throw new Error(response.statusText)
  } catch (e) {
    return e
  }
}

export function loadShows({ page }) {
  return http({
    url: '/shows',
    params: {
      page
    }
  }).then((data) => {
    return {
      data,
      page
    }
  })
}

export function loadShowSeasons({ id }) {
  return http({
    url: `/shows/${id}/seasons`
  })
}

export function loadShowSeasonEpisodes({ id }) {
  return http({
    url: `/seasons/${id}/episodes`
  }).then((data) => {
    return {
      data,
      id
    }
  })
}

export function searchShows({ query }) {
  return http({
    url: '/search/shows',
    params: {
      q: query
    }
  }).then((data) => {
    return {
      data: data.map((item) => item.show),
      query
    }
  })
}
