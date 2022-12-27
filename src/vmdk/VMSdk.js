/**
 * Redux Store for EventStream Behaviors
 * @author Vorachet Jaroensawas
 * @returns VMSdk Object
 */
export const VMSdk = {
  buildTrayModel: buildTrayModel,
  randomInt: randomInt,
  createDispenserDB: createDispenserDB,
  formatNumber: formatNumber
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

const formatter = new Intl.NumberFormat({
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatNumber(number) {
  return formatter.format(number)
}

function isValidTrayRow(array) {
  if (!Array.isArray(array)) return false;
  if (array.length === 0) return false;

  const valid = !array.map(a => Array.isArray(a) && a.length > 0).includes(false)
  if (!valid) return false;

  const rows = array.map(a => a.map(r2 => typeof r2)).flat();
  const isValid = rows.filter(r => r !== "number").length === 0;
  if (!isValid) return false;

  const valueRows = array.map(a => a.map(r2 => r2 % 1 === 0)).flat();
  return !valueRows.includes(false);
}

function buildTrayModel(modelName, trayArray) {
  const validTrayArray = isValidTrayRow(trayArray);
  if (!validTrayArray) {
    return {
      model: modelName,
      input: trayArray,
      error: true,
      rows: 0,
      rowsContent: [],
      selections: 0,
      capacityUnits: 0,
    }
  }
  return {
    model: modelName,
    input: trayArray,
    error: false,
    rows: trayArray.length,
    rowsContent: trayArray.map((r, idx) => {
      return {
        row: idx + 1,
        socketsCount: r.length,
        sockets: r.map((s, sidx) => {
          return {
            socket: (idx + 1) + "-" + (sidx + 1),
            limit: s,
          }
        }),

      }
    }),
    selections: trayArray.map(c => c.length).reduce((pv, cv) => pv + cv, 0),
    capacityUnits: trayArray.flat().reduce((pv, cv) => pv + cv, 0)
  }
}

function createDispenserDB(trayModel, generate = false) {
  if (!trayModel) return {}

  const db = trayModel.rowsContent.map(r => {
    const sockets = r.sockets.map(s => {
      return {
        ...s,
        ...(generate ? createRandomProduct(s.limit) : VMSdk.createEmptyProduct())
      }
    })
    return sockets
  }).flat();
  const dbkv = {};
  db.map(d => dbkv[d.socket] = d)
  return dbkv;
}

function createRandomProduct(qty) {
  const p = PREDEFINED_PRODUCTS[VMSdk.randomInt(0, 3)];
  p.qty = qty;
  return p;
}

const PREDEFINED_PRODUCTS = [
  {
    name: "Snack",
    price: VMSdk.randomInt(12, 50),
    image: "/images/snack.png"
  },
  {
    name: "Redbull",
    price: VMSdk.randomInt(12, 50),
    image: "/images/redbull.png"
  },
  {
    name: "Cola",
    price: VMSdk.randomInt(12, 50),
    image: "/images/cola.png"
  },
  {
    name: "Gum",
    price: VMSdk.randomInt(12, 50),
    image: "/images/gum.png"
  }
];