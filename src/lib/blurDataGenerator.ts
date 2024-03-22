import { getPlaiceholder } from "plaiceholder";

async function getBlurData(src: string) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  try {
    return await getPlaiceholder(buffer);
  } catch (error) {
    console.error(error);
  }
}

export { getBlurData };
