import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render } from '../../utils/test'
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import Freelances from './'
import { ThemeProvider } from '../../utils/context'

const freelancersMockedData = [
  {
    name: 'Harry Potter',
    job: 'Magicien frontend',
    picture: '',
  },
  {
    name: 'Hermione Granger',
    job: 'Magicienne fullstack',
    picture: '',
  },
]

const server = setupServer(
  // On précise ici l'url qu'il faudra "intercepter"
  rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
    // là on va pouvoir passer les datas mockées dans ce qui retourné en json
    return res(ctx.json({ freelancersList: freelancersMockedData }))
  })
)

// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

test('Should display freelancers names', async () => {
  render(<Freelances />)
  expect(screen.getByTestId('loader')).toBeTruthy()
  // eslint-disable-next-line testing-library/prefer-query-by-disappearance
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
  await waitFor(() => {
    expect(screen.getByText('Harry Potter')).toBeTruthy()
  })
  await waitFor(() => {
    expect(screen.getByText('Hermione Granger')).toBeTruthy()
  })
})

it('Should display error content', async () => {
  server.use(
    rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
      // là on va pouvoir passer les datas mockées dans ce qui retourné en json
      return res.once(
        ctx.status(500),
        ctx.json({
          errorMessage: `Oups il y a eu une erreur dans l'API`,
        })
      )
    })
  )
  render(<Freelances />)
  // eslint-disable-next-line testing-library/prefer-query-by-disappearance
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
  expect(screen.getByTestId('error')).toMatchInlineSnapshot(`
  <span
    data-testid="error"
  >
    Oups il y a eu une erreur dans l'API
  </span>
  `)
})
