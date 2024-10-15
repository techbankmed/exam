const users = [
  { id: 0, name: 'Umi', departmaent: 'U', roles: ['pm'] },
  { id: 1, name: 'Fish', departmaent: 'B', roles: ['dev'] },
  { id: 2, name: 'Cat', departmaent: 'C', roles: ['qa'] },
];

export default {
  'GET /api/v1/users': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'POST /api/v1/users': (req: any, res: any) => {
    users.push({
      id: users.length,
      ...req.body,
    });
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/users': (req: any, res: any) => {
    users[0] = {
      ...users[0],
      ...req.body,
    };

    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'DELETE /api/v1/users': (req: any, res: any) => {
    users.pop();

    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
};
