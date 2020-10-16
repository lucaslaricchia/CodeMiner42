export default {
  render(survivor) {
    return {
      id: survivor.id,
      name: survivor.name,
      age: survivor.age,
      gender: survivor.gender,
      infected: survivor.infected,
      infectedReports: survivor.infectedReports,
      latitude: survivor.latitude,
      longitude: survivor.longitude,
    }
  },

  renderMany(survivors) {
    return survivors.map((survivor) => this.render(survivor))
  },
}
