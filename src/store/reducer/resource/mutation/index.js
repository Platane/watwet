export const reduce = (state, action, original) => {
  switch (action.type) {
    //
    case 'mutation:habitat:update':
      return { ...state, [`habitat.${action.habitat.id}`]: action.habitat }

    //
    case 'mutation:habitat:create': {
      const habitatId = action.habitat.id

      const habitatKey = `habitat.${habitatId}`
      const siteKey = `site.${action.siteId}`

      const site = state[siteKey] ||
        original[siteKey] || { habitats: [], id: action.siteId }

      return {
        ...state,
        [habitatKey]: {
          ...action.habitat,
          siteId: action.siteId,
        },
        [siteKey]: {
          ...site,
          habitats: [...site.habitats, habitatKey],
        },
      }
    }

    //
    case 'mutation:site:create': {
      const { site } = action

      const siteKey = `site.${site.id}`

      return {
        ...state,
        sites: [...(state.sites || []), siteKey],
        [siteKey]: { ...site, habitats: [] },
      }
    }

    default:
      return state
  }
}
