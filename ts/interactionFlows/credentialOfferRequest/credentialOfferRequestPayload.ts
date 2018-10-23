import { IPayload, InteractionType } from '../types'
import { classToPlain, plainToClass, Type } from 'class-transformer'
import { CredentialOffer } from './credentialOffer'
import { ICredentialOfferCreationArgs } from './types'

export class CredentialOfferRequestPayload implements IPayload {
  public iss: string
  public iat: number
  public typ: InteractionType

  // TODO MIGHT BREAK THINGS
  @Type(() => CredentialOffer)
  public credentialOffer: CredentialOffer

  public static create(attrs: ICredentialOfferCreationArgs): CredentialOfferRequestPayload {
    const credOfferPayload = new CredentialOfferRequestPayload()
    // TODO MIGHT BREAK THINGS
    const { iss, credentialOffer } = attrs

    credOfferPayload.credentialOffer = plainToClass(CredentialOffer, credentialOffer)
    credOfferPayload.typ = InteractionType.CredentialOfferRequest

    if (iss) {
      credOfferPayload.iss = iss
    }

    return credOfferPayload
  }

  public isInstant(): boolean {
    return this.credentialOffer.isInstant()
  }

  public getRequestedInput(): { [key: string]: string | undefined } {
    return this.credentialOffer.getRequestedInput()
  }

  public getChallenge(): string {
    return this.credentialOffer.getChallenge()
  }

  public getCallbackURL(): string {
    return this.credentialOffer.getCallbackURL()
  }

  public static fromJSON(json: ICredentialOfferCreationArgs): CredentialOfferRequestPayload {
    return plainToClass(CredentialOfferRequestPayload, json)
  }

  public toJSON(): ICredentialOfferCreationArgs {
    return classToPlain(this) as ICredentialOfferCreationArgs
  }
}
