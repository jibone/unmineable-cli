export async function getStats(uuid: string) {
  let error = false;
  let errorMsg = "";

  const url = `https://api.unminable.com/v4/account/${uuid}/stats`;
  const res = await fetch(url);
  // eslint-disable-next-line
  const result = (await res.json()) as any; // [TODO] set proper type for this

  if (!result.success) {
    error = true;
    errorMsg = result.msg;
  }

  const data = result.data;

  const stats = {
    miningBalance: data.balance_mining,
    referralBalance: data.balance_referral,
    balance: data.balance,
    reward24h: data.rewarded.past_24h,
    reward7d: data.rewarded.past_7d,
    reward30d: data.rewarded.past_30d,
    paid: data.paid,
    lastPayment: data.last_payment,
    paymentThreshold: data.payment_threshold,
    miningFee: data.mining_fee,
    coin: data.coin,
    network: data.network,
  };

  return {
    error,
    errorMsg,
    data: {
      stats,
    },
  };
}
