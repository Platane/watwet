import { normalizeSite } from '~/service/normalize'

/**
 * get any entity
 * delegate to the relevant implementation depending on the type
 */
export const getEntity = api => async (key: string, getState: *) => {
  const [entity, id] = key.split('.')

  switch (entity) {
    case 'habitatDictionary':
      return {
        habitatDictionary: await api.habitatDictionary.get(
          getState().setting.habitatDictionarySpreadsheetId
        ),
      }

    case 'vegetalDictionary':
      return {
        vegetalDictionary: await api.vegetalDictionary.get(
          getState().setting.vegetalDictionarySpreadsheetId
        ),
      }

    case 'sites':
      return { sites: (await api.site.list()).map(({ id }) => `site.${id}`) }

    case 'site':
      return normalizeSite(await api.site.get(id))
  }
}
