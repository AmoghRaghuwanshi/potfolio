import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import resume from '../netlify/functions/resume.mjs';

test('GET and HEAD redirect to the included PDF without caching an old redirect', async () => {
  for (const method of ['GET', 'HEAD']) {
    const response = resume(new Request('https://portfolio.example/api/resume', { method }));
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    const path = response.headers.get('location');
    assert.equal(path, '/Amogh_Raghuwanshi_Resume.pdf');
    const pdf = await readFile(new URL(`../public${path}`, import.meta.url));
    assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
    assert.equal(await response.text(), '');
  }
});

test('resume endpoint rejects writes and never redirects to query-string destinations', () => {
  const rejected = resume(new Request('https://portfolio.example/api/resume', { method: 'POST' }));
  assert.equal(rejected.status, 405);
  assert.equal(rejected.headers.get('allow'), 'GET, HEAD');
  const response = resume(new Request('https://portfolio.example/api/resume?url=https://other.example'));
  assert.equal(response.headers.get('location'), '/Amogh_Raghuwanshi_Resume.pdf');
});
