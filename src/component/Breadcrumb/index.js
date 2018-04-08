import { connect } from 'preact-redux'
import { Breadcrumb as Dumb } from './Dumb'
import { goTo } from '~/store/action/router'
import {
  selectCurrentSiteId,
  selectCurrentSite,
} from '~/store/selector/currentSite'
import {
  selectCurrentHabitatId,
  selectCurrentHabitat,
} from '~/store/selector/currentHabitat'

const injectState = connect(state => {
  const site = selectCurrentSite(state)
  const habitat = selectCurrentHabitat(state)

  const siteId = selectCurrentSiteId(state)
  const habitatId = selectCurrentHabitatId(state)

  const paths = [
    { href: `/site`, label: 'Home' },
    siteId && { href: `/site/${siteId}`, label: (site && site.name) || '-' },
    habitatId && {
      href: `/site/${siteId}/habitat/${habitatId}`,
      label: (habitat && habitat.info.name) || '-',
    },
  ].filter(Boolean)

  return { paths }
})

export const Breadcrumb = injectState(Dumb)
