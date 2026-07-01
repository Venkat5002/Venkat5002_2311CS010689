const weight = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const prioritySort = (notifications) => {
  return [...notifications].sort((a, b) => {
    if (weight[a.Type] !== weight[b.Type]) {
      return weight[b.Type] - weight[a.Type];
    }

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });
};