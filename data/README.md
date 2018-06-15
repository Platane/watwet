# Data sources

[legifrance.gouv.fr](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000019151510)

> Data extracted as csv here :

> [annexe_ii_table_a_especes_indicatrices_de_zones_humides.csv](https://gist.github.com/Platane/33a429c20909acc664cddbf1d68fe385#file-annexe_ii_table_a_especes_indicatrices_de_zones_humides-csv) > [annexe_ii_tables_b_habitats_caracteristiques_des_zones_humides.csv](https://gist.github.com/Platane/33a429c20909acc664cddbf1d68fe385#file-annexe_ii_tables_b_habitats_caracteristiques_des_zones_humides-csv)

[INPN taxref](https://inpn.mnhn.fr/telechargement/referentielEspece/referentielTaxo)

> Data extracted as csv here :

> [taxrefv11_plantea.csv](https://gist.github.com/Platane/33a429c20909acc664cddbf1d68fe385#file-taxrefv11_plantea-csv)

## Vegetal list

Join 

From [INPN taxref](https://inpn.mnhn.fr/telechargement/referentielEspece/referentielTaxo), extract ref related to plants.

> [taxrefv11_plantea.csv](https://gist.github.com/Platane/33a429c20909acc664cddbf1d68fe385#file-taxrefv11_plantea-csv)

```
node parseTaxRef.js 
```

Then join with [annexe_ii_table_a_especes_indicatrices_de_zones_humides.csv](https://gist.github.com/Platane/33a429c20909acc664cddbf1d68fe385#file-annexe_ii_table_a_especes_indicatrices_de_zones_humides-csv), `CD_REF === CODE FVF`

then merge plant with the same CD_REF

```
node joinVegetalDictionary.js 
```

## Habitat list

Join [annexe_ii_tables_b_habitats_caracteristiques_des_zones_humides.csv](https://gist.github.com/Platane/33a429c20909acc664cddbf1d68fe385#file-annexe_ii_tables_b_habitats_caracteristiques_des_zones_humides-csv) with [INPN HABREF](https://inpn.mnhn.fr/telechargement/referentiels/habitats)