const SITE_NAME = 'BIG Bank'

export const getTitle = (title) => {
  return title ? `${title} | ${SITE_NAME}` : SITE_NAME
}
