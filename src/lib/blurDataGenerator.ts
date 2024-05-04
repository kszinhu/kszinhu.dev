import { getPlaiceholder } from 'plaiceholder';

function isLocalFile(src: string) {
  return src.startsWith('/');
}

async function getBlurData(src: string) {
  if (isLocalFile(src)) return Promise.resolve(null);

  const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));

  try {
    return await getPlaiceholder(buffer);
  } catch (error) {
    throw new Error(`Failed to fetch image: ${error}`);
  }
}

export { getBlurData };
