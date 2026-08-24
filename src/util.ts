import z from "zod"

export function isUsernameValid(username: string) {
  return username.match(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/)
}

export const isUUID = (v: string) => z.uuid().safeParse(v).success
