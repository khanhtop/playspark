export function getMuxAsset(id, animated = true) {
  const animatedUrl = `https://image.mux.com/${id}/animated.gif?start=0`;
  const staticUrl = `https://image.mux.com/${id}/thumbnail.jpg?start=0`;
  return animated ? animatedUrl : staticUrl;
}

export async function getMuxUploadID() {
  const muxResponse = await fetch("/api/mux");
  const json = await muxResponse.json();
  const { url, id } = json;
  return {
    url: url,
    id: id,
  };
}

export async function getMuxAssetID(id) {
  let assetId = "";
  while (true) {
    await sleep();
    const _res = await fetch("/api/muxpoll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const _json = await _res.json();
    if (_json?.data?.["asset_id"]) {
      assetId = _json?.data?.["asset_id"];
      break;
    }
  }
  return assetId;
}

export async function getMuxAssetURL(assetId) {
  let playbackId = "";
  let duration = 0;
  let aspect_ratio = "1:1";
  while (true) {
    await sleep();
    const _res = await fetch("/api/muxasset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: assetId,
      }),
    });
    const _json = await _res.json();
    if (_json?.data?.playback_ids?.[0]?.id && _json?.data?.status === "ready") {
      playbackId = _json?.data?.playback_ids?.[0]?.id;
      duration = _json?.data?.duration;
      aspect_ratio = _json?.data?.aspect_ratio;
      break;
    }
  }
  return {
    muxUrl: playbackId,
    duration: duration,
    aspect_ratio: aspect_ratio,
  };
}

const sleep = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};
