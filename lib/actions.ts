"use server"

import { revalidatePath } from "next/cache"

export async function revalidateSSG() {
  revalidatePath("/ssg")
}

export async function revalidateISR() {
  revalidatePath("/isr")
}

export async function revalidatePPR() {
  revalidatePath("/ppr")
}
