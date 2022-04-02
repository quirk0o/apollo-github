import { HeroPage } from "pages/hero"

import { CurrentUser } from "./current-user"

export function WelcomePage() {
  return (
    <HeroPage>
      <CurrentUser />
    </HeroPage>
  )
}
