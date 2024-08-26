export async function getWorkers(uuid: string) {
  let error = false;
  let errorMsg = "";

  const url = `https://api.unminable.com/v4/account/${uuid}/workers`;
  const res = await fetch(url);
  // eslint-disable-next-line
  const result = (await res.json()) as any; // [TODO] set proper type for this

  if (!result.success) {
    error = true;
    errorMsg = result.msg;
  }

  const workers = [];
  const data = result.data;
  for (const algo in data) {
    if (data[algo].workers.length > 0) {
      const workersList = data[algo].workers;
      for (const worker of workersList) {
        workers.push({
          algo: algo,
          name: worker.name,
          status: worker.online ? "online" : "offline",
          last: worker.last,
          rhr: worker.rhr,
          chr: worker.chr,
          referral: worker.referral,
        });
      }
    }
  }

  return {
    error,
    errorMsg,
    data: {
      workers,
    },
  };
}
