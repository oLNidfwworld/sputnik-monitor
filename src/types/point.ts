interface IPoint {
  id: number
  address: string
  code: number
  lon: number
  lat: number
  rad: number

  arrivalTimeFrom?: Date
  arrivalTimeTo?: Date

  arrivalTimeFromFact?: Date
  arrivalTimeToFact?: Date

  loadingTime?: Date
}

export default class Point implements IPoint {
  id: number
  address: string
  code: number
  lon: number
  lat: number
  rad: number

  arrivalTimeFrom?: Date
  arrivalTimeTo?: Date

  arrivalTimeFromFact?: Date
  arrivalTimeToFact?: Date

  loadingTime?: Date

  static _id = 0

  constructor(pointData: Exclude<IPoint, {}>) {
    this.id = Point._id++
    this.address = pointData.address
    this.code = pointData.code
    this.lon = pointData.lat
    this.lat = pointData.lat
    this.rad = pointData.rad
    this.arrivalTimeFrom = pointData?.arrivalTimeFrom
    this.arrivalTimeTo = pointData?.arrivalTimeTo
    this.arrivalTimeFromFact = pointData?.arrivalTimeFromFact
    this.arrivalTimeToFact = pointData?.arrivalTimeToFact
    this.loadingTime = pointData?.loadingTime
  }
}
