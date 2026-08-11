import { mockApplications } from '../data/applicationData'

export async function listApplicationsMock() {
  await new Promise((r) => setTimeout(r, 300))
  return mockApplications
}

export async function createApplicationMock(payload) {
  await new Promise((r) => setTimeout(r, 400))
  return { id: `a-${Date.now()}`, ...payload }
}
export async function addApplicationMock() {
  await new Promise((resolve) => setTimeout(resolve, 900))
  return { success: true }
}