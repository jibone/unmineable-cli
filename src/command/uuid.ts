export async function getUUID(wallet: string, coin: string) {
  let error = false;
  let errorMsg = "";

  const url = `https://api.unminable.com/v4/address/${wallet}?coin=${coin}`;
  const res = await fetch(url);
  const result = (await res.json()) as any;

  if (!result.success) {
    error = true;
    errorMsg = result.msg;
  }

  const data = result.data;

  return {
    error,
    errorMsg,
    data: {
      uuid: data.uuid,
    },
  };
}
