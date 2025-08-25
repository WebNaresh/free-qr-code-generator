declare module 'dom-to-image-more' {
  interface Options {
    quality?: number;
    width?: number;
    height?: number;
    bgcolor?: string;
    backgroundColor?: string;
    style?: Record<string, string>;
    filter?: (node: Node) => boolean;
    imagePlaceholder?: string;
    cacheBust?: boolean;
    pixelRatio?: number;
  }

  export function toPng(node: Node, options?: Options): Promise<string>;
  export function toJpeg(node: Node, options?: Options): Promise<string>;
  export function toSvg(node: Node, options?: Options): Promise<string>;
  export function toPixelData(node: Node, options?: Options): Promise<Uint8ClampedArray>;
  export function toCanvas(node: Node, options?: Options): Promise<HTMLCanvasElement>;
  export function toBlob(node: Node, options?: Options): Promise<Blob>;

  const domtoimage: {
    toPng: typeof toPng;
    toJpeg: typeof toJpeg;
    toSvg: typeof toSvg;
    toPixelData: typeof toPixelData;
    toCanvas: typeof toCanvas;
    toBlob: typeof toBlob;
  };

  export default domtoimage;
}
