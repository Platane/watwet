const fs = require('fs')
const csvtojson = require('csvtojson')

const wrap = a => (a && `"${a}"`) || ''

const run = async () => {
  const plants = await csvtojson().fromFile('taxrefv11_plantea.csv')

  const humides = await csvtojson().fromFile(
    'annexe_ii_table_a_especes_indicatrices_de_zones_humides.csv'
  )

  const h_code = {}
  humides.forEach(x => (h_code[x['CODE FVF']] = true))

  const pplants = plants.map(p => ({
    ...p,
    humide: h_code[p.CD_NOM] || h_code[p.CD_REF],
  }))

  const csvContent =
    'CD_REF,CD_NOM,LB_NOM,NOM_VERN,INDICATEUR_HUMIDE\n' +
    pplants
      .map(x =>
        [
          x.CD_REF,
          x.CD_NOM,
          wrap(x.LB_NOM),
          wrap(x.NOM_VERN),
          x.humide ? '1' : '',
        ].join(',')
      )
      .join('\n')

  fs.writeFileSync('vegetal_dictionary.csv', csvContent)

  const n_humid = pplants.reduce((n, { humide }) => n + !!humide, 0)

  console.log(`total plants: ${plants.length}`)
  console.log(
    `humide plants: ${n_humid} ( ${Math.round(
      n_humid / plants.length * 100
    )}% ) from ${humides.length} references`
  )

  // merge entities with same CD_REF
  {
    const by_ref = {}
    pplants.forEach(p => (by_ref[p.CD_REF] = by_ref[p.CD_REF] || []).push(p))

    const reducedPlants = Object.keys(by_ref).map(ref => {
      const siblings = by_ref[ref].sort(
        (a, b) => (+a.CD_NOM < +b.CD_NOM ? -1 : 1)
      )

      const master = siblings.find(x => x.CD_NOM == ref) || siblings[0]

      const CD_NOM = siblings.map(x => x.CD_NOM).join(',')

      return {
        ...master,
        CD_NOM,
      }
    })

    const n_humid = reducedPlants.reduce((n, { humide }) => n + !!humide, 0)

    console.log(
      `\nwhen merging by CD_REF: ${reducedPlants.length} ( ${Math.round(
        reducedPlants.length / plants.length * 100
      )}% )`
    )
    console.log(
      `humide plants: ${n_humid} ( ${Math.round(
        n_humid / reducedPlants.length * 100
      )}% ) from ${humides.length} references`
    )

    const csvContent =
      'CD_REF,CD_NOM,LB_NOM,NOM_VERN,INDICATEUR_HUMIDE\n' +
      reducedPlants
        .map(x =>
          [
            x.CD_REF,
            wrap(x.CD_NOM),
            wrap(x.LB_NOM),
            wrap(x.NOM_VERN),
            x.humide ? '1' : '',
          ].join(',')
        )
        .join('\n')

    fs.writeFileSync('reduced_vegetal_dictionary.csv', csvContent)
  }

  const unmergedHumides = humides.filter(
    x =>
      !pplants.some(p => x['CODE FVF'] == p.CD_NOM || x['CODE FVF'] == p.CD_REF)
  )

  console.log('\nunmerged humides references:')
  console.log(
    unmergedHumides
      .map(
        x =>
          x['CODE FVF'] +
          ', ' +
          wrap(x['NOM COMPLET (nomenclature de la flore vasculaire de France)'])
      )
      .join('\n')
  )
}

run()
