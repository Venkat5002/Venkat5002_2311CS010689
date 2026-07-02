const weight = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const getWeight = (type) => weight[type] ?? 0;

export const prioritySort = (notifications = []) => {
  return [...notifications].sort((a, b) => {
    const leftWeight = getWeight(a?.Type ?? a?.type);
    const rightWeight = getWeight(b?.Type ?? b?.type);

    if (leftWeight !== rightWeight) {
      return rightWeight - leftWeight;
    }

    const leftTime = Date.parse(a?.Timestamp ?? a?.timestamp ?? 0);
    const rightTime = Date.parse(b?.Timestamp ?? b?.timestamp ?? 0);

    return rightTime - leftTime;
  });
};