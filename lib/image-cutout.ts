/**
 * Utility to isolate product pixels and remove solid/uniform backgrounds in the browser.
 * Preserves the actual real product pixels while eliminating surrounding color boxes.
 */
export async function removeBackgroundClient(imageSrc: string): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(imageSrc);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const maxDim = 1200;
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;

        if (w > maxDim || h > maxDim) {
          const ratio = Math.min(maxDim / w, maxDim / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(imageSrc);
          return;
        }

        ctx.drawImage(img, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // Sample corner pixels to determine background color
        const sampleCoords = [
          [2, 2],
          [w - 3, 2],
          [2, h - 3],
          [w - 3, h - 3],
          [Math.floor(w / 2), 2],
          [2, Math.floor(h / 2)],
          [w - 3, Math.floor(h / 2)],
        ];

        let bgR = 0,
          bgG = 0,
          bgB = 0;
        let validSamples = 0;

        for (const [sx, sy] of sampleCoords) {
          const idx = (sy * w + sx) * 4;
          // If corner is already transparent, assume already cut out
          if (data[idx + 3] < 10) {
            resolve(imageSrc);
            return;
          }
          bgR += data[idx];
          bgG += data[idx + 1];
          bgB += data[idx + 2];
          validSamples++;
        }

        bgR /= validSamples;
        bgG /= validSamples;
        bgB /= validSamples;

        // Check if corners have similar color
        let isUniform = true;
        for (const [sx, sy] of sampleCoords) {
          const idx = (sy * w + sx) * 4;
          const diff = Math.sqrt(
            Math.pow(data[idx] - bgR, 2) +
              Math.pow(data[idx + 1] - bgG, 2) +
              Math.pow(data[idx + 2] - bgB, 2)
          );
          if (diff > 65) {
            isUniform = false;
            break;
          }
        }

        if (isUniform) {
          const threshold = 65;
          const visited = new Uint8Array(w * h);
          const queue: number[] = [];

          // Seed border pixels
          for (let x = 0; x < w; x++) {
            queue.push(x, 0);
            queue.push(x, h - 1);
          }
          for (let y = 0; y < h; y++) {
            queue.push(0, y);
            queue.push(w - 1, y);
          }

          while (queue.length > 0) {
            const py = queue.pop()!;
            const px = queue.pop()!;
            const pos = py * w + px;
            if (visited[pos]) continue;
            visited[pos] = 1;

            const idx = pos * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const dist = Math.sqrt(
              Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2)
            );

            if (dist < threshold) {
              const alphaFactor = Math.max(0, (dist - (threshold - 25)) / 25);
              data[idx + 3] = Math.round(data[idx + 3] * alphaFactor);

              if (px > 0 && !visited[py * w + (px - 1)]) queue.push(px - 1, py);
              if (px < w - 1 && !visited[py * w + (px + 1)]) queue.push(px + 1, py);
              if (py > 0 && !visited[(py - 1) * w + px]) queue.push(px, py - 1);
              if (py < h - 1 && !visited[(py + 1) * w + px]) queue.push(px, py + 1);
            }
          }

          ctx.putImageData(imgData, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } else {
          // If non-uniform background, return original
          resolve(imageSrc);
        }
      } catch {
        resolve(imageSrc);
      }
    };
    img.onerror = () => resolve(imageSrc);
    img.src = imageSrc;
  });
}
