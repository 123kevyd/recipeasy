export default function handler(req, res) {
    if (req.method === 'POST') {
        res.status(200).json({ name: 'John Doe' })
      } else if (req.method === 'GET') {
        res.status(200).json({ review: 'test review', rating: 5, id: 111 })
      }
  }
  