import { isServerSide } from "./isServerSide"

export const isClientSide = () => !isServerSide()
