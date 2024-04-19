import { SRGBColorSpace, TextureLoader } from "three";

export function createTextureLoader() {
  const loader = new TextureLoader();
  const loadColorTexture = (url: string) => {
    const texture = loader.load(url);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  };

  return { loader, loadColorTexture };
}
