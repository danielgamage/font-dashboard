import getLanguage from '../getLanguage'

it('returns proper objects', () => {
  expect(getLanguage('ENG').subtag).toEqual(['en'])
  expect(getLanguage('MOL').subtag).toEqual(['ro'])
});
