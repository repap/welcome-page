export const getUserLanguageByAcceptedLanguages = (languages: string) => {
  if(typeof languages !== 'string') {
    return undefined
  }

  return languages
    .split(',')[0]?.split('-')[0]
}