const getters = {
  position: state => state.geo.position,
  menu: state => state.home.menu,
  cities: state => state.geo.cities,
  hots: state => state.geo.hots,
}
export default getters