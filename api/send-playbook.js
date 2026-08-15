import { Resend } from 'resend'

const KIT_URL = 'https://jsb-humanmode.vercel.app/hub' // Field Kit
const BOOK_URL =
  'https://www.amazon.com/Human-Mode-Unlock-Unique-Transform/dp/0063467542/ref=tmm_hrd_swatch_0'

const ASSETS = {
  quiet: {
    title: 'Quiet Understanding',
    blurb: 'Here’s your free field guide for the sixty seconds after someone tells you something hard.',
    pdf: 'https://jsb-humanmode.vercel.app/playbooks/quiet-understanding.pdf',
    pocket: 'https://jsb-humanmode.vercel.app/playbooks/quiet-understanding-pocket.pdf',
    tag: 'quiet_understanding',
    tips: [
      'This week’s practice: when you notice someone struggling, turn your diagnosis into a question. “What landed hardest?” beats “I can see you’re worried.”',
      'Sixty-second sequence: stop typing → ask or say it sideways → wait longer than is comfortable → help only if they want it.',
      'Plan D is quiet understanding — not agreement, not a fix. The goal is for them to feel seen so they can solve the thing themselves.',
      'If you must step away: give a specific time. “Can we take thirty minutes at four?” beats “let’s talk later.”',
      'Someone near you will tell you something hard. You don’t need to feel qualified first. Ask.',
    ],
  },
  comphum: {
    title: 'The Confident and Humble Leader’s Playbook',
    blurb:
      'Here’s your free companion field guide to the Competent Humility Pulse Check — five practices you can run this week. (Not the assessment itself.)',
    pdf: 'https://jsb-humanmode.vercel.app/playbooks/competent-humility-playbook.pdf',
    pocket: 'https://jsb-humanmode.vercel.app/playbooks/competent-humility-pocket.pdf',
    tag: 'comphum_playbook',
    tips: [
      'Practice 1 this week: “Here’s what I know. Here’s what no one can really know. Here’s how we’ll decide — and by when.”',
      'Run a 10-minute pre-mortem: “It’s six months from now. This failed. What did we miss?” You go first with one real risk.',
      'Quiet Experts: open one meeting with “Here’s where I’m confident — [domain]. Here’s where I want your pressure-test.”',
      'Certainty Actors: ask the least senior person “What are we not seeing?” — then protect their answer.',
      'If you overclaimed: repair within 48 hours. Name what’s still open and make a specific ask.',
    ],
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: 'Email service is not configured. Please use Download free PDF instead.',
    })
  }

  const { email, firstName, source, asset: assetKey } = req.body || {}
  if (!email || !String(email).includes('@')) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }

  const asset = ASSETS[assetKey === 'comphum' ? 'comphum' : 'quiet']
  const name = (firstName && String(firstName).trim()) || 'there'
  const tip = asset.tips[Math.floor(Math.random() * asset.tips.length)]

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const html = buildEmail(name, tip, asset)

    const response = await resend.emails.send({
      from: process.env.REPORT_FROM_EMAIL || 'Human Mode <onboarding@resend.dev>',
      to: email,
      subject: `${firstName ? firstName + ', your' : 'Your'} ${asset.title} + one practice tip`,
      html,
      tags: [
        { name: 'source', value: String(source || 'playbook').slice(0, 40) },
        { name: 'asset', value: asset.tag },
      ],
    })

    if (response.error) {
      return res.status(500).json({ error: response.error.message })
    }

    return res.status(200).json({ success: true, id: response.data?.id })
  } catch (error) {
    console.error('send-playbook error:', error)
    return res.status(500).json({ error: error.message || 'Send failed' })
  }
}

function buildEmail(name, tip, asset) {
  return `<!DOCTYPE html>
<html><body style="font-family:Georgia,serif;line-height:1.55;color:#1a1a1a;max-width:560px;margin:0 auto;padding:24px">
  <p style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#578ead;font-family:system-ui,sans-serif">Human Mode · Free field guide</p>
  <h1 style="font-size:22px;color:#1c4b61;font-family:system-ui,sans-serif">${escapeHtml(asset.title)}</h1>
  <p>Hi ${escapeHtml(name)},</p>
  <p>${escapeHtml(asset.blurb)}</p>
  <p style="margin:20px 0">
    <a href="${asset.pdf}" style="display:inline-block;background:#1c4b61;color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-family:system-ui,sans-serif;font-weight:700">Download the PDF</a>
  </p>
  <p style="font-size:14px"><a href="${asset.pocket}">1-page pocket card</a> · <a href="${KIT_URL}">The Human Mode, Always™ Field Kit</a></p>
  <div style="background:#f1f1e2;border-left:4px solid #1c4b61;padding:14px 16px;margin:24px 0">
    <p style="margin:0 0 6px;font-family:system-ui,sans-serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#578ead">One practice tip</p>
    <p style="margin:0;font-size:16px">${escapeHtml(tip)}</p>
  </div>
  <p>These practices are developed more fully in <em>Human Mode</em> (HarperCollins, 2027).</p>
  <p><a href="${BOOK_URL}" style="font-family:system-ui,sans-serif;font-weight:700;color:#1c4b61">Get the book on Amazon →</a></p>
  <p style="font-size:13px;color:#6b7a85;margin-top:32px">Jeffrey Sanchez-Burks · Human Mode, Always™<br/>You’re receiving this because you asked for the free guide.</p>
</body></html>`
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
