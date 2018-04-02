export const parseImage = x => ((x || '').match(/IMAGE\("(.*)"\)/) || [])[1]

export const formatImage = picture_url => `=IMAGE("${picture_url}")`
