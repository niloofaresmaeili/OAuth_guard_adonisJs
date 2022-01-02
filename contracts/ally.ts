/**
 * Contract source: https://git.io/JOdiQ
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import { CustomDriver, CustomDriverConfig } from 'providers/clientCredential/src'

declare module '@ioc:Adonis/Addons/Ally' {
  interface SocialProviders {
    github: {
      config: GithubDriverConfig
      implementation: GithubDriverContract
    }
    google: {
      config: GoogleDriverConfig
      implementation: GoogleDriverContract
    }
    customDriver: {
      config: CustomDriverConfig
      implementation: CustomDriver
    }
  }
}
