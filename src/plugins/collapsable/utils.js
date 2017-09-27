export const handlePercentage = percentage => {
  let nP;
  try {
    nP = Math.round(
      Math.max(0.0, parseFloat(percentage))
    );
  }
  catch(e) {
    nP = 100;
  }

  return nP;
};

