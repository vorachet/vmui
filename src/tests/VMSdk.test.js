import { VMSdk }  from '../vmdk/VMSdk';

test(`buildTrayModel null`, () => {
  const tray = null;
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel undefined`, () => {
  const tray = undefined;
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel {}`, () => {
  const tray = {};
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel {name: 1}`, () => {
  const tray = { name: 1 };
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel ""`, () => {
  const tray = "";
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel true`, () => {
  const tray = true;
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel 1`, () => {
  const tray = 1;
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel []`, () => {
  const tray = [];
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel [1, [], {}]`, () => {
  const tray = [1, [], {}];
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel [1, 1, 1]`, () => {
  const tray = [1, 1, 1];
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel [[]]`, () => {
  const tray = [[]];
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel [[], []]`, () => {
  const tray = [[], []];
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel [[1], []]`, () => {
  const tray = [[1], []];
  expect(VMSdk.buildTrayModel("unamed", tray).error).toBe(true);
});

test(`buildTrayModel [[1], [1], [1]]`, () => {
  const tray = [[1], [1], [1]];
  const model = VMSdk.buildTrayModel("unamed", tray);
  console.dir(model, { depth: null })
  /*
    {
      modelName: 'unamed',
      input: [ [ 1 ], [ 1 ], [ 1 ] ],
      error: false,
      rows: 3,
      sockets: [
        { row: 1, socketsCount: 1, sockets: [ { socket: '11', limit: 1 } ] },
        { row: 2, socketsCount: 1, sockets: [ { socket: '21', limit: 1 } ] },
        { row: 3, socketsCount: 1, sockets: [ { socket: '31', limit: 1 } ] }
      ],
      selections: 3,
      capacityUnits: 3
    }
  */
  expect(model.error).toBe(false);
  expect(model.rows).toBe(3);
  expect(model.rowsContent.length).toBe(3);
  expect(model.rowsContent[0].row).toBe(1);
  expect(model.rowsContent[1].row).toBe(2);
  expect(model.rowsContent[2].row).toBe(3);
  expect(model.selections).toBe(3);
  expect(model.capacityUnits).toBe(3);
});

test(`buildTrayModel [[1,1], [1,1], [1,1]]`, () => {
  const tray = [[1, 1], [1, 1], [1, 1]];
  const model = VMSdk.buildTrayModel("unamed", tray);
  console.dir(model, { depth: null })
  /*
    {
      modelName: 'unamed',
      input: [ [ 1, 1 ], [ 1, 1 ], [ 1, 1 ] ],
      error: false,
      rows: 3,
      sockets: [
        {
          row: 1,
          socketsCount: 2,
          sockets: [ { socket: '11', limit: 1 }, { socket: '12', limit: 1 } ]
        },
        {
          row: 2,
          socketsCount: 2,
          sockets: [ { socket: '21', limit: 1 }, { socket: '22', limit: 1 } ]
        },
        {
          row: 3,
          socketsCount: 2,
          sockets: [ { socket: '31', limit: 1 }, { socket: '32', limit: 1 } ]
        }
      ],
      selections: 6,
      capacityUnits: 6
    }
  */
  expect(model.error).toBe(false);
  expect(model.rows).toBe(3);
  expect(model.rowsContent.length).toBe(3);
  expect(model.rowsContent[0].row).toBe(1);
  expect(model.rowsContent[1].row).toBe(2);
  expect(model.rowsContent[2].row).toBe(3);
  expect(model.selections).toBe(6);
  expect(model.capacityUnits).toBe(6);
});

test(`buildTrayModel [[1], [2,2], [3,3,3]]`, () => {
  const tray = [[1], [2, 2], [3, 3, 3]];
  const model = VMSdk.buildTrayModel("unamed", tray);
  /*
    {
      modelName: 'unamed',
      input: [ [ 1 ], [ 2, 2 ], [ 3, 3, 3 ] ],
      error: false,
      rows: 3,
      sockets: [
        { row: 1, socketsCount: 1, sockets: [ { socket: '11', limit: 1 } ] },
        {
          row: 2,
          socketsCount: 2,
          sockets: [ { socket: '21', limit: 2 }, { socket: '22', limit: 2 } ]
        },
        {
          row: 3,
          socketsCount: 3,
          sockets: [
            { socket: '31', limit: 3 },
            { socket: '32', limit: 3 },
            { socket: '33', limit: 3 }
          ]
        }
      ],
      selections: 6,
      capacityUnits: 14
    }
  */
  expect(model.error).toBe(false);
  expect(model.rows).toBe(3);
  expect(model.rowsContent.length).toBe(3);
  expect(model.rowsContent[0].row).toBe(1);
  expect(model.rowsContent[1].row).toBe(2);
  expect(model.rowsContent[2].row).toBe(3);
  expect(model.selections).toBe(6);
  expect(model.capacityUnits).toBe(14);
});

test(`buildTrayModel [[10,10,10,10], [12,12,12,12,12,12,12], [8,8,8,8,8,8]]`, () => {
  const tray = [[10, 10, 10, 10], [12, 12, 12, 12, 12, 12, 12], [8, 8, 8, 8, 8, 8]];
  const model = VMSdk.buildTrayModel("unamed", tray);
  /*
    {
      modelName: 'unamed',
      input: [
        [ 10, 10, 10, 10 ],
        [
          12, 12, 12, 12,
          12, 12, 12
        ],
        [ 8, 8, 8, 8, 8, 8 ]
      ],
      error: false,
      rows: 3,
      sockets: [
        {
          row: 1,
          socketsCount: 4,
          sockets: [
            { socket: '11', limit: 10 },
            { socket: '12', limit: 10 },
            { socket: '13', limit: 10 },
            { socket: '14', limit: 10 }
          ]
        },
        {
          row: 2,
          socketsCount: 7,
          sockets: [
            { socket: '21', limit: 12 },
            { socket: '22', limit: 12 },
            { socket: '23', limit: 12 },
            { socket: '24', limit: 12 },
            { socket: '25', limit: 12 },
            { socket: '26', limit: 12 },
            { socket: '27', limit: 12 }
          ]
        },
        {
          row: 3,
          socketsCount: 6,
          sockets: [
            { socket: '31', limit: 8 },
            { socket: '32', limit: 8 },
            { socket: '33', limit: 8 },
            { socket: '34', limit: 8 },
            { socket: '35', limit: 8 },
            { socket: '36', limit: 8 }
          ]
        }
      ],
      selections: 17,
      capacityUnits: 172
    }
  */
  expect(model.error).toBe(false);
  expect(model.rows).toBe(3);
  expect(model.rowsContent.length).toBe(3);
  expect(model.rowsContent[0].row).toBe(1);
  expect(model.rowsContent[0].socketsCount).toBe(4);
  expect(model.rowsContent[0].sockets[0].socket).toBe("1-1");
  expect(model.rowsContent[0].sockets[0].limit).toBe(10);
  expect(model.rowsContent[1].row).toBe(2);
  expect(model.rowsContent[1].socketsCount).toBe(7);
  expect(model.rowsContent[2].row).toBe(3);
  expect(model.rowsContent[2].socketsCount).toBe(6);
  expect(model.selections).toBe(17);
  expect(model.capacityUnits).toBe(172);
});