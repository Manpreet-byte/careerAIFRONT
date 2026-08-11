export async function sendAssistantMessageMock(conversationId, message) {
  await new Promise((r) => setTimeout(r, 700))
  return { id: `m-${Date.now()}`, role: 'assistant', text: `Mocked AI response to: ${message}` }
}
