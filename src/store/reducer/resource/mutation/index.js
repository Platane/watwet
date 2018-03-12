import { set, merge } from '~/util/reduxHelper'

export const reduce = (state, action) => {
  switch (action.type) {
    case 'mutation:habitat:update':
      return { ...state, [`habitat.${action.habitat.id}`]: action.habitat }

    case 'mutation:habitat:create': {
      const habitatId =
        action.habitat.id ||
        Math.random()
          .toString(16)
          .slice(2)

      const habitatKey = `habitat.${habitatId}`
      const siteKey = `site.${action.siteId}`

      const site = state[siteKey] || { habitats: [], id: action.siteKey }

      return {
        ...state,
        [habitatKey]: action.habitat,
        [siteKey]: {
          ...site,
          habitats: [...site.habitats, habitatKey],
        },
      }
    }

    default:
      return state
  }
}
