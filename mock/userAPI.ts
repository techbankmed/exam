const users = [
  { id: 0, name: 'Umi', departmaent: 'U', roles: ['pm'] },
  { id: 1, name: 'Fish', departmaent: 'B', roles: ['dev'] },
  { id: 2, name: 'Cat', departmaent: 'C', roles: ['qa'] },
];

export default {
  'GET /api/v1/users': (req: any, res: any) => {
   
    let filteredUsers = users;

    for (const key in req.query) {
      if (req.query.hasOwnProperty(key)) {
        const value = req.query[key];

        filteredUsers = filteredUsers.filter((item) => {
          const itemValue = item[key];

          if (typeof value === 'object') {
            return value?.some((v: string) => itemValue?.includes(v.trim()));
          }

          return item[key] == value;
        });
      }
    }
    res.json({
      success: true,
      data: { list: filteredUsers },
      errorCode: 0,
    });
  },
  'POST /api/v1/users': (req: any, res: any) => {
    users.push({
      id: Math.floor(Math.random() * 10000),
      ...req.body,
    });
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/users': (req: any, res: any) => {
    let success = false;

    let index = users.findIndex((item) => item.id === req.body.id);

    if (index !== -1) {
      users[index] = req.body;
      success = true;
    }

    res.json({
      success,
      data: { list: users },
      errorCode: 0,
    });
  },
  'DELETE /api/v1/users': (req: any, res: any) => {
    let success = false;

    const index = users.findIndex((item) => item.id === req.body.userId);
    if (index !== -1) {
      success = true;
      users.splice(index, 1);
    }

    res.json({
      success,
      data: { list: users },
      errorCode: 0,
    });
  },
};
