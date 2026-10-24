// Keep a stable shareable endpoint while the public PDF can be replaced.
export default function resume(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', {
      status: 405,
      headers: { Allow: 'GET, HEAD' },
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/Amogh_Raghuwanshi_Resume.pdf',
      'Cache-Control': 'no-store',
    },
  });
}

export const config = { path: '/api/resume' };
