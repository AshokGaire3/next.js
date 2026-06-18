import { nextTestSetup, isNextDev, isNextStart } from 'e2e-utils'
import { spawnSync } from 'node:child_process'
;((isNextDev && process.env.TURBOPACK_BUILD) ||
  (isNextStart && process.env.TURBOPACK_DEV)
  ? describe.skip
  : describe)('Relay Compiler Transform - Single Project Config', () => {
  const { next } = nextTestSetup({
    files: __dirname,
    dependencies: {
      'relay-compiler': '21.0.1',
      'relay-runtime': '21.0.1',
      '@types/relay-runtime': '20.1.1',
    },
  })

  beforeAll(() => {
    spawnSync('pnpm', ['exec', 'relay-compiler'], {
      stdio: 'inherit',
    })
  })

  it('should resolve index page correctly', async () => {
    const html = await next.render('/')
    expect(html).toContain('Hello, World!')
  })
})
