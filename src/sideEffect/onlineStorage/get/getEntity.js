import {
  listId as listSitesId,
  get as getSite,
} from '~/service/google-api/spreadsheets/site'
import { get as getHabitatDirectory } from '~/service/google-api/spreadsheets/habitatDirectory'
import { get as getVegetalDictionary } from '~/service/google-api/spreadsheets/vegetalDictionary'
import { normalizeSite } from '~/service/normalize'

/**
 * get any entity
 * delegate to the relevant implementation depending on the type
 */
export const getEntity = async (key: string, getState: *) => {
  const [entity, id] = key.split('.')

  switch (entity) {
    case 'habitatDictionary':
      return {
        habitatDictionary: await getHabitatDirectory(
          getState().setting.habitatDictionarySpreadsheetId
        ),
      }

    case 'vegetalDictionary':
      return {
        vegetalDictionary: await getVegetalDictionary(
          getState().setting.vegetalDictionarySpreadsheetId
        ),
      }

    case 'sites':
      return { sites: (await listSitesId()).map(id => `site.${id}`) }

    case 'site':
      return normalizeSite(await getSite(id))
  }
}
