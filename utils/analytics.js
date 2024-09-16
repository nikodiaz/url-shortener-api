import Url from "../models/Url.js"

export const updateVisitsForLink = async (shortUrl) => {
  const url = await Url.findOne({ shortUrl })

  if (url) {
    url.visits += 1

    const today = new Date().setHours(0, 0, 0, 0)
    const visitToday = url.visitsByDate.find(v => v.date.getTime() === today)

    if (visitToday) {
      visitToday.count += 1
    } else {
      url.visitsByDate.push({ date: new Date(), count: 1 })
    }

    await url.save()
  }
}

export const getUserVisitsByDate = async (userId) => {
  try {
    const urls = await Url.find({ user: userId }).lean()
    const visitsByDate = {}

    urls.forEach((url) => {
      url.visitsByDate.forEach(({ date, count }) => {
        const dateKey = date.toISOString().split("T")[0];
        if (!visitsByDate[dateKey]) {
          visitsByDate[dateKey] = 0
        }
        visitsByDate[dateKey] += count
      })
    })

    return visitsByDate
  } catch (error) {
    console.error("Error al obtener visitas por fecha", error)
  }
}
