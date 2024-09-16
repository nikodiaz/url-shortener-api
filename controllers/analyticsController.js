import Url from "../models/Url.js"

export const getTotalVisitsByUser = async (req, res) => {
  const userId = req.user.id
  try {
    const links = await Url.find({ user: userId })
    const totalVisits = links.reduce((acc, link) => acc + link.visits, 0)
    res.status(200).json({ totalVisits })
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el historial de visitas", error })
  }
}

export const getLinkVisitsByUser = async (req, res) => {
  const userId = req.user.id
  const { linkId } = req.params

  console.log(linkId, userId)
  try {
    const link = await Url.findOne({ user: userId, _id: linkId })
    if (!link) {
      return res.status(404).json({ message: "URL no encontrada" })
    }
    res.status(200).json({ visits: link.visits })
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las visitas del link", error })
  }
}

export const getTotalLinksbyUser = async (req, res) => {
  const userId = req.user.id

  try {
    const totalLinks = await Url.countDocuments({ user: userId })
    res.status(200).json({ totalLinks })
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el total de links", error })
  }
}

export const getLinkVisitsByDate = async (req, res) => {
  const userId = req.user.id

  try {
    const links = await Url.aggregate([
      { $match: { user: userId } },
      { $unwind: "$visitsByDate" },
      { $group: { _id: "$visitsByDate.date", totalVisits: { $sum: "$visitsByDate.count" } } },
      { $sort: { _id: 1 } }
    ])
    res.status(200).json({ links })
  } catch (error) {
    res.status(500).json({ message: "Error al obthener las visitas por fecha", error })
  }
}


export const getUserVisitsByDate = async (req, res) => {
  try {
    const userId = req.user.id
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date("1970-01-01")
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date()

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Fechas inválidas proporcionadas" })
    }

    const userLinks = await Url.find({
      user: userId,
      'visitsByDate.date': { $gte: startDate, $lte: endDate }
    }).lean()

    const visitsByDate = userLinks.reduce((acc, link) => {
      link.visitsByDate.forEach(visit => {
        const date = new Date(visit.date).toISOString().split('T')[0]
        acc[date] = (acc[date] || 0) + visit.count
      })
      return acc
    }, {})

    res.status(200).json({ visitsByDate })
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las visitas por fecha", error })
  }
};

