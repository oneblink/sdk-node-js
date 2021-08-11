const bayViewValue = 625000
const remainingLoad = 452238
const equityLVR = 0.8

const housePrice = 600000
const stampDuty = 25000
const LMI = 24000
const cash = 34000

const equity = equityLVR * bayViewValue - remainingLoad
const deposit = cash + equity
const upFrontCosts = LMI + stampDuty
const depositAfterUpFrontCosts = deposit - upFrontCosts
const borrowingAmount = housePrice - depositAfterUpFrontCosts
const LVR = (borrowingAmount / housePrice) * 100

const numberFormat = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
})

console.log({
  housePrice: numberFormat.format(housePrice),
  stampDuty: numberFormat.format(stampDuty),
  LMI: numberFormat.format(LMI),
  cash: numberFormat.format(cash),
  equity: numberFormat.format(equity),
  deposit: numberFormat.format(deposit),
  upFrontCosts: numberFormat.format(upFrontCosts),
  depositAfterUpFrontCosts: numberFormat.format(depositAfterUpFrontCosts),
  borrowingAmount: numberFormat.format(borrowingAmount),
  LVR: LVR.toPrecision(4),
})
