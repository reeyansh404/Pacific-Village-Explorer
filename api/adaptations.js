import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { village, asset, year, threat } = req.body

  if (!village || !asset || !year) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const prompt = `You are a Pacific Islands climate adaptation expert helping a specific village plan for climate change impacts.

VILLAGE CONTEXT:
- Name: ${village.name}
- Country: ${village.country}
- Region: ${village.region}
- Population: ${village.population}
- Setting: ${village.description}
- Main threats: ${village.mainThreats.join(', ')}

THREATENED ASSET:
- Type: ${asset.type}
- Name: ${asset.name}
- Description: ${asset.description}
- Cultural significance: ${asset.culturalSignificance}
- Elevation: ${asset.elevationM}m
- Status in ${year}: ${threat}

Generate exactly 3 realistic adaptations tailored to this specific village and asset.

STRICT CONSTRAINTS:
- Solutions must be feasible for a village of ~${village.population} people with limited outside resources
- Consider Pacific Island cultural context (traditional practices, community structures, respect for elders and sacred sites)
- Budget per adaptation should not exceed $20,000 USD
- Consider community capacity — village members should be able to implement without extensive outside expertise
- Cultural significance HIGH or CRITICAL requires preserving cultural meaning, not just physical function
- Solutions should be maintainable by the community long-term
- Prefer traditional knowledge combined with appropriate modern methods

Return ONLY valid JSON in this exact format, no other text:
{
  "adaptations": [
    {
      "name": "Short name (max 6 words)",
      "description": "One clear sentence explaining what this does and how",
      "cost_estimate_usd": 1500,
      "community_effort": "low",
      "effectiveness": "high",
      "implementation_time_months": 3,
      "cultural_considerations": "Brief note on cultural fit and how it respects traditional practices"
    }
  ]
}

Use only "low", "medium", or "high" for community_effort and effectiveness. Generate exactly 3 adaptations.`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt }]
    })

    const text = response.content[0].text.trim()

    let cleanedText = text
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '')
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '')
    }

    const parsed = JSON.parse(cleanedText)

    if (!parsed.adaptations || !Array.isArray(parsed.adaptations)) {
      throw new Error('Invalid response structure')
    }

    res.status(200).json(parsed)
  } catch (error) {
    console.error('Error generating adaptations:', error)
    res.status(500).json({
      error: 'Failed to generate adaptations',
      details: error.message
    })
  }
}