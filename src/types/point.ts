export class Point {
  id: number
  address: string
  main: {
    code: number
    rad: number
    name: string
    lon: number
    lat: number
  }

  constructor(pointData: Point) {
    this.id = pointData.id
    this.address = pointData.address

    this.main = pointData.main
  }
}

export class PointForm {
  code: number
  rad: number
  name: string
  lon: number
  lat: number

  constructor(pointData: PointForm) {
    this.code = pointData.code
    this.rad = pointData.rad
    this.name = pointData.name
    this.lon = pointData.lon
    this.lat = pointData.lat
  }
}
