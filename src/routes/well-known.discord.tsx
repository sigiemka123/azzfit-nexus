import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/well-known/discord')({
  loader: () => {
    return new Response('dh=bb4bfda1082eda501bd465a20c87240e84a...', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  },
})
