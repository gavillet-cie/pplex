export const filterLawyers = (lawyers, filters) => {
  return lawyers?.filter((lawyer) => {
    const includesName = lawyer.title
      .toLowerCase()
      .includes(filters?.name?.toLowerCase())

    const includesPracticeArea = lawyer.practiceAreas
      .map((it) => it.name)
      .includes(filters?.practiceArea)

    const includesLocation = lawyer?.locations?.find(
      (location) => location.name === filters?.location
    )

    return (
      (!filters?.name || includesName) &&
      (!filters?.practiceArea || includesPracticeArea) &&
      (!filters?.location || includesLocation)
    )
  })
}

export const showLawyers = (filters) => {
  return (
    filters && (filters?.name || filters?.practiceArea || filters?.location)
  )
}
